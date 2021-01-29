import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import LibraryPage from './LibraryPage';


class BooksApp extends React.Component {
 
  state = {
   	booksArray:[],
    books:[]
  }

  componentDidMount(){
    
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
	this.addBook = this.addBook.bind(this);
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
        console.log('empty query')
     	this.setState({books:[]}) 
    }else{
    	console.log('saerching');
    	BooksAPI.search(query,5).then(all => {
  	  		if(all === undefined || all['error'] === 'empty query' ){
        		this.setState({
          			books:[]
        		})
      		}else{
              this.setState({
                  books:all
              })
      		}
        })
     }
    
      
    this.setState({
     	query:query.trim()
    })
  }

	addBook(book,shelf){
      console.log('adding book');
	  BooksAPI.update({id:book.id}, shelf).then((response)=>{
   	
      book.shelf = shelf	
      this.setState(prevState =>({
        	booksArray:prevState.booksArray.concat([book]) 
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
    	  <SearchPage search={this.search} data={this.state.books} addBook={this.addBook}/>
    	)} />
    	
      </div>
    )
  }
}

export default withRouter(BooksApp);