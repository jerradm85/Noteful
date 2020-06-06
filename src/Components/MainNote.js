import React from 'react';
import './MainNote.css';
import { Link } from 'react-router-dom'

class MainNote extends React.Component {
    static defaultProps = {
        notes: [],
    }

    render() {
        return (
            <ul>
                {this.props.notes.map((note, idx) => (
                    <div className="Note" key={idx}>
                        <li>
                            <Link to={`/note/${note.id}`}>{`${note.name}`}</Link>
                            {' - '}
                            {`Last Modified: ${note.modified}`}
                        </li>
                        <button className="delbutton">Delete</button>
                    </div>
                ))}
            </ul>
        )
    }
}

export default MainNote;