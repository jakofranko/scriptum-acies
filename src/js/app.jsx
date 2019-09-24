import React, { Component } from 'react';
import SanitizedHTML from 'react-sanitized-html';
import Bibles from './components/bibles';
import Books from './components/books';
import Chapters from './components/chapters';
import scriptureFetch from './utils/scriptureApiCall';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentBibleId: null,
            bibles: [],
            books: [],
            currentBookId: null,
            chapters: [],
            currentChapter: null
        }

        this.handleBibleChange = this.handleBibleChange.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
        this.handleChapterChange = this.handleChapterChange.bind(this);
    }

    handleBibleChange(e) {
        const bibleId = e.target.value;
        scriptureFetch(`bibles/${bibleId}/books`)
            .then(response => {
                this.setState({
                    currentBibleId: bibleId,
                    books: response.data
                })
            });
    }

    handleBookChange(e) {
        const bookId = e.target.value;
        scriptureFetch(`bibles/${this.state.currentBibleId}/books/${bookId}/chapters`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    currentBookId: bookId,
                    chapters: response.data
                })
            });
    }

    handleChapterChange(e) {
        const chapterId = e.target.value;
        scriptureFetch(`bibles/${this.state.currentBibleId}/chapters/${chapterId}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    currentChapter: response.data
                });
            });
    }

    render() {
        return (
            <>
                <Bibles handleBibleChange={this.handleBibleChange} />
                <Books books={this.state.books} handleBookChange={this.handleBookChange}/>
                <Chapters chapters={this.state.chapters} handleChapterChange={this.handleChapterChange} />
                {
                    this.state.currentChapter !== null
                    && <SanitizedHTML
                        allowedTags={['p', 'span']}
                        allowedAttributes={{ 'p': ['class'], 'span': ['data-number', 'class']}}
                        html={this.state.currentChapter.content}
                    />
                }
            </>
        );
    }
}

export default App;
