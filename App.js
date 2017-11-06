import React from "react";
import {Route} from "react-router-dom";

import "./App.css";
import Search from "./Search";
import ListOfBooks from "./ListOfBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({books: data});
    });
  }

  changeShelf = (book : any, shelf : string) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({books: data});
    });
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListOfBooks booksOnShelves={this.state.books}/>}/>
        <Route path="/search" render={() => <Search onChangeShelf={this.changeShelf} booksOnShelves={this.state.books}/>}/>
      </div>
    );
  }
}
export default BooksApp;
