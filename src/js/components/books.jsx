import React from 'react';
import scriptureFetch from '../utils/scriptureApiCall';

class Books extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.books.length !== 0
                    && (
                        <div id="books">
                            <label htmlFor="books-list">Books</label>
                            <br />
                            <select name="books-list" id="books-list" onChange={this.props.handleBookChange}>
                                {this.props.books.map(book => <option key={book.id} value={book.id}>{book.name}</option>)}
                            </select>
                        </div>
                    )
                }
            </>
        );
    }
}

export default Books;
