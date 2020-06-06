import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css'

function Folder(props) {
    return (
        <div className="Section">
            {props.folders.map((folder, idx) => (
                <div className="Folder" key={idx}>
                    <NavLink className="navLink" to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                </div>
            ))}
        </div>
    )
}

export default Folder;