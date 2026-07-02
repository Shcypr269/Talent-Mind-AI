from typing import Dict, Any
from ..models.candidate import Candidate

class ReasoningGenerator:
    def generate(self, candidate: Candidate, breakdown: Dict[str, Any]) -> str:
        """
        Generates a 1-2 sentence fact-based justification for the candidate's ranking.
        Cannot use LLM API here due to time/network constraints.
        """
        if breakdown.get("honeypot"):
            return f"Disqualified: {breakdown.get('reason')}"
            
        sentences = []
        
        # 1. Primary Skill / Role fit
        yoe = candidate.profile.years_of_experience
        title = candidate.profile.current_title
        sentences.append(f"Strong fit with {yoe} years of experience, currently as a {title}.")
        
        # 2. Highlight strongest dimension
        scores = {
            "skill match": breakdown.get("skill", 0),
            "career trajectory": breakdown.get("trajectory", 0),
            "platform engagement": breakdown.get("behavioral", 0)
        }
        
        best_dim = max(scores.items(), key=lambda x: x[1])
        if best_dim[1] > 0.8:
            if best_dim[0] == "skill match":
                sentences.append("Exceptional alignment with required tech stack and high endorsements.")
            elif best_dim[0] == "career trajectory":
                sentences.append("Proven track record of shipping products in highly relevant domains.")
            elif best_dim[0] == "platform engagement":
                sentences.append("Highly responsive on the platform indicating strong immediate hireability.")
        
        # 3. Mention specific skills if high skill score
        if breakdown.get("skill", 0) > 0.7:
            top_skills = [s.name for s in candidate.skills if s.proficiency in ("advanced", "expert")][:2]
            if top_skills:
                sentences.append(f"Expertise in {', '.join(top_skills)} stands out.")
                
        return " ".join(sentences[:2]) # Keep it to 2 sentences max
