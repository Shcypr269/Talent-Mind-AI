from typing import List, Union
from sentence_transformers import SentenceTransformer
import numpy as np
from ..models.candidate import Candidate
from ..models.job_description import JobDescription

class EmbeddingService:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def _prepare_candidate_text(self, candidate: Candidate) -> str:
        text_parts = [
            f"Title: {candidate.profile.current_title}",
            f"Summary: {candidate.profile.summary}"
        ]
        
        for job in candidate.career_history:
            text_parts.append(f"Role: {job.title} at {job.company}. {job.description}")
            
        skills_str = ", ".join([s.name for s in candidate.skills if s.proficiency in ["advanced", "expert"]])
        if skills_str:
            text_parts.append(f"Key Skills: {skills_str}")
            
        return " | ".join(text_parts)

    def _prepare_jd_text(self, jd: JobDescription) -> str:
        req_skills = ", ".join(jd.required_skills)
        pref_skills = ", ".join(jd.preferred_skills)
        return f"Seeking {jd.title}. Required: {req_skills}. Preferred: {pref_skills}."

    def embed_candidates(self, candidates: List[Candidate]) -> np.ndarray:
        texts = [self._prepare_candidate_text(c) for c in candidates]
        return self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)

    def embed_jd(self, jd: JobDescription) -> np.ndarray:
        text = self._prepare_jd_text(jd)
        return self.model.encode(text, convert_to_numpy=True)
