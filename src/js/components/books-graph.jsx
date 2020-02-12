import React from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateYlGn } from 'd3-scale-chromatic';

function getReadChaptersTotal(book) {
    if (!book) return 0;
    const readChapters = Object.keys(book);
    return readChapters.reduce((total, chapter) => total + book[chapter], 0)
}

class BooksGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { books, progress } = this.props;
        const chaptersRead = Object.keys(progress).map(book => getReadChaptersTotal(progress[book]));
        const minRead = Math.min(...chaptersRead);
        const maxRead = Math.max(...chaptersRead);
        const chScale = scaleLinear()
            .domain([minRead, maxRead])
            .range([0, 1]);
        const list = books.map(book => {
            const readChapters = getReadChaptersTotal(progress[book.id]);
            const interpdChapter = chScale(readChapters);
            const bg = interpolateYlGn(interpdChapter);
            const style = {
                backgroundColor: bg,
            };
            return (
                <div
                    key={book.id}
                    style={style}
                    title={book.id}
                    className="chapter-graph-item p b"
                />
            );
        });

        return (
            <div className="r">
                <div className="c6 pr4">
                    <h3>Old Testament</h3>
                    {list.slice(0, 38)}
                </div>
                <div className="c6">
                    <h3>New Testament</h3>
                    {list.slice(39)}
                </div>
            </div>
        );
    }
}

export default BooksGraph;
