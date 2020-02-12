import React, { Component } from 'react';
import SanitizedHTML from 'react-sanitized-html';
import BooksGraph from './components/books-graph';
import Bibles from './components/bibles';
import Books from './components/books';
import Chapters from './components/chapters';
import MarkAsRead from './components/mark-as-read';
import scriptureFetch from './utils/scriptureApiCall';

class App extends Component {
    constructor(props) {
        super(props);

        const localData = JSON.parse(localStorage.getItem('scriptum-acies')) || {};
        const { currentBibleId, currentBookId, progress } = localData;

        this.state = {
            currentBibleId: currentBibleId || null,
            bibles: [],
            books: [],
            currentBookId: currentBookId || null,
            chapters: [],
            currentChapter: null,
            progress: progress || {}
        }

        this.handleBibleChange = this.handleBibleChange.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
        this.handleChapterChange = this.handleChapterChange.bind(this);
        this.handleMarkAsRead = this.handleMarkAsRead.bind(this);
        this.updateLocalData = this.updateLocalData.bind(this);
        this.setCurrentChapter = this.setCurrentChapter.bind(this);
        this.clearCurrentChapter = this.clearCurrentChapter.bind(this);
    }

    componentDidMount() {
        const { currentBibleId, currentBookId } = this.state;
        if (!currentBibleId === null) {
            this.handleBibleChange({
                target: {
                    value: currentBibleId
                }
            });
        }

        if (!currentBookId === null) {
            this.handleBookChange({
                target: {
                    value: currentBookId
                }
            });
        }
    }

    updateLocalData() {
        const localData = JSON.parse(localStorage.getItem('scriptum-acies'));
        const { currentBibleId, currentBookId, progress } = this.state;
        const newData = Object.assign({}, localData, { currentBibleId, currentBookId, progress });

        localStorage.setItem('scriptum-acies', JSON.stringify(newData));
    }

    handleBibleChange(e) {
        const bibleId = e.target.value;
        scriptureFetch(`bibles/${bibleId}/books`)
            .then(response => {
                this.setState({
                    currentBibleId: bibleId,
                    books: response.data
                }, this.updateLocalData)
            });
    }

    handleBookChange(e) {
        const bookId = e.target.value;
        scriptureFetch(`bibles/${this.state.currentBibleId}/books/${bookId}/chapters`)
            .then(response => {
                this.setState({
                    currentBookId: bookId,
                    chapters: response.data
                }, this.updateLocalData)
            });
    }

    handleChapterChange(e) {
        const chapterId = e.target.value;
        scriptureFetch(`bibles/${this.state.currentBibleId}/chapters/${chapterId}`)
            .then(response => {
                this.setCurrentChapter(response.data);
            });
    }

    handleMarkAsRead(e) {
        const { progress, currentChapter } = this.state;
        const { bookId, number } = currentChapter;

        if (!progress[bookId])
            progress[bookId] = {};
        if (!progress[bookId][number])
            progress[bookId][number] = 0;

        progress[bookId][number] += 1;

        this.setState({
            progress,
            chapterMarked: true
        }, this.updateLocalData);
    }

    setCurrentChapter(currentChapter) {
        this.setState({
            currentChapter
        }, this.updateLocalData);
    }

    clearCurrentChapter() {
        this.setState({
            currentChapter: null,
            chapterMarked: false
        }, this.updateLocalData);
    }

    render() {
        const {
            setCurrentChapter,
            handleBibleChange,
            handleBookChange,
            handleChapterChange,
            handleMarkAsRead,
            state
        } = this;
        const {
            books,
            progress,
            currentBibleId,
            chapters,
            currentChapter,
            chapterMarked
        } = state;

        if (currentChapter !== null) {
            return (
                <div className="m4">
                    <button
                        className="pv3 ph4 ba blanc b-blanc bg-noir"
                        onClick={this.clearCurrentChapter}
                    >
                        Back to Books
                    </button>
                    <div className="mv4">
                        <SanitizedHTML
                            allowedTags={['p', 'span']}
                            allowedAttributes={{ 'p': ['class'], 'span': ['data-number', 'class']}}
                            html={currentChapter.content}
                        />
                    </div>
                    <MarkAsRead
                        handleMarkAsRead={handleMarkAsRead}
                        marked={chapterMarked}
                    />
                </div>
            )
        }

        return (
            <div className="m4">
                <BooksGraph books={books} progress={progress} />
                <Bibles handleBibleChange={handleBibleChange} />
                <Books
                    books={books}
                    handleBookChange={handleBookChange}
                    currentBibleId={currentBibleId}
                    progress={progress}
                    setCurrentChapter={setCurrentChapter}
                />
                <Chapters chapters={chapters} handleChapterChange={handleChapterChange} />
            </div>
        );
    }
}

export default App;
