import React from 'react'
import './ListNote.css'

function ListNote(props) {
    return (
        <div className="listNote">
            <ul>
                {props.notes.map((note, idx) => (
                    <li key={idx}>
                        <h2>{note.name}</h2>
                        <h3>{note.modified}</h3>
                        <p className="p">{note.content}</p>
                    </li>
                ))}
            </ul>
            <button className="noteDel">Delete</button>
        </div>
    )
}

export default ListNote;