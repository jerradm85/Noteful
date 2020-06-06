import React from 'react';
import './GoBack.css'

function GoBack(props) {
    const folder = props.folders.find((f) => {
        console.log(f.id, props.note.folderId, props.note)
        return f.id === props.note.folderId
    }) || {}

    return (
        <div className="goBack">
            {folder.name}
            <button className="backButton">Go Back</button>
        </div>
    )
}

export default GoBack;