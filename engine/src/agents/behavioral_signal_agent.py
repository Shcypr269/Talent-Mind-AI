from ..models.candidate import Candidate
from datetime import datetime

class BehavioralSignalAgent:
    def __init__(self):
        self.reference_date = datetime(2026, 7, 1)

    def score(self, candidate: Candidate) -> float:
        signals = candidate.redrob_signals
        score = 0.5 
        
        if signals.recruiter_response_rate > 0.8:
            score += 0.2
        elif signals.recruiter_response_rate > 0.5:
            score += 0.1
        elif signals.recruiter_response_rate < 0.2:
            score -= 0.3 
            
        try:
            last_active = datetime.strptime(signals.last_active_date, "%Y-%m-%d")
            days_inactive = (self.reference_date - last_active).days
            if days_inactive < 30:
                score += 0.1
            elif days_inactive > 180:
                score -= 0.2 
        except ValueError:
            pass
            
        if signals.interview_completion_rate > 0.9:
            score += 0.1
        elif signals.interview_completion_rate < 0.5:
            score -= 0.2
            
        if signals.open_to_work_flag:
            score += 0.05
            
        if signals.profile_completeness_score < 50:
            score -= 0.1
            
        if signals.avg_response_time_hours < 24:
            score += 0.05
        elif signals.avg_response_time_hours > 72:
            score -= 0.1
            
        if signals.github_activity_score > 50:
            score += 0.1
            
        return max(0.0, min(1.0, score))
        
    def get_market_demand_score(self, candidate: Candidate) -> float:

        signals = candidate.redrob_signals
        demand = 0.0
        
        if signals.saved_by_recruiters_30d > 10:
            demand += 0.4
        elif signals.saved_by_recruiters_30d > 2:
            demand += 0.2
            
        if signals.search_appearance_30d > 100:
            demand += 0.3
        elif signals.search_appearance_30d > 20:
            demand += 0.1
            
        if signals.profile_views_received_30d > 50:
            demand += 0.3
        elif signals.profile_views_received_30d > 10:
            demand += 0.1
            
        return min(1.0, demand)
