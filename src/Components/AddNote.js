import React from 'react';
import './AddNote.css'
import propTypes from 'prop-types'
import NotefulContext from '../NotefulContext'

class AddNote extends React.Component {
    state = {
        message: ""
    }
    static contextType = NotefulContext

    validateName(name) {
        if (!name || name.trim() === "") {
            this.setState({
                message: <p className="noteError">Note must have a name.</p>
            })
            return null;
        } 
        return name;
    }

    handleSubmit = e => {
        e.preventDefault()
        const name = this.validateName(e.target.name.value);
        const folderId = e.target.folderId.value
        const content = e.target.content.value;
        const note = { name, folderId, content }

        if(!name) {
            this.setState({
                message: ""
            })
            return
        }

        fetch(`http://localhost:9090/notes`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(note)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong.")
                } return res.json();
            })
            .then(notes => {
                console.log(notes)
                this.context.setNotes(notes)
                this.props.history.push("/")
            })
    }

    render() {
        return (
            <NotefulContext.Consumer>
                {context => {
                    return (
                        <form className="form" onSubmit={this.handleSubmit}>
                            <fieldset className="noteField">
                                <legend>Create a new note</legend>
                                <div className="name">
                                    <label>Name: </label>
                                    <input name="name" placeholder="Cats"></input>
                                    {this.state.message}
                                </div>
                                <div>
                                    <label>Folder: </label>
                                    <select className="sort" name="folderId">
                                        {context.folders.map((folder, idx) => (
                                            <option key={idx} value={folder.id}>{folder.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <label>Text: </label>
                                <textarea className="content" name="content" placeholder="lorem ipsum"></textarea>
                                <button>Submit</button>
                            </fieldset>
                        </form>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}

AddNote.propTypes = {
    history: propTypes.any.isRequired
}

export default AddNote;