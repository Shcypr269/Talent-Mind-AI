from pydantic import BaseModel
from typing import List

class JobDescription(BaseModel):
    title: str = "Senior AI Engineer"
    
    # Required skills parsed from JD
    required_skills: List[str] = [
        "Python",
        "embeddings",
        "retrieval",
        "Pinecone", "Weaviate", "Qdrant", "Milvus", "OpenSearch", "Elasticsearch", "FAISS",
        "vector databases",
        "NDCG", "MRR", "MAP", "A/B test",
        "evaluation frameworks"
    ]
    
    # Preferred skills
    preferred_skills: List[str] = [
        "LLM fine-tuning", "LoRA", "QLoRA", "PEFT",
        "learning-to-rank", "XGBoost",
        "HR-tech", "recruiting tech", "marketplace",
        "distributed systems", "large-scale inference",
        "open-source"
    ]
    
    # Anti-patterns from JD
    anti_patterns_consulting: List[str] = [
        "TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Capgemini"
    ]
    anti_patterns_domain: List[str] = [
        "computer vision", "speech", "robotics"
    ]

    target_experience_min: float = 5.0
    target_experience_max: float = 9.0

    target_notice_period_max: int = 30
    
    preferred_locations: List[str] = [
        "Pune", "Noida", "Hyderabad", "Mumbai", "Delhi", "Delhi NCR"
    ]
    
    target_country: str = "India"
