import json
import gzip
from typing import Iterator, Union, Dict, Any
from pathlib import Path
from ..models.candidate import Candidate
import logging

logger = logging.getLogger(__name__)

def load_candidates(file_path: Union[str, Path], parse_pydantic: bool = True) -> Iterator[Union[Candidate, Dict[str, Any]]]:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Candidate file not found: {path}")

    if path.suffix == '.json':
        with open(path, 'r', encoding='utf-8') as f:
            data_list = json.load(f)
            for item in data_list:
                if parse_pydantic:
                    yield Candidate(**item)
                else:
                    yield item
        return

    opener = gzip.open if path.suffix == '.gz' else open
    
    with opener(path, 'rt', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            
            try:
                data = json.loads(line)
                if parse_pydantic:
                    yield Candidate(**data)
                else:
                    yield data
            except Exception as e:
                logger.warning(f"Error parsing candidate on line {line_num}: {e}")
                continue
