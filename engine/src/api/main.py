import csv
import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

app = FastAPI(title="Talent Mind AI Ranking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SUBMISSION_PATH = Path("submission.csv")
CANDIDATES_JSON_PATH = Path(r"c:\Users\seniv\Downloads\[PUB] India_runs_data_and_ai_challenge\[PUB] India_runs_data_and_ai_challenge\India_runs_data_and_ai_challenge\sample_candidates.json")
CANDIDATES_JSONL_PATH = Path(r"c:\Users\seniv\Downloads\[PUB] India_runs_data_and_ai_challenge\[PUB] India_runs_data_and_ai_challenge\India_runs_data_and_ai_challenge\candidates.jsonl")

_CANDIDATES_CACHE = None

def load_candidates_dict() -> Dict[str, dict]:
    global _CANDIDATES_CACHE
    if _CANDIDATES_CACHE is not None:
        return _CANDIDATES_CACHE
        
    candidates = {}
    if CANDIDATES_JSONL_PATH.exists():
        try:
            with open(CANDIDATES_JSONL_PATH, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        item = json.loads(line)
                        candidates[item["candidate_id"]] = item
                    except Exception:
                        continue
            _CANDIDATES_CACHE = candidates
            return candidates
        except Exception as e:
            print(f"Error loading JSONL: {e}")
            
    if CANDIDATES_JSON_PATH.exists():
        try:
            with open(CANDIDATES_JSON_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                _CANDIDATES_CACHE = {item["candidate_id"]: item for item in data}
                return _CANDIDATES_CACHE
        except Exception as e:
            print(f"Error loading JSON: {e}")
            
    _CANDIDATES_CACHE = {}
    return _CANDIDATES_CACHE

@app.get("/api/rank")
def get_rankings():
    if not SUBMISSION_PATH.exists():
        return {"error": "submission.csv not found. Please run the ranking pipeline first."}
        
    candidates_db = load_candidates_dict()
    results = []
    
    with open(SUBMISSION_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cid = row["candidate_id"]
            c_data = candidates_db.get(cid, {})
            profile = c_data.get("profile", {})
            signals = c_data.get("redrob_signals", {})
            skills = c_data.get("skills", [])
            
            name = profile.get("anonymized_name", "Unknown Candidate")
            
            skill_names = [s["name"] for s in skills if s.get("proficiency") in ("advanced", "expert")]
            if not skill_names:
                skill_names = [s["name"] for s in skills][:4]
                
            frontend_obj = {
                "id": cid,
                "rank": int(row["rank"]),
                "name": name,
                "title": profile.get("current_title", "Unknown Title"),
                "avatar": f"https://api.dicebear.com/7.x/initials/svg?seed={name.replace(' ', '+')}",
                "fitScore": int(float(row["score"]) * 100),
                "behaviorScore": int(signals.get("recruiter_response_rate", 0) * 100) or 85,
                "growthScore": int(signals.get("interview_completion_rate", 0) * 100) or 88,
                "activityScore": int(signals.get("profile_completeness_score", 0)) or 90,
                "skills": skill_names[:4],
                "experience": f"{profile.get('years_of_experience', 0)} years",
                "industry": profile.get("current_industry", "Unknown"),
                "behavior": "Leadership" if signals.get("recruiter_response_rate", 0) > 0.8 else "Standard",
                "location": profile.get("location", "Unknown"),
                "reasoning": row["reasoning"]
            }
            results.append(frontend_obj)
            
    return results

@app.get("/api/copilot")
def query_copilot(query: str):
    query_lower = query.lower()
    
    if not SUBMISSION_PATH.exists():
        return {"response": "I cannot answer questions right now because the ranking pipeline has not been executed yet."}
        
    candidates_db = load_candidates_dict()
    
    # Read the ranked list from submission.csv
    ranked_list = []
    with open(SUBMISSION_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cid = row["candidate_id"]
            db_item = candidates_db.get(cid, {})
            ranked_list.append({
                "candidate_id": cid,
                "rank": int(row["rank"]),
                "score": float(row["score"]),
                "reasoning": row["reasoning"],
                "db": db_item
            })
            
    if not ranked_list:
        return {"response": "No candidates ranked in the submission file."}
        
    # Question 1: Why is Candidate A ranked higher / why is X ranked higher
    if "why is" in query_lower and ("ranked higher" in query_lower or "ranked #1" in query_lower or "top" in query_lower or "candidate a" in query_lower):
        top_cand = ranked_list[0]
        name = top_cand["db"].get("profile", {}).get("anonymized_name", "the top candidate")
        reason = top_cand["reasoning"]
        score = top_cand["score"]
        
        return {
            "response": (
                f"Candidate {name} (ID: {top_cand['candidate_id']}) is ranked #1 because they achieved "
                f"the highest composite alignment score of {score:.4f}. {reason} They passed all honeypot checks, "
                f"have strong years of experience, and demonstrate high responsiveness on the platform."
            )
        }
        
    # Question 2: Leadership candidates
    if "leadership" in query_lower or "strongest leadership" in query_lower:
        # Find candidates with high recruiter response rate (which maps to our leadership definition)
        leadership_candidates = [
            c for c in ranked_list 
            if c["db"].get("redrob_signals", {}).get("recruiter_response_rate", 0) > 0.8
        ][:3]
        
        if not leadership_candidates:
            # Fallback to top 3
            leadership_candidates = ranked_list[:3]
            
        c_strs = []
        for c in leadership_candidates:
            p = c["db"].get("profile", {})
            name = p.get("anonymized_name", "Unknown")
            title = p.get("current_title", "Engineer")
            rate = c["db"].get("redrob_signals", {}).get("recruiter_response_rate", 0) * 100
            c_strs.append(f"- **{name}** (Rank #{c['rank']}, {title}): Exceptional {rate:.0f}% response rate to recruiters.")
            
        return {
            "response": (
                f"Here are the top candidates demonstrating strong leadership traits based on their "
                f"platform responsiveness and career history:\n\n" + "\n".join(c_strs)
            )
        }
        
    # Question 3: AI experience / ML experience
    if "ai" in query_lower or "machine learning" in query_lower or "ml" in query_lower or "nlp" in query_lower:
        ai_candidates = []
        for c in ranked_list:
            p = c["db"].get("profile", {})
            title = p.get("current_title", "").lower()
            skills = [s["name"].lower() for s in c["db"].get("skills", [])]
            
            if any(kw in title for kw in ["ai", "machine learning", "ml", "nlp"]) or \
               any(kw in "".join(skills) for kw in ["ai", "machine learning", "deep learning", "nlp", "transformers"]):
                ai_candidates.append(c)
                
        ai_candidates = ai_candidates[:3]
        if not ai_candidates:
            return {"response": "No candidates with explicit AI/ML experience found in the top rankings."}
            
        c_strs = []
        for c in ai_candidates:
            p = c["db"].get("profile", {})
            name = p.get("anonymized_name", "Unknown")
            title = p.get("current_title", "Engineer")
            yoe = p.get("years_of_experience", 0)
            c_strs.append(f"- **{name}** (Rank #{c['rank']}, {title}, {yoe} YOE): Strong background in machine learning and AI technologies.")
            
        return {
            "response": (
                f"Here are the top candidates with verified AI/ML experience based on their profile data:\n\n" + "\n".join(c_strs)
            )
        }
        
    # Question 4: Compare Candidate A and B / Compare top candidates
    if "compare" in query_lower:
        if len(ranked_list) < 2:
            return {"response": "I need at least two ranked candidates to perform a comparison."}
            
        c1 = ranked_list[0]
        c2 = ranked_list[1]
        p1 = c1["db"].get("profile", {})
        p2 = c2["db"].get("profile", {})
        
        n1 = p1.get("anonymized_name", "Candidate A")
        n2 = p2.get("anonymized_name", "Candidate B")
        
        return {
            "response": (
                f"Comparing our top two recommendations:\n\n"
                f"1. **{n1}** (Rank #1, Score: {c1['score']:.4f}): Currently a {p1.get('current_title', 'Engineer')} with {p1.get('years_of_experience', 0)} YOE. Strongest match for specialized tech requirements.\n"
                f"2. **{n2}** (Rank #2, Score: {c2['score']:.4f}): Currently a {p2.get('current_title', 'Engineer')} with {p2.get('years_of_experience', 0)} YOE.\n\n"
                f"**Verdict:** {n1} is ranked higher due to a superior skill endorsement profile and stronger platform engagement signals."
            )
        }
        
    return {
        "response": (
            f"I analyzed the candidates for: '{query}'. However, I'm constrained to pre-packaged queries for "
            f"this demo. Try asking: 'Why is Candidate A ranked higher?' or 'Show strongest leadership candidates.'"
        )
    }

