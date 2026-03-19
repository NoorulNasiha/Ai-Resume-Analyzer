import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await axios.post(`${baseUrl}/api/analyze`, {
        job_description: jobDescription,
        resume_text: resumeText,
      });
      setResult(res.data);
    } catch (err) {
      setError("Failed to analyze. Please ensure the backend is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      <Head>
        <title>Resume AI Analyzer</title>
        <meta name="description" content="AI-assisted resume to job description matching." />
      </Head>

      <main style={{ width: "100%", maxWidth: "1000px" }} className="animate-fade-in">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ 
            fontSize: "3.5rem", 
            background: "linear-gradient(90deg, var(--accent-secondary), var(--accent-color))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "16px",
            letterSpacing: "-1px"
          }}>
            Resume AI Analyzer
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Instantly evaluate how well your resume matches a target job description using our advanced matching engine.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px", 
          marginBottom: "36px" 
        }}>
          <section className="glass-panel">
            <label style={{ display: "block", marginBottom: "16px", fontSize: "1.2rem", fontWeight: 600, color: "var(--accent-color)", letterSpacing: "0.5px" }}>
              Job Description
            </label>
            <textarea
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={inputStyle}
            />
          </section>

          <section className="glass-panel">
            <label style={{ display: "block", marginBottom: "16px", fontSize: "1.2rem", fontWeight: 600, color: "var(--accent-color)", letterSpacing: "0.5px" }}>
              Your Resume
            </label>
            <textarea
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={inputStyle}
            />
          </section>
        </div>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button
            onClick={submit}
            disabled={isLoading || !jobDescription || !resumeText}
            style={buttonStyle(isLoading || !jobDescription || !resumeText)}
            onMouseOver={(e) => {
              if(!isLoading && jobDescription && resumeText) {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 252, 241, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              if(!isLoading && jobDescription && resumeText) {
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 252, 241, 0.4)";
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                <span className="spinner"></span> Analyzing Match...
              </span>
            ) : "Analyze Compatibility"}
          </button>
        </div>

        {error && (
          <div className="glass-panel animate-fade-in" style={{ borderColor: "rgba(255, 74, 74, 0.4)", background: "rgba(255, 74, 74, 0.1)", textAlign: "center", color: "#ff8f8f", fontWeight: 500 }}>
            {error}
          </div>
        )}

        {result && (
          <div className="glass-panel animate-fade-in" style={{ marginTop: "40px" }}>
            <h2 style={{ marginBottom: "32px", color: "var(--text-primary)", textAlign: "center", fontSize: "2rem" }}>Analysis Results</h2>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px", gap: "60px", flexWrap: "wrap", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  fontSize: "4.5rem", 
                  fontWeight: 700, 
                  color: result.score >= 0.8 ? "#4ade80" : result.score >= 0.5 ? "#facc15" : "#f87171",
                  textShadow: "0 0 30px rgba(0,0,0,0.4)",
                  lineHeight: 1
                }}>
                  {Math.round(result.score * 100)}<span style={{ fontSize: "2.5rem", opacity: 0.8 }}>%</span>
                </div>
                <div style={{ textTransform: "uppercase", letterSpacing: "2.5px", fontSize: "0.95rem", opacity: 0.7, marginTop: "8px" }}>Match Score</div>
              </div>
              
              <div style={{ borderLeft: "2px solid rgba(255,255,255,0.1)", paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                   <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-secondary)" }}></div>
                   <p style={{ margin: 0, fontSize: "1.1rem" }}><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Resume Length:</strong> <span style={{ opacity: 0.8 }}>{result.resume_length} chars</span></p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                   <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-secondary)" }}></div>
                   <p style={{ margin: 0, fontSize: "1.1rem" }}><strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Job Length:</strong> <span style={{ opacity: 0.8 }}>{result.job_description_length} chars</span></p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: "20px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", color: "var(--accent-color)" }}>Matched Keywords</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {result.common_keywords?.length > 0 ? result.common_keywords.map((kw: string) => (
                  <span key={kw} style={{
                    background: "rgba(102, 252, 241, 0.1)",
                    border: "1px solid rgba(102, 252, 241, 0.3)",
                    padding: "8px 18px",
                    borderRadius: "30px",
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                    transition: "all 0.2s ease",
                    cursor: "default"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(102, 252, 241, 0.25)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(102, 252, 241, 0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  >
                    {kw}
                  </span>
                )) : (
                  <p style={{ opacity: 0.5, fontStyle: "italic" }}>No common keywords found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  minHeight: "320px",
  background: "rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "20px",
  color: "var(--text-main)",
  fontSize: "1rem",
  lineHeight: 1.6,
  fontFamily: "inherit",
  resize: "vertical" as const,
  outline: "none",
  transition: "all 0.3s ease",
};

const buttonStyle = (disabled: boolean) => ({
  background: disabled ? "rgba(102, 252, 241, 0.15)" : "linear-gradient(135deg, var(--accent-secondary), var(--accent-color))",
  color: disabled ? "rgba(255,255,255,0.3)" : "#0b0c10",
  border: "none",
  borderRadius: "40px",
  padding: "18px 48px",
  fontSize: "1.25rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.3s ease",
  boxShadow: disabled ? "none" : "0 4px 15px rgba(102, 252, 241, 0.3)",
  width: "100%",
  maxWidth: "400px",
});
