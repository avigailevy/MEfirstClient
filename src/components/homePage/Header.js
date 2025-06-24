import { Notification } from './Notification'
export function Header() {

    // showRecentProjects = () =>{
    //     return(
    //     );
    // }

    return (
        <div className="header-container">
            <Notification userRole={'admin'}/>
        </div>
    );
}                    