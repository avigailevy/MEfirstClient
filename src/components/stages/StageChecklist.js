import { useEffect, useState } from "react";

export function StageChecklist({ stageId }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const checklistItems = [
    "Accurate Product definition",
    "Quantities",
    "Packing size",
    "Shipping Terms",
    "Country of Destination",
    "Payment Terms",
    "Private Label or Producer Label",
    "Regulatory issues at the country of destination",
    "Any other possible obstacles",
  ];

  // פונקציה לפרסר מחרוזת '1,3,5' למערך מספרים
  const parseChecked = (str) => {
    if (!str) return [];
    return str.split(",").map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
  };

  // טעינת נתוני הצ'קליסט מהשרת לפי stageId
  useEffect(() => {
    async function fetchChecklist() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/stages/${stageId}`);
        if (!res.ok) throw new Error("Failed to load stage data");
        const data = await res.json();

        // data.extend_stage_1 = מחרוזת כמו "1,3,5"
        setCheckedItems(parseChecked(data.extend_stage_1));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchChecklist();
  }, [stageId]);

  // טוגל סימון פריט
  const toggleCheck = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );
  };

  // שמירת המצב לשרת
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const serialized = checkedItems.join(",");
      const res = await fetch(`/api/stages/${stageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extend_stage_1: serialized }),
      });
      if (!res.ok) throw new Error("Failed to save checklist");
      alert("Checklist saved successfully!");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading checklist...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: 400 }}>
      <h4>Checklist for Stage {stageId}</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {checklistItems.map((item, idx) => {
          const index = idx + 1;
          return (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(index)}
                  onChange={() => toggleCheck(index)}
                  disabled={saving}
                />{" "}
                {index}. {item}
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Checklist"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
