
import re
from typing import Any


# Canonical skill name: known aliases and related terms.
# This is a starter taxonomy designed to cover multiple industries.
SKILL_TAXONOMY: dict[str, list[str]] = {
    # ── Data, AI and analytics ─────────────────────────────────────
    "python": ["python"],
    "sql": ["sql", "structured query language"],
    "mysql": ["mysql"],
    "postgresql": ["postgresql", "postgres"],
    "mongodb": ["mongodb", "mongo db"],
    "nosql": ["nosql", "no sql"],
    "pandas": ["pandas"],
    "numpy": ["numpy"],
    "excel": ["excel", "microsoft excel", "spreadsheets"],
    "power bi": ["power bi", "powerbi"],
    "tableau": ["tableau"],
    "data analysis": ["data analysis", "data analytics", "eda", "exploratory data analysis"],
    "data visualization": ["data visualization", "data visualisation"],
    "statistics": ["statistics", "statistical analysis"],
    "machine learning": ["machine learning", "ml"],
    "deep learning": ["deep learning"],
    "natural language processing": ["natural language processing", "nlp"],
    "computer vision": ["computer vision"],
    "matplotlib": ["matplotlib"],
    "seaborn": ["seaborn"],
    "scikit-learn": ["scikit-learn", "scikit learn", "sklearn"],
    "tensorflow": ["tensorflow"],
    "pytorch": ["pytorch"],
    "data cleaning": ["data cleaning", "data cleansing", "data preprocessing"],
    "etl": ["etl", "extract transform load"],
    "business intelligence": ["business intelligence", "bi reporting"],

    # ── Software and IT ────────────────────────────────────────────
    "java": ["java"],
    "c": ["c programming", "programming in c"],
    "c++": ["c++", "cpp"],
    "c#": ["c#", "c sharp"],
    "javascript": ["javascript"],
    "typescript": ["typescript"],
    "html": ["html", "hypertext markup language"],
    "css": ["css", "cascading style sheets"],
    "react": ["react", "react.js", "reactjs"],
    "node.js": ["node.js", "nodejs"],
    "fastapi": ["fastapi"],
    "flask": ["flask"],
    "django": ["django"],
    "rest apis": ["rest api", "rest apis", "restful api"],
    "git": ["git"],
    "github": ["github"],
    "linux": ["linux"],
    "docker": ["docker"],
    "kubernetes": ["kubernetes", "k8s"],
    "aws": ["aws", "amazon web services"],
    "microsoft azure": ["microsoft azure", "azure"],
    "google cloud": ["google cloud", "gcp"],
    "cybersecurity": ["cybersecurity", "cyber security", "information security"],
    "networking": ["computer networking", "network administration"],
    "software testing": ["software testing", "quality assurance", "qa testing"],
    "agile": ["agile methodology", "agile development"],
    "scrum": ["scrum"],
    "api development": ["api development"],

    # ── Engineering and manufacturing ──────────────────────────────
    "autocad": ["autocad", "auto cad"],
    "solidworks": ["solidworks", "solid works"],
    "catia": ["catia"],
    "ansys": ["ansys"],
    "finite element analysis": ["finite element analysis", "fea"],
    "computer aided design": ["computer aided design", "cad"],
    "computer aided manufacturing": ["computer aided manufacturing", "cam"],
    "cnc machining": ["cnc machining", "cnc programming"],
    "plc programming": ["plc programming", "programmable logic controller"],
    "robotics": ["robotics", "robotic systems"],
    "embedded systems": ["embedded systems", "embedded development"],
    "microcontrollers": ["microcontrollers", "microcontroller programming"],
    "firmware development": ["firmware development", "firmware engineering"],
    "electrical circuit design": ["circuit design", "electrical circuit design"],
    "electronics": ["electronics", "electronic circuits"],
    "power systems": ["power systems", "electrical power systems"],
    "control systems": ["control systems", "control engineering"],
    "quality control": ["quality control", "qc"],
    "quality management": ["quality management", "quality assurance systems"],
    "lean manufacturing": ["lean manufacturing", "lean production"],
    "six sigma": ["six sigma"],
    "supply chain management": ["supply chain management", "supply chain"],
    "inventory management": ["inventory management", "stock control"],
    "preventive maintenance": ["preventive maintenance", "preventative maintenance"],
    "project management": ["project management"],

    # ── Business, finance and accounting ───────────────────────────
    "financial analysis": ["financial analysis", "financial modelling", "financial modeling"],
    "financial reporting": ["financial reporting"],
    "accounting": ["accounting", "bookkeeping"],
    "auditing": ["auditing", "audit procedures"],
    "taxation": ["taxation", "tax compliance", "tax preparation"],
    "budgeting": ["budgeting", "budget preparation"],
    "forecasting": ["forecasting", "financial forecasting"],
    "risk management": ["risk management", "risk assessment"],
    "investment analysis": ["investment analysis"],
    "valuation": ["business valuation", "company valuation"],
    "accounts payable": ["accounts payable"],
    "accounts receivable": ["accounts receivable"],
    "payroll": ["payroll processing", "payroll management"],
    "banking operations": ["banking operations"],
    "credit analysis": ["credit analysis", "credit risk analysis"],
    "insurance underwriting": ["insurance underwriting", "underwriting"],
    "business analysis": ["business analysis", "business requirements analysis"],
    "business strategy": ["business strategy", "strategic planning"],
    "market research": ["market research"],
    "customer relationship management": ["customer relationship management", "crm"],
    "sales": ["sales", "sales development"],
    "negotiation": ["negotiation", "negotiation skills"],
    "procurement": ["procurement", "purchasing"],
    "vendor management": ["vendor management"],

    # ── Marketing and communications ───────────────────────────────
    "digital marketing": ["digital marketing"],
    "search engine optimization": ["search engine optimization", "seo"],
    "search engine marketing": ["search engine marketing", "sem"],
    "social media marketing": ["social media marketing", "social media management"],
    "content writing": ["content writing", "content creation"],
    "copywriting": ["copywriting", "advertising copy"],
    "email marketing": ["email marketing"],
    "marketing analytics": ["marketing analytics", "campaign analytics"],
    "brand management": ["brand management"],
    "public relations": ["public relations", "pr communications"],
    "advertising": ["advertising", "paid advertising"],
    "lead generation": ["lead generation"],
    "market segmentation": ["market segmentation"],
    "google analytics": ["google analytics", "ga4"],
    "search advertising": ["google ads", "search ads"],
    "graphic design": ["graphic design"],
    "video editing": ["video editing", "video production"],

    # ── Healthcare and life sciences ───────────────────────────────
    "patient care": ["patient care", "patient-centered care"],
    "nursing": ["nursing", "clinical nursing"],
    "first aid": ["first aid"],
    "basic life support": ["basic life support", "bls"],
    "advanced cardiac life support": ["advanced cardiac life support", "acls"],
    "clinical documentation": ["clinical documentation", "medical documentation"],
    "medical terminology": ["medical terminology"],
    "patient assessment": ["patient assessment", "clinical assessment"],
    "infection control": ["infection control", "infection prevention"],
    "medication administration": ["medication administration"],
    "phlebotomy": ["phlebotomy", "blood collection"],
    "medical laboratory techniques": ["medical laboratory techniques", "clinical laboratory testing"],
    "clinical research": ["clinical research"],
    "clinical trials": ["clinical trials", "clinical trial management"],
    "public health": ["public health"],
    "epidemiology": ["epidemiology"],
    "medical coding": ["medical coding", "clinical coding"],
    "medical billing": ["medical billing"],
    "healthcare administration": ["healthcare administration", "hospital administration"],
    "patient communication": ["patient communication", "patient counselling"],

    # ── Education and training ────────────────────────────────────
    "lesson planning": ["lesson planning", "lesson design"],
    "classroom management": ["classroom management"],
    "curriculum development": ["curriculum development", "curriculum design"],
    "instructional design": ["instructional design"],
    "student assessment": ["student assessment", "educational assessment"],
    "tutoring": ["tutoring", "academic tutoring"],
    "educational technology": ["educational technology", "edtech"],
    "learning management systems": ["learning management systems", "lms administration"],
    "training and development": ["training and development", "employee training"],

    # ── Law, compliance and administration ─────────────────────────
    "legal research": ["legal research"],
    "contract drafting": ["contract drafting", "legal drafting"],
    "contract management": ["contract management"],
    "compliance": ["regulatory compliance", "compliance management"],
    "policy analysis": ["policy analysis"],
    "document management": ["document management", "records management"],
    "data entry": ["data entry"],
    "office administration": ["office administration", "administrative support"],
    "scheduling": ["scheduling", "calendar management"],
    "customer service": ["customer service", "customer support"],
    "conflict resolution": ["conflict resolution"],

    # ── Design, media and creative work ────────────────────────────
    "ui design": ["ui design", "user interface design"],
    "ux design": ["ux design", "user experience design"],
    "figma": ["figma"],
    "adobe photoshop": ["adobe photoshop", "photoshop"],
    "adobe illustrator": ["adobe illustrator", "illustrator"],
    "adobe premiere pro": ["adobe premiere pro", "premiere pro"],
    "video production": ["video production"],
    "photography": ["photography"],
    "animation": ["animation", "2d animation", "3d animation"],
    "typography": ["typography"],
    "wireframing": ["wireframing", "wireframes"],
    "prototyping": ["prototyping", "interactive prototypes"],

    # ── Hospitality, retail and logistics ──────────────────────────
    "food safety": ["food safety", "food hygiene"],
    "food preparation": ["food preparation", "food handling"],
    "menu planning": ["menu planning"],
    "hotel operations": ["hotel operations", "hospitality operations"],
    "front desk operations": ["front desk operations", "front office operations"],
    "housekeeping": ["housekeeping"],
    "event management": ["event management", "event planning"],
    "retail operations": ["retail operations", "store operations"],
    "visual merchandising": ["visual merchandising"],
    "point of sale systems": ["point of sale systems", "pos systems"],
    "warehouse management": ["warehouse management", "warehouse operations"],
    "logistics": ["logistics", "logistics coordination"],
    "fleet management": ["fleet management"],
    "route planning": ["route planning", "delivery route optimization"],

    # ── Construction, trades and environment ───────────────────────
    "construction management": ["construction management"],
    "site supervision": ["site supervision", "construction site supervision"],
    "quantity surveying": ["quantity surveying", "quantity surveyor"],
    "building information modeling": ["building information modeling", "bim"],
    "health and safety": ["occupational health and safety", "workplace safety"],
    "risk assessment": ["risk assessment", "hazard assessment"],
    "environmental impact assessment": ["environmental impact assessment", "eia"],
    "environmental monitoring": ["environmental monitoring"],
    "waste management": ["waste management"],
    "water quality testing": ["water quality testing"],
    "renewable energy": ["renewable energy"],
    "solar installation": ["solar panel installation", "solar installation"],
    "welding": ["welding"],
    "electrical installation": ["electrical installation"],
    "plumbing": ["plumbing"],
    "carpentry": ["carpentry"],

    # ── Cross-industry professional skills ─────────────────────────
    "communication": ["communication skills", "written communication", "verbal communication"],
    "teamwork": ["teamwork", "team collaboration", "collaborative working"],
    "problem solving": ["problem-solving", "problem solving", "analytical thinking"],
    "leadership": ["leadership", "team leadership"],
    "time management": ["time management", "time-management"],
    "attention to detail": ["attention to detail", "detail-oriented"],
    "critical thinking": ["critical thinking"],
    "adaptability": ["adaptability", "adaptable"],
    "presentation skills": ["presentation skills", "presentations"],
    "research": ["research skills", "research methodology"],
    "report writing": ["report writing", "technical report writing"],
    "embedded C": ["embedded c", "embedded-c"],
    "arm cortex-m": ["arm cortex-m", "cortex-m"],
    "freertos": ["freertos", "free rtos"],
    "uart": ["uart", "universal asynchronous receiver transmitter"],
    "spi": ["spi", "serial peripheral interface"],
    "i2c": ["i2c", "inter-integrated circuit"],
}


def _contains_term(text: str, term: str) -> bool:
    """Match a phrase while avoiding partial-word matches."""
    pattern = rf"(?<!\w){re.escape(term)}(?!\w)"
    return re.search(pattern, text, flags=re.IGNORECASE) is not None


def extract_skills(text: str) -> list[str]:
    """Extract skills recognized by the cross-industry taxonomy."""
    normalized_text = text.replace("–", "-").replace("—", "-")
    found = []

    for skill, aliases in SKILL_TAXONOMY.items():
        if any(_contains_term(normalized_text, alias) for alias in aliases):
            found.append(skill)

    return sorted(found)


def analyze_match(resume_text: str, job_description: str) -> dict[str, Any]:
    """Compare recognized skills and expose coverage limitations."""
    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_description))

    matched_skills = sorted(resume_skills & job_skills)
    missing_skills = sorted(job_skills - resume_skills)

    if not job_skills:
        return {
            "match_score": None,
            "score_type": "recognized_skill_overlap",
            "message": (
                "No skills from the current taxonomy were recognized in the job "
                "description. The match score cannot be calculated reliably."
            ),
            "resume_skills": sorted(resume_skills),
            "job_skills": [],
            "matched_skills": [],
            "missing_skills": [],
            "taxonomy_notice": (
                "The taxonomy is a starter vocabulary and may not cover every "
                "industry, qualification, or job requirement."
            ),
        }

    score = round(100 * len(matched_skills) / len(job_skills))

    return {
        "match_score": score,
        "score_type": "recognized_skill_overlap",
        "message": (
            "This preliminary score measures overlap among skills recognized "
            "by the current taxonomy. It does not assess proficiency, context, "
            "years of experience, or hiring probability."
        ),
        "resume_skills": sorted(resume_skills),
        "job_skills": sorted(job_skills),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "taxonomy_notice": (
            "Requirements not recognized by the taxonomy are not included in "
            "this score. Review the job description for additional requirements."
        ),
    }
