import React from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css'
import NotefulContext from '../../NotefulContext';

class Folder extends React.Component {
    static contextType = NotefulContext;

    removeFolder = (folder) => {
        const delFolder = folder;
        fetch(`http://localhost:8000/folders/${delFolder}`,{
            method:"DELETE"
        })
        .then(() => {
            this.context.deleteFolder(delFolder);
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {(context) => {
                    return (
                        <section className="Section">
                            {context.folders.map((folder, idx) => (
                                <li className="Folder" key={idx}>
                                    <NavLink className="navLink" to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                                    <button className="folderDel" onClick={() => this.removeFolder(folder.id)}>Delete</button>
                                </li>
                            ))}
                        </section>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

export default Folder;