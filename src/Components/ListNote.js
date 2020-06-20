import React from 'react'
import './ListNote.css'
import propTypes from 'prop-types'
import NotefulContext from '../NotefulContext'

class ListNote extends React.Component {
    static contextType = NotefulContext;

    findNote(notes) {
        const foundNote = notes.find((note) => {
            if (this.props.match.params.noteId) {
                return (note.id === this.props.match.params.noteId);
            }
        }) || {}
        return (
            <li>
                <h2>{foundNote.name}</h2>
                <h3>{foundNote.modified}</h3>
                <p className="p">{foundNote.content}</p>
            </li>
        )
    }

    removeNote = () => {
        const note = this.props.match.params.noteId;

        fetch(`http://localhost:9090/notes/${note}`,{
            method:"DELETE"
        })
        .then(() => {
            this.context.deleteNote(note);
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {(context) => {
                    return (
                        <div className="listNote">
                            <ul>
                                {this.findNote(context.notes)}
                            </ul>
                            <button className="noteDel" onClick={this.removeNote}>Delete</button>
                        </div>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }

}

ListNote.propTypes = {
    history: propTypes.any,
    match: propTypes.any,
    params: propTypes.any,
}

export default ListNote;