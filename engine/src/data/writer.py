import csv
from typing import List, Dict, Any
from pathlib import Path

def write_submission_csv(
    results: List[Dict[str, Any]], 
    output_path: str = "submission.csv"
):

    if len(results) != 100:
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"Submission normally requires exactly 100 rows. Got {len(results)}. Proceeding for testing.")

    for i in range(len(results) - 1):
        if results[i]['score'] < results[i+1]['score']:
            raise ValueError(f"Scores must be non increasing. Rank {results[i]['rank']} "
                             f"has score {results[i]['score']} < Rank {results[i+1]['rank']} "
                             f"with score {results[i+1]['score']}")
                             
    fieldnames = ["candidate_id", "rank", "score", "reasoning"]
    
    path = Path(output_path)
    with path.open('w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in results:
            writer.writerow({
                "candidate_id": row["candidate_id"],
                "rank": row["rank"],
                "score": f"{row['score']:.10f}",  
                "reasoning": row.get("reasoning", "")
            })
