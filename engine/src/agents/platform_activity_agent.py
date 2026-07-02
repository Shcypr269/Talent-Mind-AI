from ..models.candidate import Candidate
from ..models.job_description import JobDescription

class PlatformActivityAgent:
    def __init__(self, jd: JobDescription):
        self.jd = jd
        self.preferred_locations = {loc.lower() for loc in jd.preferred_locations}

    def score(self, candidate: Candidate) -> float:
        score = 0.5 # baseline
        
        loc_lower = candidate.profile.location.lower()
        if candidate.profile.country.lower() != self.jd.target_country.lower():
            score -= 0.3 
        else:
            if any(p in loc_lower for p in self.preferred_locations):
                score += 0.2
            else:
                score += 0.1 
                
        notice = candidate.redrob_signals.notice_period_days
        if notice <= self.jd.target_notice_period_max:
            score += 0.2
        elif notice > 90:
            score -= 0.2
            
        if candidate.redrob_signals.preferred_work_mode == "remote":
            score -= 0.1 
            
        return max(0.0, min(1.0, score))

    def experience_score(self, candidate: Candidate) -> float:

        yoe = candidate.profile.years_of_experience
        
        if self.jd.target_experience_min <= yoe <= self.jd.target_experience_max:
            return 1.0
            
        if yoe < self.jd.target_experience_min:
            diff = self.jd.target_experience_min - yoe
            return max(0.0, 1.0 - (diff * 0.2))
        else:
            diff = yoe - self.jd.target_experience_max
            return max(0.0, 1.0 - (diff * 0.1))
