import React from 'react';
import './MainNote.css';
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class MainNote extends React.Component {
    static contextType = NotefulContext;
    static defaultProps = {
        notes: [],
    }

    removeNote = (note) => {
        console.log(note)

        fetch(`http://localhost:9090/notes/${note}`,{
            method:"DELETE"
        })
        .then(() => {
            this.props.history.push("/")
            this.context.deleteNote(note);
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                { (context) => (
                    <ul>
                    <Link to='/addnote' className="addNote">Add Note</Link>
                    {context.notes.filter(note => {
                        if(this.props.match.params.folderId) {
                            return (note.folderId === this.props.match.params.folderId)
                        }else {return(true)}
                    }).map((note, idx) => (
                        <div className="Note" key={idx}>
                            <li>
                                <Link to={`/note/${note.id}`}>{`${note.name}`}</Link>
                                {' - '}
                                {`Last Modified: ${note.modified}`}
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

export default MainNote;