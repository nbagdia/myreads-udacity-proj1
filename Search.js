import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class Search extends React.Component {
  state = {
    query: "",
    books: []
  };

  updateQuery = (query: string) => {
    this.setState({
      query: query.trim()
    });
    if (query) {
      this.triggerBookSearch(query)
    } else {
      this.setState({
        books: []
      });
    }
  };

  showBooks(books: any) {
    let bookSh = this.props.booksOnShelves;
    let displayBooks = books.map(book => {
      book.shelf = "none";
      bookSh.forEach(booksOnShelves => {
        if (book.id === booksOnShelves.id) {
          book.shelf = booksOnShelves.shelf;
        }
      });
      return book;
    });
   this.setState({
      books: displayBooks
    });
  }

  triggerBookSearch(query: string) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
          this.showBooks(response);
        }
      },
      error => {
        console.log("error ocurred");
      }
    );
  }

handleChangeShelf = (book: any, shelf: string) => {
    let temp = this.state.books;
    const bookU = temp.filter(t => t.id === book.id)[0];
    bookU.shelf = shelf;
  
   this.setState({ books: temp});
   this.props.onChangeShelf(book, shelf);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title / author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 190,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.handleChangeShelf(book, e.target.value);
                      }}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
Search.PropTypes = {
  booksOnShelves : PropTypes.array.isRequired
};

export default Search;
