from flask import Flask, render_template

app = Flask(__name__)

PROFILE = {
    "name": "Heera Mohan Sardar",
    "location": "Dineshpur, Udham Singh Nagar, Uttarakhand, India",
    "email": "sardarhiramohan5@gmail.com",
    "linkedin": "https://www.linkedin.com/in/heera-mohan-sardar-10231b354",
    "github": "https://github.com/Heeramohan658",
}

EDUCATION = [
    {
        "year": "2024–2027",
        "title": "Bachelor of Computer Applications (BCA)",
        "school": "Graphic Era Hill University",
        "detail": "Undergraduate",
    },
    {
        "year": "2024",
        "title": "Class 12 — PCM",
        "school": "SDSNIC",
        "detail": "Physics · Chemistry · Mathematics",
    },
    {
        "year": "2022",
        "title": "Class 10",
        "school": "SDS NIC, Dineshpur",
        "detail": "School Education",
    },
]

PROJECTS = [
    {
        "title": "AI-Based Road Damage Detection",
        "description": "A planned AI project exploring road-damage detection, GPS locations, and map-based reporting.",
        "tags": ["Python", "AI/ML", "Mapping"],
    },
    {
        "title": "AI Attendance Management System",
        "description": "An attendance-management project concept using a web interface and database integration.",
        "tags": ["Python", "Streamlit", "Database"],
    },
    {
        "title": "ATS Resume Checker with AI",
        "description": "A resume-focused project concept for checking ATS compatibility and improving resume content.",
        "tags": ["AI", "Resume", "Web"],
    },
]


@app.route("/")
def home():
    return render_template(
        "index.html",
        profile=PROFILE,
        education=EDUCATION,
        projects=PROJECTS,
    )


if __name__ == "__main__":
    # Development server only. Set debug=False before publishing.
    app.run(host="127.0.0.1", port=5000, debug=True)
