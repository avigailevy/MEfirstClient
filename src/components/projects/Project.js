import { PencilLine, Trash2 } from 'lucide-react';
import '../../css/Projects.css';

export function Project({ project, onEdit, onDelete }) {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <PencilLine className="icon-edit" onClick={onEdit} />
                <Trash2 className="icon-delete" onClick={onDelete} />
            </div>

            <div className="project-avatar" />
            <div className="project-title">{project.project_name}</div>

            <div className="project-details">
                <div className="project-detail-row">
                    <span className="label">Status:</span>
                    <span className="value">{project.status}</span>
                </div>
                <div className="project-detail-row">
                    <span className="label">Created on:</span>
                    <span className="value">{new Date(project.creation_date).toLocaleDateString()}</span>
                </div>
                <div className="project-detail-row">
                    <span className="label">Last Visit:</span>
                    <span className="value">{new Date(project.last_visit_time).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

