from typing import Tuple, Dict, Any
from ..models.candidate import Candidate
from ..models.job_description import JobDescription
from ..analyzers.honeypot_detector import HoneypotDetector
from ..analyzers.skill_matcher import SkillMatcher
from ..analyzers.career_trajectory import CareerTrajectoryAnalyzer
from ..analyzers.behavioral_scorer import BehavioralScorer
from ..analyzers.logistics_fitter import LogisticsFitter

class CompositeScorer:
    def __init__(self, jd: JobDescription):
        self.jd = jd
        self.honeypot_detector = HoneypotDetector()
        self.skill_matcher = SkillMatcher(jd)
        self.career_analyzer = CareerTrajectoryAnalyzer(jd)
        self.behavioral_scorer = BehavioralScorer()
        self.logistics_fitter = LogisticsFitter(jd)
        
        # Weights (Must sum to 1.0)
        self.weights = {
            "semantic": 0.35,     # From Hybrid search RRF score (normalized offline)
            "skill": 0.25,        # Explicit skill matching
            "trajectory": 0.15,   # Career path (product vs consulting)
            "logistics": 0.10,    # Location, notice period, YOE
            "behavioral": 0.15    # Responsiveness, recency
        }

    def score_candidate(self, candidate: Candidate, semantic_score: float) -> Tuple[float, Dict[str, Any]]:
        """
        Calculates the final composite score for a candidate.
        Returns (final_score, breakdown_dict)
        """
        # 1. Immediate Honeypot Check
        is_honeypot, reason = self.honeypot_detector.is_honeypot(candidate)
        if is_honeypot:
            return 0.0, {"honeypot": True, "reason": reason}

        # 2. Gather sub-scores
        # Semantic score is passed in from hybrid search. Assume it's already 0-1 normalized roughly.
        normalized_semantic = min(1.0, semantic_score)
        
        skill_score = self.skill_matcher.score(candidate)
        
        trajectory_base = self.career_analyzer.analyze(candidate)
        trajectory_penalty = self.career_analyzer.get_anti_pattern_penalty(candidate)
        trajectory_score = trajectory_base * trajectory_penalty
        
        logistics_score = (self.logistics_fitter.score(candidate) * 0.5 + 
                           self.logistics_fitter.experience_score(candidate) * 0.5)
                           
        behavioral_score = self.behavioral_scorer.score(candidate)

        # 3. Compute Weighted Sum
        final_score = (
            (normalized_semantic * self.weights["semantic"]) +
            (skill_score * self.weights["skill"]) +
            (trajectory_score * self.weights["trajectory"]) +
            (logistics_score * self.weights["logistics"]) +
            (behavioral_score * self.weights["behavioral"])
        )
        
        # 4. Global Market Demand boost (small bonus for highly sought after candidates)
        demand = self.behavioral_scorer.get_market_demand_score(candidate)
        final_score += (demand * 0.05)
        
        final_score = min(1.0, max(0.0, final_score))
        
        breakdown = {
            "honeypot": False,
            "semantic": normalized_semantic,
            "skill": skill_score,
            "trajectory": trajectory_score,
            "logistics": logistics_score,
            "behavioral": behavioral_score,
            "demand_boost": demand * 0.05
        }
        
        return final_score, breakdown
