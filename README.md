# TalentMind AI

### AI-Powered Hiring Intelligence Platform That Understands Talent Beyond Keywords

> Building the future of hiring by combining role understanding, candidate intelligence, behavioral analysis, career trajectory modeling, platform activity insights, semantic retrieval, and explainable AI ranking.

---

## Overview

Recruiters often review hundreds or thousands of candidate profiles while trying to identify the best fit for a role.

Traditional Applicant Tracking Systems (ATS) and keyword-based filtering systems frequently miss exceptional candidates because they rely heavily on exact keyword matching rather than understanding:

* Career growth
* Behavioral characteristics
* Leadership potential
* Platform engagement
* Learning mindset
* Contextual role fit

TalentMind AI solves this problem by acting as an AI-powered recruiter that evaluates candidates holistically.

Instead of asking:

> “Does this resume contain the right keywords?”

TalentMind AI asks:

> “Would an experienced recruiter shortlist this candidate for this role?”

---

# Challenge Statement

This project was built for the **Data & AI Challenge**.

The challenge requires participants to:

* Understand job requirements
* Understand candidate profiles
* Analyze behavioral signals
* Analyze platform activity
* Generate recruiter-quality rankings
* Produce trustworthy candidate shortlists

TalentMind AI addresses each of these requirements through a multi-agent AI architecture.

---

# Problem We Are Solving

Recruiters face three major problems:

### 1. Keyword Matching Fails

A candidate may have the required skills but describe them differently.

Traditional systems miss these candidates.

---

### 2. Behavioral Signals Are Ignored

Most hiring systems cannot evaluate:

* Ownership
* Leadership
* Initiative
* Communication
* Learning mindset

Yet recruiters rely heavily on these traits.

---

### 3. Career Growth Is Overlooked

A rapidly growing candidate can be more valuable than someone with more years of experience.

Most ranking systems ignore trajectory and focus only on static experience.

---

# Solution

TalentMind AI combines structured candidate intelligence with LLM reasoning to rank candidates like an expert recruiter.

The platform evaluates:

 Skills

 Experience

 Behavioral Signals

 Career Growth

 Platform Activity

 Semantic Role Fit

---

# System Architecture

```text
Job Description
 │
 ▼
Role Understanding Agent
 │
 ▼
Candidate Intelligence Agent
 │
 ▼
Behavioral Signal Agent
 │
 ▼
Career Trajectory Agent
 │
 ▼
Platform Activity Agent
 │
 ▼
Hybrid Retrieval Engine
 │
 ▼
LLM Recruiter Ranking Agent
 │
 ▼
Explainability Agent
 │
 ▼
Final Ranked Shortlist
```

---

# Dataset Usage

The challenge provides:

```text
candidate_schema.json
candidates.jsonl
job_description.docx
redrob_signals_doc.docx
sample_submission.csv
validate_submission.py
```

### Candidate Dataset

Contains structured candidate information including:

* Skills
* Experience
* Education
* Certifications
* Career history
* Platform activity

---

### Redrob Signals Dataset

Contains behavioral and engagement signals such as:

* Recruiter response rate
* Interview completion rate
* Search appearances
* Recruiter saves
* GitHub activity
* Profile completeness

These signals are transformed into recruiter-relevant traits.

---

# AI Agents

## 1. Role Understanding Agent

### Purpose

Reads the job description and understands:

* Required skills
* Preferred skills
* Seniority level
* Responsibilities
* Industry context
* Behavioral expectations

### Output

```json
{
 "required_skills": [],
 "preferred_skills": [],
 "behavioral_traits": []
}
```

---

## 2. Candidate Intelligence Agent

### Purpose

Transforms raw candidate records into recruiter-friendly profiles.

### Extracts

* Experience
* Skills
* Certifications
* Industry expertise
* Projects
* Education

### Output

A structured candidate profile.

---

## 3. Behavioral Signal Agent

### Purpose

Converts Redrob platform signals into human behavioral traits.

### Measures

* Ownership
* Leadership
* Communication
* Initiative
* Consistency
* Collaboration
* Learning Mindset

---

## 4. Career Trajectory Agent

### Purpose

Analyzes professional growth.

### Measures

* Promotion velocity
* Responsibility growth
* Leadership growth
* Career momentum

---

## 5. Platform Activity Agent

### Purpose

Evaluates candidate engagement and market relevance.

### Signals Used

* Profile views
* Recruiter saves
* Search appearances
* Response rate
* GitHub activity

---

## 6. Hybrid Retrieval Engine

### Purpose

Efficiently retrieve the most relevant candidates from large candidate pools.

### Technology

* BGE-M3 Embeddings
* FAISS Vector Database

### Retrieval Formula

```text
40% Semantic Similarity
30% Skill Alignment
30% Experience Alignment
```

---

## 7. Recruiter Ranking Agent

### Purpose

Simulates an expert recruiter.

### Evaluates

* Skill Match
* Experience Match
* Behavioral Fit
* Growth Potential
* Platform Activity
* Domain Relevance

---

## 8. Explainability Agent

### Purpose

Ensures recruiter trust.

Generates:

* Strengths
* Weaknesses
* Missing skills
* Ranking rationale

---

# Candidate Scoring Framework

Final score is calculated using:

```text
Final Score =

0.25 × Skill Match

+ 0.20 × Experience Match

+ 0.20 × Behavioral Fit

+ 0.15 × Growth Potential

+ 0.10 × Platform Activity

+ 0.10 × Semantic Similarity
```

This approach provides a balanced recruiter-style evaluation.

---

# Frontend Dashboard

TalentMind AI includes a modern recruiter dashboard featuring:

### Executive Dashboard

* Hiring insights
* Candidate statistics
* Funnel analytics

### Job Analysis

* Role understanding
* Skill extraction
* Behavioral expectations

### Candidate Rankings

* AI-generated rankings
* Filtering and sorting

### Candidate Profiles

* Behavioral radar charts
* Career trajectory visualizations
* Explainability reports

### AI Recruiter Copilot

Natural language recruiter assistant.

Example questions:

```text
Why is Candidate A ranked above Candidate B?

Show candidates with strong leadership.

Find candidates with AI experience.
```

---

# Key Innovations

### Behavioral Intelligence

Most systems ignore behavioral signals.

TalentMind AI incorporates behavioral scoring directly into candidate ranking.

---

### Career Trajectory Analysis

Measures candidate growth instead of static experience.

---

### Explainable AI

Every recommendation includes reasoning and evidence.

---

### Recruiter-Centric Design

Built around how recruiters actually evaluate talent.

---

# Business Impact

TalentMind AI helps organizations:

### Reduce Screening Time

Hours Minutes

---

### Improve Candidate Quality

Better shortlists.

Higher recruiter confidence.

---

### Reduce False Negatives

Strong candidates are less likely to be overlooked.

---

### Improve Hiring Decisions

More context.

More transparency.

More trust.

---

# Future Roadmap

## Phase 1

Current Hackathon MVP

* Role Understanding
* Candidate Ranking
* Behavioral Analysis
* Explainability

---

## Phase 2

Real-Time ATS Integration

Support:

* Greenhouse
* Lever
* Ashby
* Workday

---

## Phase 3

Interview Intelligence

* Interview question generation
* Candidate fit prediction
* Hiring risk assessment

---

## Phase 4

Talent Graph

Relationship mapping between:

* Skills
* Industries
* Career paths
* Hiring outcomes

---

## Phase 5

Autonomous AI Recruiter

An AI agent capable of:

* Sourcing candidates
* Ranking applicants
* Conducting screening conversations
* Recommending hires

---

# ️ Running The Project

The project is structured with a Next.js frontend at the root and our modular Python ranking engine in the `engine/` directory.

## 1. Frontend Setup (Next.js Dashboard)

Install node modules and start the dev server:
```bash
# From the root directory
npm install
npm run dev
```

Access the UI dashboard at:
```text
http://localhost:3000
```

---

## 2. Backend Setup (FastAPI Server)

Install Python dependencies and start the API server:
```bash
# Install packages
pip install -r engine/requirements.txt

# Start API server
uvicorn engine.src.api.main:app --reload
```

Access the API at:
```text
http://127.0.0.1:8000/api/rank
```

---

## 3. Running the AI Ranking Pipeline (Command Line)

To run the ranking engine offline against candidate datasets:

**Step A: Precompute Embeddings**
Generate dense semantic embeddings for candidate profiles:
```bash
python -m engine.src.pipeline.precompute --input path/to/candidates.jsonl
```

**Step B: Execute Ranking & Scoring**
Retrieve top matches via Hybrid Search (FAISS + BM25) and score them via the Composite Scorer:
```bash
python -m engine.src.pipeline.rank --input path/to/candidates.jsonl --output submission.csv
```

---

# Submission Output

The system generates:
- `submission.csv` containing the top 100 candidates formatted to the exact spec.
- `submission.xlsx` if portal requires Excel uploads.

You can validate the output using the organizers' script:
```bash
python validate_submission.py
```

---

# Team

Built for the Data & AI Challenge.

**TalentMind AI**
*Understanding Talent Beyond Keywords.*
