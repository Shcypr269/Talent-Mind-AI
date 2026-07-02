from typing import Tuple, Dict, Any
from ..models.candidate import Candidate
from ..models.job_description import JobDescription
from ..agents.honeypot_detector import HoneypotDetector
from ..agents.candidate_intelligence_agent import CandidateIntelligenceAgent
from ..agents.career_trajectory_agent import CareerTrajectoryAgent
from ..agents.behavioral_signal_agent import BehavioralSignalAgent
from ..agents.platform_activity_agent import PlatformActivityAgent

class LLMRecruiterAgent:
    def __init__(self, jd: JobDescription):
        self.jd = jd
        self.honeypot_detector = HoneypotDetector()
        self.skill_matcher = CandidateIntelligenceAgent(jd)
        self.career_analyzer = CareerTrajectoryAgent(jd)
        self.behavioral_scorer = BehavioralSignalAgent()
        self.logistics_fitter = PlatformActivityAgent(jd)
        
        self.weights = {
            "semantic": 0.35,    
            "skill": 0.25,      
            "trajectory": 0.15,   
            "logistics": 0.10,    
            "behavioral": 0.15    
        }

    def score_candidate(self, candidate: Candidate, semantic_score: float) -> Tuple[float, Dict[str, Any]]:
        is_honeypot, reason = self.honeypot_detector.is_honeypot(candidate)
        if is_honeypot:
            return 0.0, {"honeypot": True, "reason": reason}

        normalized_semantic = min(1.0, semantic_score)
        
        skill_score = self.skill_matcher.score(candidate)
        
        trajectory_base = self.career_analyzer.analyze(candidate)
        trajectory_penalty = self.career_analyzer.get_anti_pattern_penalty(candidate)
        trajectory_score = trajectory_base * trajectory_penalty
        
        logistics_score = (self.logistics_fitter.score(candidate) * 0.5 + 
                           self.logistics_fitter.experience_score(candidate) * 0.5)
                           
        behavioral_score = self.behavioral_scorer.score(candidate)

        final_score = (
            (normalized_semantic * self.weights["semantic"]) +
            (skill_score * self.weights["skill"]) +
            (trajectory_score * self.weights["trajectory"]) +
            (logistics_score * self.weights["logistics"]) +
            (behavioral_score * self.weights["behavioral"])
        )
        
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
