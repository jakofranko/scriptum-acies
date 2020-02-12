import React from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateYlGn } from 'd3-scale-chromatic';
import scriptureFetch from '../utils/scriptureApiCall';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chapters: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { currentBibleId, id } = this.props;
        scriptureFetch(`bibles/${currentBibleId}/books/${id}/chapters`)
            .then(response => {
                this.setState({
                    chapters: response.data
                });
            });
    }

    handleClick(e) {
        const { currentBibleId, setCurrentChapter } = this.props;
        const chapterId = e.target.dataset.chapterid;
        scriptureFetch(`bibles/${currentBibleId}/chapters/${chapterId}`)
            .then(response => setCurrentChapter(response.data));
    }

    render() {
        const { name, id, bookProgress } = this.props;
        const { chapters } = this.state;
        const minRead = bookProgress ? Math.min(...Object.values(bookProgress)) : 0;
        const maxRead = bookProgress ? Math.max(...Object.values(bookProgress)) : 0;
        console.log(minRead, maxRead)
        const scale = scaleLinear()
            .domain([minRead, maxRead])
            .range([0, 1]);

        // console.log(chapters, bookProgress)

        return (
            <div className="book c6 pr4">
                <h6>{name}</h6>
                {chapters.map(chapter => {
                    const chapterRead = bookProgress && bookProgress[chapter.number] ? bookProgress[chapter.number] : minRead;
                    const bg = interpolateYlGn(scale(chapterRead));

                    return <div
                        key={chapter.id}
                        data-chapterid={chapter.id}
                        className="chapter-graph-item"
                        style={{ backgroundColor: bg }}
                        onClick={this.handleClick}
                    />
                })}
            </div>
        );
    }
}

export default Book;
