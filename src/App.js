import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import LibraryPage from './LibraryPage';


class BooksApp extends React.Component {
 
  state = {
   	booksArray:[],
    searchedBooks:[]
  }

  componentDidMount(){
    
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
	this.addBook = this.addBook.bind(this);
	this.clearSearch = this.clearSearch.bind(this);
    BooksAPI.getAll().then((books)=>{
      this.setState({
        booksArray:books
      })
    })
  }
  
  update(book,shelf){
    BooksAPI.update({id:book.id}, shelf).then((response)=>{
   	  if(shelf === 'none'){
        this.setState(prevState =>({
        	booksArray:prevState.booksArray.filter(currentBook => currentBook.id !== book.id) 
         }))
      }
      book.shelf = shelf	
      this.setState(prevState =>({
        booksArray:prevState.booksArray.filter(currentBook => currentBook.id !== book.id).concat([book]) 
      }))
    })
  }
 
  search(query){
    if(query === ''){
      this.setState({searchedBooks:[]}) 
    }else{
      BooksAPI.search(query,5).then(response => {
  	  	if(response === undefined || response['error'] === 'empty query' ){
          this.setState({
          	searchedBooks:[]
          })
      	}else{
          response.forEach(foundBook =>{
            let bookAlreadyOnShelf = this.state.booksArray.find(book => foundBook.id === book.id)
                
            if(bookAlreadyOnShelf){
              foundBook.shelf = bookAlreadyOnShelf.shelf
              response.concat(foundBook)	
            }
          })
          this.setState({
            searchedBooks:response
          })
        }
      })
    }
    this.setState({
      query:query.trim()
    })
  }

  clearSearch(){
    this.setState({searchedBooks:[]})
  }

  addBook(book,shelf){
    BooksAPI.update({id:book.id}, shelf).then((response)=>{
   	book.shelf = shelf	
    this.setState(prevState =>({
      booksArray:prevState.booksArray.concat([book]),
      searchedBooks:[]
    }))
    this.props.history.push('/'); 
    })
  }

  render() {
    
    return (
      <div className="app">       
       <Route exact path='/' render={()=>(
  		  <LibraryPage data={this.state.booksArray} update={this.update}/>
  		)} />
       <Route path='/SearchPage' render={()=>(
    	  <SearchPage search={this.search} data={this.state.searchedBooks} clearSearch={this.clearSearch} addBook={this.addBook}/>
    	)} />
    	
      </div>
    )
  }
}

export default withRouter(BooksApp);