import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Summary } from "./Summary"; // קומפוננטת הבן
import "../../css/summaries.css";

export function ProjectSummaries({ projectId }) {
  const [summaries, setSummaries] = useState([]);
  const [userId, setUserId] = useState(null);
  const [summaryText, setSummaryText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  // שליפת הסיכומים מהשרת
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await fetch(`http://localhost:3333/summaries/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch summaries");
        const data = await res.json();

        // מיון לפי זמן (חדש -> ישן)
        data.sort((a, b) => new Date(a.summary_time) - new Date(b.summary_time));
        setSummaries(data);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    if (userId) fetchSummaries();
  }, [projectId, userId]);

  const sendSummary = async () => {
    if (!summaryText.trim()) return;

    try {
      const res = await fetch(`http://localhost:3333/summaries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          project_id: projectId,
          from_user_id: userId,
          summary_text: summaryText,
        }),
      });

      if (!res.ok) throw new Error("Failed to send summary");

      const newSummary = await res.json();
      setSummaries((prev) => [...prev, newSummary]);
      setSummaryText("");
    } catch (error) {
      console.error("Error sending summary:", error);
    }
  };

  return (
    <div className="summary-wrapper">
      <h3 className="summaryTitle">Project Chat Summary</h3>

      <div className="summary-messages">
        {summaries.length > 0 ? (
          summaries.map((s) => (
            <Summary key={s.summary_id} summary={s} currentUserId={userId} />
          ))
        ) : (
          <p>No summaries yet.</p>
        )}
      </div>

      <form
        className="summary-input"
        onSubmit={(e) => {
          e.preventDefault();
          sendSummary();
        }}
      >
        <input
          type="text"
          placeholder="כתוב סיכום שיחה..."
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
        />
        <button type="submit">שלח</button>
      </form>
    </div>
  );
}
