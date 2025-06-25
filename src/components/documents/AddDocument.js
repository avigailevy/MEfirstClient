import { useState } from 'react';

export function AddDocument({ projectId, stageId, onUpload }) {
  const [docType, setDocType] = useState("follow-up");
  const [docVersion, setDocVersion] = useState("v1");
  const [filePath, setFilePath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3333/documents", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          project_id: projectId,
          stage_id: stageId,
          doc_type: docType,
          doc_version: docVersion,
          file_path: filePath
        })
      });

      if (!res.ok) throw new Error("Failed to upload document");
      const data = await res.json();
      onUpload && onUpload(data); 
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={docType} onChange={(e) => setDocType(e.target.value)}>
        <option value="follow-up">Follow-Up</option>
        <option value="RFQ">RFQ</option>
        <option value="LOI">LOI</option>
        <option value="FCO">FCO</option>
        <option value="SPA">SPA</option>
        <option value="ICPO">ICPO</option>
        <option value="ProFormaInvoice">ProForma</option>
        <option value="Invoice">Invoice</option>
      </select>
      <input value={docVersion} onChange={(e) => setDocVersion(e.target.value)} placeholder="Version (e.g. v1)" />
      <input value={filePath} onChange={(e) => setFilePath(e.target.value)} placeholder="Google Docs link" />
      <button type="submit">Upload</button>
    </form>
  );
}
