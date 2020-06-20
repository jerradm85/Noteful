import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css'
import NotefulContext from '../NotefulContext';

function Folder() {
    return (
        <NotefulContext.Consumer>
            {(context) => {
                return (
                    <section className="Section">
                        {context.folders.map((folder, idx) => (
                            <div className="Folder" key={idx}>
                                <NavLink className="navLink" to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                            </div>
                        ))}
                    </section>
                )
            }}
        </NotefulContext.Consumer>
    )

}

export default Folder;