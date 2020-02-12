import React from 'react';
import Book from './book';
import scriptureFetch from '../utils/scriptureApiCall';

class Books extends React.Component {
    render() {
        const {
            books,
            currentBibleId,
            progress,
            setCurrentChapter
        } = this.props;

        return (
            <>
                {
                    this.props.books.length !== 0
                    && (
                        <div id="books" className="r">
                            {books.map(book =>
                                <Book
                                    name={book.name}
                                    id={book.id}
                                    currentBibleId={currentBibleId}
                                    bookProgress={progress[book.id]}
                                    setCurrentChapter={setCurrentChapter}
                                />
                            )}
                        </div>
                    )
                }
            </>
        );
    }
}

export default Books;
