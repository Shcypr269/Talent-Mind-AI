import os
from dotenv import load_dotenv
load_dotenv()
from typing import Dict, Any
from ..models.candidate import Candidate

class ExplainabilityAgent:
    def generate(self, candidate: Candidate, breakdown: Dict[str, Any]) -> str:
        if breakdown.get("honeypot"):
            return f"Disqualified: {breakdown.get('reason')}"
            
        groq_key = os.getenv("GROQ_API_KEY")
        if groq_key:
            return self._generate_with_llm(candidate, breakdown, groq_key)
            
        return self._generate_deterministic(candidate, breakdown)
        
    def _generate_with_llm(self, candidate: Candidate, breakdown: Dict[str, Any], api_key: str) -> str:
        import groq
        client = groq.Groq(api_key=api_key)
        
        yoe = candidate.profile.years_of_experience
        title = candidate.profile.current_title
        
        prompt = f"""
        You are an expert technical recruiter evaluating a candidate for a Senior AI Engineer role.
        
        Candidate Info:
        - Title: {title}
        - Years of Experience: {yoe}
        - Skill Match Score: {breakdown.get('skill', 0):.2f} (0-1)
        - Career Trajectory Score: {breakdown.get('trajectory', 0):.2f} (0-1)
        - Platform Engagement Score: {breakdown.get('behavioral', 0):.2f} (0-1)
        
        Top Skills: {', '.join([s.name for s in candidate.skills[:5]])}
        
        Write a very concise, punchy 1-2 sentence justification for why this candidate is a strong fit.
        Do NOT mention the numerical scores directly, interpret them. 
        Focus on their strongest dimension.
        """
        
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=60,
                temperature=0.3
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"LLM generation failed: {e}. Falling back to deterministic.")
            return self._generate_deterministic(candidate, breakdown)
            
    def _generate_deterministic(self, candidate: Candidate, breakdown: Dict[str, Any]) -> str:
        sentences = []
        yoe = candidate.profile.years_of_experience
        title = candidate.profile.current_title
        sentences.append(f"Strong fit with {yoe} years of experience, currently as a {title}.")
        
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
        
        if breakdown.get("skill", 0) > 0.7:
            top_skills = [s.name for s in candidate.skills if s.proficiency in ("advanced", "expert")][:2]
            if top_skills:
                sentences.append(f"Expertise in {', '.join(top_skills)} stands out.")
                
        return " ".join(sentences[:2])
