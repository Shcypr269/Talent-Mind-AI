import faiss
import numpy as np
from typing import List, Dict, Tuple
from rank_bm25 import BM25Okapi
from ..models.candidate import Candidate
from ..models.job_description import JobDescription

class HybridSearcher:
    def __init__(self, candidates: List[Candidate], embeddings: np.ndarray):
        self.candidates = candidates
        d = embeddings.shape[1]
        self.faiss_index = faiss.IndexFlatIP(d) 
        faiss.normalize_L2(embeddings)
        self.faiss_index.add(embeddings)
        
        tokenized_corpus = [self._tokenize(c) for c in candidates]
        self.bm25 = BM25Okapi(tokenized_corpus)

    def _tokenize(self, candidate: Candidate) -> List[str]:
        text = f"{candidate.profile.current_title} {candidate.profile.summary} "
        for job in candidate.career_history:
            text += f"{job.title} {job.description} "
        for skill in candidate.skills:
            text += f"{skill.name} "
        return text.lower().split()

    def search(self, jd: JobDescription, jd_embedding: np.ndarray, top_k: int = 1000) -> List[Tuple[Candidate, float]]:
        query_emb = jd_embedding.reshape(1, -1).copy()
        faiss.normalize_L2(query_emb)
        retrieval_k = min(top_k * 2, len(self.candidates))
        dense_scores, dense_indices = self.faiss_index.search(query_emb, retrieval_k)
        
        dense_ranks = {idx: rank for rank, idx in enumerate(dense_indices[0])}
        
        jd_tokens = self._tokenize_jd(jd)
        sparse_scores = self.bm25.get_scores(jd_tokens)
        
        sparse_indices = np.argsort(sparse_scores)[::-1][:retrieval_k]
        sparse_ranks = {idx: rank for rank, idx in enumerate(sparse_indices)}
        
        k_rrf = 60
        rrf_scores = {}
        
        all_candidate_indices = set(dense_ranks.keys()).union(set(sparse_ranks.keys()))
        
        for idx in all_candidate_indices:
            dense_rank = dense_ranks.get(idx, retrieval_k)
            sparse_rank = sparse_ranks.get(idx, retrieval_k)
            
            score = 0.0
            score += 1.0 / (k_rrf + dense_rank + 1)
            score += 1.0 / (k_rrf + sparse_rank + 1)
            
            rrf_scores[idx] = score
            
        sorted_indices = sorted(rrf_scores.keys(), key=lambda x: rrf_scores[x], reverse=True)
        
        results = []
        for idx in sorted_indices[:top_k]:
            results.append((self.candidates[idx], rrf_scores[idx]))
            
        return results

    def _tokenize_jd(self, jd: JobDescription) -> List[str]:
        text = f"{jd.title} " + " ".join(jd.required_skills) + " " + " ".join(jd.preferred_skills)
        return text.lower().split()
