import { useState } from 'react';

export function UpdateDocument({ documentId, initialData = {}, onUpdate }) {
  const [docVersion, setDocVersion] = useState(initialData.doc_version || "");
  const [filePath, setFilePath] = useState(initialData.file_path || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3333/documents/${documentId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          doc_version: docVersion,
          file_path: filePath
        })
      });

      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      onUpdate && onUpdate(data);
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={docVersion} onChange={(e) => setDocVersion(e.target.value)} placeholder="New Version" />
      <input value={filePath} onChange={(e) => setFilePath(e.target.value)} placeholder="Updated URL" />
      <button type="submit">Update</button>
    </form>
  );
}
