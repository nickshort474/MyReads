import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import * as BooksAPI from './BooksAPI';
import Book from './Book';

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
        return <li> <Book title={book.title} shelf={book.shelf} author={book.authors} image={book.imageLinks['smallThumbnail'] } id={book.id} book={book} key={book.id} updateUI={this.updateUI} /></li>
 	}else{
      return <p></p>                     
    }
   })
  
  return(
  	<div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}/>

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