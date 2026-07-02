from ..models.candidate import Candidate
from ..models.job_description import JobDescription

class CandidateIntelligenceAgent:
    def __init__(self, jd: JobDescription):
        self.jd = jd
        self.required_skills = {s.lower() for s in jd.required_skills}
        self.preferred_skills = {s.lower() for s in jd.preferred_skills}
        
        self.proficiency_weights = {
            "beginner": 0.25,
            "intermediate": 0.5,
            "advanced": 0.75,
            "expert": 1.0
        }

    def score(self, candidate: Candidate) -> float:
        if not candidate.skills:
            return 0.0
            
        req_score = 0.0
        pref_score = 0.0
        max_req = len(self.required_skills)
        max_pref = len(self.preferred_skills)
        
        for skill in candidate.skills:
            s_name = skill.name.lower()
            base_weight = self.proficiency_weights.get(skill.proficiency, 0.5)
            
            trust = 0.5
            if skill.endorsements > 10:
                trust += 0.3
            elif skill.endorsements > 0:
                trust += 0.1
                
            if skill.duration_months > 24:
                trust += 0.4
            elif skill.duration_months > 6:
                trust += 0.2
                
            trust = min(1.2, trust)
            
            skill_value = base_weight * trust
            
            matched = False
            for req in self.required_skills:
                if req in s_name or s_name in req:
                    req_score += skill_value
                    matched = True
                    break
                    
            if not matched:
                for pref in self.preferred_skills:
                    if pref in s_name or s_name in pref:
                        pref_score += skill_value
                        break
                        
        normalized_req = min(1.0, req_score / max_req) if max_req > 0 else 1.0
        normalized_pref = min(1.0, pref_score / max_pref) if max_pref > 0 else 1.0
        
        final_score = (0.8 * normalized_req) + (0.2 * normalized_pref)
        return min(1.0, final_score)
