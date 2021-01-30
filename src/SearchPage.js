import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import Book from './Book';
import {DebounceInput} from 'react-debounce-input'

export default class SearchPage extends Component{
 
  constructor(){
    super()
    this.state= {
     	books:[],
        query:''
    }
    this.updateUI = this.updateUI.bind(this);
  }
  
  
  updateQuery(query){
   	this.setState({
      query:query
    })
    this.props.search(query); 
  }
  
  updateUI(book, shelf){
    this.props.addBook(book,shelf);
  }
  
 render(){
  let data = this.props.data ? this.props.data : []
  let display = data.map((book)=>{
    if(book.imageLinks !== undefined){
      return <li key={book.id}> <Book title={book.title} shelf={book.shelf} author={book.authors} image={book.imageLinks['smallThumbnail'] } id={book.id} book={book}  updateUI={this.updateUI} /></li>
    
 	}else{
      return <p></p>                     
    }
  })
  
  return(
  	<div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/' onClick={this.props.clearSearch} >Close</Link>
            <div className="search-books-input-wrapper">
              <div>
                <DebounceInput
                  minLength={2}
				  placeholder='Search by title or author'
                  debounceTimeout={300}
				  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)} />

              </div>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {display}
			</ol>
          </div>
        </div>  
  )
 }
}