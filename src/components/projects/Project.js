import { Link } from "react-router-dom";
import { PencilLine, Trash2 } from 'lucide-react';

export function Project({ project, onEdit, onDelete }) {
  return (
    <div className="project-card">
      <div className="project-info">
        <h4 className="project-name">{project.project_name}</h4>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Created on:</strong> {new Date(project.creation_date).toLocaleDateString()}</p>
        {project.last_visit_time && (
          <p><strong>Last Visit:</strong> {new Date(project.last_visit_time).toLocaleDateString()}</p>
        )}
        {/* בעתיד אפשר להוסיף כאן גם product_id, supplier_id, customer_id */}
      </div>

      <div className="project-actions">
        <button className="btn-icon" onClick={onEdit} title="Edit"><PencilLine /></button>
        <button className="btn-icon" onClick={onDelete} title="Delete"><Trash2 /></button>
        <Link to={`/projects/${project.project_id}`} className="btn-details">
          Details
        </Link>
      </div>
    </div>
  );
}
