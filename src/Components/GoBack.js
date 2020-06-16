import React from 'react';
import './GoBack.css'
import { NavLink } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class GoBack extends React.Component {

    findFolder(context) {
        const note = context.notes.find(note => note.id === this.props.match.params.noteId)
        const folder = context.folders.find(fldr => {
            if (fldr.id === note.folderId) {
                return true
            }
        })
        console.log("Folders", folder)
        return folder
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {context => {
                    const folder = this.findFolder(context)
                    return (
                        <div className="goBack">
                            <NavLink
                                to={`/folder/${folder.id}`}
                                className="backButton">
                                {`${folder.name} folder`}
                            </NavLink>
                        </div>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

export default GoBack;