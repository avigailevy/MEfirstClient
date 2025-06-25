import { Link } from "react-router-dom";
import { PencilLine, Trash2 } from 'lucide-react';

export function Project({ project, onEdit, onDelete }) {
  return (
     <div className="component-1">
       <PencilLine onClick={onEdit} />
        <Trash2 onClick={onDelete} />
          
                <div className="ellipse-19">{}</div>
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
                      <Link to={`/projects/${project.project_id}`} className="btn-details">
                   
          Details
        </Link>      
            </div>


  );
}
