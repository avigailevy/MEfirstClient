import { PencilLine, Trash2 } from 'lucide-react';

export function Project({ project, onEdit, onDelete }) {
    return (
        <div className="component-1">
            <PencilLine onClick={onEdit} />
            <Trash2 onClick={onDelete} />

            <div className="ellipse-19"></div>
            <div className="david-shalom">{project.project_name}</div>
            <div className="frame-50">
                <div className="frame-47">
                    <div className="company">Status:</div>
                    <div className="ivory">{project.status}</div>
                </div>
                <div className="frame-48">
                    <div className="company">Created on:</div>
                    <div className="ivory">{new Date(project.creation_date).toLocaleDateString()}</div>
                </div>
                <div className="frame-49">
                    <div className="company">Last Visit:</div>
                    <div className="ivory">{new Date(project.last_visit_time).toLocaleDateString()}</div>
                </div>
            </div>

        </div>
    );
}

// import { PencilLine, Trash2 } from "lucide-react";
// import "../../css/Projects.css";

// export function Project({ project, onEdit, onDelete }) {
//   return (
//     <div className="project-card">
//       <div className="project-header">
//         <h3>{project.project_name}</h3>
//         <div className="project-controls">
//           <PencilLine onClick={onEdit} className="icon-edit" />
//           <Trash2 onClick={onDelete} className="icon-delete" />
//         </div>
//       </div>
//       <div className="project-details">
//         <div className="detail">
//           <span>Status:</span> <strong>{project.status}</strong>
//         </div>
//         <div className="detail">
//           <span>Created:</span> <strong>{new Date(project.creation_date).toLocaleDateString()}</strong>
//         </div>
//         <div className="detail">
//           <span>Last Visit:</span> <strong>{new Date(project.last_visit_time).toLocaleDateString()}</strong>
//         </div>
//       </div>
//     </div>
//   );
// }
