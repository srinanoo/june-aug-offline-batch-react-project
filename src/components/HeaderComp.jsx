import { NavLink } from "react-router-dom";

export default function HeaderComp() {
    return (
        <>
            <div className="flex">
                <div>
                    LOGO
                </div>
                <div>
                    <nav className="menu">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/trainees">Trainees</NavLink></li>
                            <li><NavLink to="/classes">Classes</NavLink></li>
                            <li><NavLink to="/trainers">Trainers</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}