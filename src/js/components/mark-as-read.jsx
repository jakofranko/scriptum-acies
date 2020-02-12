import React from 'react';

function MarkAsRead(props) {
    const { handleMarkAsRead, marked } = props;

    if (marked)
        return <span>✔</span>

    return (
        <button
            type="button"
            className="mark-as-read pv3 ph4 ba blanc b-blanc bg-noir"
            onClick={handleMarkAsRead}
        >
            Mark As Read
        </button>
    );
}

export default MarkAsRead;
