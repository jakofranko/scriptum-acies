import React from 'react';
import scriptureFetch from '../utils/scriptureApiCall';

class Chapters extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.chapters.length !== 0
                    && (
                        <div id="chapters">
                            <label htmlFor="chapters-list">Chapters</label>
                            <br />
                            <select name="chapters-list" id="chapters-list" onChange={this.props.handleChapterChange}>
                                {this.props.chapters.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.number}</option>)}
                            </select>
                        </div>
                    )
                }
            </>
        );
    }
}

export default Chapters;
