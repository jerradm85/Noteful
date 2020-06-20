import React from 'react';
import './App.css'
import { Route, Link } from 'react-router-dom'

import MainNote from './Components/MainNote'
import ListNote from './Components/ListNote'
import Folder from './Components/Folder'
import GoBack from './Components/GoBack'
import AddNote from './Components/AddNote'
import AddFolder from './Components/AddFolder'

import NotefulContext from './NotefulContext'
import FormError from './FormError'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  setFolders = (folder) => {
    this.setState({
      folders: this.state.folders.concat(folder)
    })
  }

  setNotes = (note) => {
    this.setState({
      notes: this.state.notes.concat(note)
    })
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  componentDidMount() {
    fetch(`http://localhost:9090/notes`)
      .then(res => res.json())
      .then(notes => {
        this.setState({
          notes
        })
      })

    fetch(`http://localhost:9090/folders`)
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders
        })
      })
  }

  render() {
    return (
      <NotefulContext.Provider value={
        {
          notes: this.state.notes,
          folders: this.state.folders,
          setNotes: this.setNotes,
          deleteNote: this.deleteNote,
          setFolders: this.setFolders
        }
      }>
        <body className="grid-container">
          <header>
            <Link className="link" to='/'><h1>Noteful</h1></Link>
          </header>
          <nav>
            <Route exact path='/' component={Folder} />
            <Route path='/folder/:folderId' component={Folder} />
            <Route path='/note/:noteId' component={GoBack} />
            <FormError>
              <Route exact path='/' component={AddFolder} />
            </FormError>
          </nav>
          <main>
            <Route exact path='/' component={MainNote} />
            <Route path="/folder/:folderId" component={MainNote} />
            <FormError>
              <Route className="addNote" path='/addnote' component={AddNote} />
            </FormError>
            <Route path="/note/:noteId" component={ListNote} />
          </main>
        </body>
      </NotefulContext.Provider>
    );
  }
}

export default App;
