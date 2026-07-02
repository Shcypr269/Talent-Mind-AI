import argparse
import numpy as np
import time
from pathlib import Path
import logging

from ..data.loader import load_candidates
from ..data.writer import write_submission_csv
from ..models.job_description import JobDescription
from ..retrieval.hybrid_search import HybridSearcher
from ..ranking.scorer import CompositeScorer
from ..ranking.reasoning import ReasoningGenerator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def rank(input_path: str, data_dir: str, output_path: str):
    start_time = time.time()
    
    logger.info("Loading candidates...")
    candidates = list(load_candidates(input_path))
    
    logger.info("Loading embeddings...")
    d_dir = Path(data_dir)
    embeddings = np.load(d_dir / "candidate_embeddings.npy")
    jd_emb = np.load(d_dir / "jd_embedding.npy")
    
    if len(candidates) != embeddings.shape[0]:
        raise ValueError("Number of candidates does not match number of embeddings!")
        
    jd = JobDescription()
    
    logger.info("Initializing Hybrid Searcher...")
    searcher = HybridSearcher(candidates, embeddings)
    
    logger.info("Performing Semantic Retrieval (Top 2000)...")
    top_k_semantic = searcher.search(jd, jd_emb, top_k=2000)
    
    logger.info("Running Composite Scorer...")
    scorer = CompositeScorer(jd)
    reasoner = ReasoningGenerator()
    
    scored_results = []
    
    for candidate, semantic_score in top_k_semantic:
        final_score, breakdown = scorer.score_candidate(candidate, semantic_score)
        
        if breakdown.get("honeypot"):
            continue # Skip honeypots
            
        reasoning = reasoner.generate(candidate, breakdown)
        
        scored_results.append({
            "candidate_id": candidate.candidate_id,
            "candidate_obj": candidate,
            "score": final_score,
            "reasoning": reasoning
        })
        
    # Sort by final score descending
    scored_results.sort(key=lambda x: x["score"], reverse=True)
    
    # Take top 100
    top_100 = scored_results[:100]
    
    # Assign ranks
    final_output = []
    for rank_idx, result in enumerate(top_100, 1):
        final_output.append({
            "candidate_id": result["candidate_id"],
            "rank": rank_idx,
            "score": result["score"],
            "reasoning": result["reasoning"]
        })
        
    logger.info("Writing submission CSV...")
    write_submission_csv(final_output, output_path)
    
    logger.info(f"Ranking finished in {time.time() - start_time:.2f} seconds.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Rank candidates and output submission.csv")
    parser.add_argument("--input", required=True, help="Path to candidates.jsonl")
    parser.add_argument("--data", default="engine/data", help="Path to directory containing .npy embeddings")
    parser.add_argument("--output", default="submission.csv", help="Path for output CSV")
    
    args = parser.parse_args()
    rank(args.input, args.data, args.output)
