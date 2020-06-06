import React from 'react';

function Nav() {
    return (
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
            <Route path='/note' render={(router) =>
                <GoBack
                    folders={this.state.folders}
                    note={[this.state.notes.find(note => note.id === router.match.params.noteId)]}
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
    )
}

export default Nav;