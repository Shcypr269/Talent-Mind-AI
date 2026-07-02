from datetime import datetime
from typing import Tuple
from ..models.candidate import Candidate

class HoneypotDetector:
    def __init__(self):
        self.current_year = 2026 

    def is_honeypot(self, candidate: Candidate) -> Tuple[bool, str]:

        expert_zero_duration_count = 0
        for skill in candidate.skills:
            if skill.proficiency == "expert" and skill.duration_months == 0 and skill.endorsements == 0:
                expert_zero_duration_count += 1
        
        if expert_zero_duration_count > 3:
            return True, f"Claims expert proficiency in {expert_zero_duration_count} skills with 0 months duration and 0 endorsements."

        for skill in candidate.skills:
            if skill.proficiency == "expert":
                score = candidate.redrob_signals.skill_assessment_scores.get(skill.name)
                if score is not None and score < 20.0:
                    return True, f"Expert proficiency in {skill.name} but scored {score} on assessment."

        if candidate.education:
            earliest_edu_start = min((edu.start_year for edu in candidate.education), default=self.current_year)
            max_possible_years = (self.current_year - earliest_edu_start) + 4
            if candidate.profile.years_of_experience > max_possible_years and candidate.profile.years_of_experience > 10:
                return True, f"Claims {candidate.profile.years_of_experience} YOE but earliest education started in {earliest_edu_start}."

        total_yoe_months = candidate.profile.years_of_experience * 12
        for job in candidate.career_history:
            if job.duration_months > total_yoe_months + 12:
                return True, f"Job duration ({job.duration_months} mo) exceeds total claimed YOE ({total_yoe_months} mo)."

        expert_skills_count = sum(1 for s in candidate.skills if s.proficiency == "expert")
        if expert_skills_count > 20:
            return True, f"Implausible breadth of expertise ({expert_skills_count} expert skills)."
            
        return False, ""
