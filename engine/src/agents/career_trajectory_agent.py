from ..models.candidate import Candidate
from ..models.job_description import JobDescription
from datetime import datetime

class CareerTrajectoryAgent:
    def __init__(self, jd: JobDescription):
        self.jd = jd
        self.consulting_firms = {f.lower() for f in jd.anti_patterns_consulting}
        self.research_keywords = {"research", "scientist", "academic", "postdoc", "phd"}
        
    def analyze(self, candidate: Candidate) -> float:
        if not candidate.career_history:
            return 0.0
            
        score = 0.5 # baseline
        
        has_product_company = False
        has_production_exp = False
        
        for job in candidate.career_history:
            company_lower = job.company.lower()
            desc_lower = job.description.lower()
            title_lower = job.title.lower()
            
            if not any(c in company_lower for c in self.consulting_firms) and job.industry.lower() not in ["it services", "consulting"]:
                has_product_company = True
                
            if any(kw in desc_lower for kw in ["shipped", "deployed", "production", "scale", "users"]):
                has_production_exp = True
                
            if any(kw in title_lower for kw in ["machine learning", "ml", "ai", "engineer", "backend", "data"]):
                score += 0.1
                
        if has_product_company:
            score += 0.2
        if has_production_exp:
            score += 0.2
            
        return min(1.0, score)

    def get_anti_pattern_penalty(self, candidate: Candidate) -> float:

        if not candidate.career_history:
            return 1.0
            
        penalty = 1.0
        
        all_consulting = True
        for job in candidate.career_history:
            company_lower = job.company.lower()
            if not any(c in company_lower for c in self.consulting_firms) and job.industry.lower() not in ["it services"]:
                all_consulting = False
                break
        
        if all_consulting:
            penalty *= 0.5 
            
        short_stints = 0
        total_stints = len(candidate.career_history)
        for job in candidate.career_history:
            if job.duration_months < 18 and not job.is_current:
                short_stints += 1
                
        if total_stints >= 3 and (short_stints / total_stints) >= 0.7:
            penalty *= 0.7 
            
        all_research = True
        for job in candidate.career_history:
            title_lower = job.title.lower()
            if not any(rk in title_lower for rk in self.research_keywords):
                all_research = False
                break
                
        if all_research:
            penalty *= 0.6 

        return penalty
