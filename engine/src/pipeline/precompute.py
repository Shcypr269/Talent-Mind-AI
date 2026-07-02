import argparse
import numpy as np
from pathlib import Path
from ..data.loader import load_candidates
from ..models.job_description import JobDescription
from ..retrieval.embeddings import EmbeddingService
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def precompute(input_path: str, output_dir: str):
    start_time = time.time()
    
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    
    logger.info(f"Loading candidates from {input_path}...")
    candidates = list(load_candidates(input_path))
    logger.info(f"Loaded {len(candidates)} candidates.")
    
    embedder = EmbeddingService()
    
    logger.info("Generating candidate embeddings (this may take a while)...")
    embeddings = embedder.embed_candidates(candidates)
    
    emb_path = out_path / "candidate_embeddings.npy"
    np.save(emb_path, embeddings)
    logger.info(f"Saved candidate embeddings to {emb_path}")
    
    logger.info("Generating JD embedding")
    jd = JobDescription()
    jd_emb = embedder.embed_jd(jd)
    jd_path = out_path / "jd_embedding.npy"
    np.save(jd_path, jd_emb)
    logger.info(f"Saved JD embedding to {jd_path}")
    
    logger.info(f"Precompute finished in {time.time() - start_time:.2f} seconds.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Precompute embeddings for the ranking engine.")
    parser.add_argument("--input", required=True, help="Path to candidates.jsonl")
    parser.add_argument("--output", default="engine/data", help="Output directory for embeddings")
    
    args = parser.parse_args()
    precompute(args.input, args.output)
