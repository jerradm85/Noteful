import React from 'react';
import { Route, Link } from 'react-router-dom'
import MainNote from './Components/MainNote'
import ListNote from './Components/ListNote'
import Folder from './Components/Folder'
import GoBack from './Components/GoBack'
import AddNote from './Components/AddNote'
// import Main from './Components/Main'
import './App.css'

class App extends React.Component {
  state = {
    notes: this.props.store.notes,
    folders: this.props.store.folders,
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <Link className="link" to='/'><h1>Noteful</h1></Link>
        </header>
        <nav>
          <Route exact path='/' render={() =>
            <Folder 
            folders={this.state.folders}
            />}
          />
          <Route path='/folder' render={() =>
            <Folder folders={this.state.folders}
            />}
          />
          <Route path='/note/:noteId' render={(router) =>
            <GoBack
              folders={this.state.folders}
              note={this.state.notes.find(note => note.id === router.match.params.noteId)}
            />}
          />
          <Route exact path='/' render={(router) => 
          <AddNote 
            folders={this.state.folders}
            note={[this.state.notes.find(note => note.id === router.match.params.noteId)]}
          />}
          />
          <Route path='/folder' render={(router) => 
          <AddNote 
            folders={this.state.folders}
            note={[this.state.notes.find(note => note.id === router.match.params.noteId)]}
          />}
          />
        </nav>
        <main>
          <Route exact path='/' render={(router) =>
            <MainNote
              {...router}
              notes={this.state.notes}
            />}
          />
          <Route path="/folder/:folderId" render={(router) =>
            <MainNote
              {...router}
              notes={this.state.notes.filter(note => note.folderId === router.match.params.folderId)}
            />}
          />
          <Route path="/note/:noteId" render={(router) =>
            <ListNote
              {...router}
              notes={[this.state.notes.find(note => note.id === router.match.params.noteId)]}
            />}
          />
        </main>
      </div>
    );
  }
}

export default App;
