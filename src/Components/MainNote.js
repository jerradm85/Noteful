import React from 'react';
import moment from 'moment';
import './MainNote.css';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class MainNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        notes: [],
    }

    removeNote = (note) => {
        const deathNote = note;
        fetch(`http://localhost:9090/notes/${deathNote}`,{
            method:"DELETE"
        })
        .then(() => {
            this.props.history.push("/")
            this.context.deleteNote(deathNote);
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                { (context) => (
                    <ul>
                    <Link to='/addnote' className="addNote">Create new note</Link>
                    {context.notes.filter(note => {
                        if(this.props.match.params.folderId) {
                            return (note.folderId === this.props.match.params.folderId)
                        }else {return(true)}
                    }).map((note, idx) => (
                        <div className="Note" key={idx}>
                            <li>
                                <Link to={`/note/${note.id}`}>{`${note.name}`}</Link>
                                {' - '}
                                {`Last Modified: ${moment(note.modified).format('MMMM Do YYYY, h:mm:ss a')}`}
                            </li>
                            <button className="delbutton" onClick={() => this.removeNote(note.id)}>Delete</button>
                        </div>
                    ))}
                </ul>
                 ) }
            </NotefulContext.Consumer>
        )
    }
}

MainNote.propTypes = {
    history: propTypes.any,
    match: propTypes.any,
    params: propTypes.any,
}

export default MainNote;