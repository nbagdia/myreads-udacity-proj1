import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class ListOfBooks extends React.Component {
  state = {};

  handleChangeShelf = (bookId: string, e: any) => {
    let temp = this.props.booksOnShelves;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;

    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    const bookSh = this.props.booksOnShelves;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            key="currently"
            books={bookSh.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Currently Reading"
          />
          <Shelf
            key="wantToRead"
            books={bookSh.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Want to Read"
          />
          <Shelf
            key="read"
            books={bookSh.filter(book => book.shelf === "read")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
ListOfBooks.PropTypes = {
  booksOnShelves : PropTypes.array.isRequired
};

export default ListOfBooks;
