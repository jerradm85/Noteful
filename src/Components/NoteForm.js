import React from 'react';
import './NoteForm.css'
import NotefulContext from '../NotefulContext'

class AddNote extends React.Component {
    static contextType = NotefulContext

    handleSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value
        const folderId = e.target.folderId.value
        const content = e.target.content.value
        const note = {name, folderId, content}
        this.context.setNotes(this.context.notes.concat(note))
        console.log(this.context.notes)

        fetch(`http://localhost:9090/notes`,{
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(notes => {
            this.setState({
              notes
            })
        })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {context => {
                    return (
                        <form onSubmit={this.handleSubmit}>
                            <label>Name</label>
                            <input className="name" name="name"></input>
                            <label>Folder</label>
                            <select name="folderId">
                                {context.folders.map((folder) => (
                                    <option value={folder.id}>{folder.name}</option>
                                ))}
                            </select>
                            <label>Text</label>
                            <textarea name="content"></textarea>
                            <button>Submit</button>
                        </form>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

export default AddNote;