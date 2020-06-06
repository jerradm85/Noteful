import React from 'react';
import { Route } from 'react-router-dom'
import MainNote from './MainNote'
import ListNote from './ListNote'

function Main(props) {
    return (
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
    )
}

export default Main;