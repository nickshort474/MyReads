import React, {Component} from 'react';
import Book from './Book';
//import PropTypes from 'prop-types';



export default class BookShelf extends Component{
  
  static propTypes = {
    //title: PropTypes.string.isRequired,
  }
  
  update(book,shelf){
    this.props.update(book,shelf);
  }
  
 render(){
   
   const data = this.props.data;
     
   let display = data.map((book)=>{
      return <Book title={book.title} shelf={book.shelf} author={book.authors} book={book} key={book.id} image={book.imageLinks['smallThumbnail']} id={book.id} updateUI={this.update.bind(this)}/>
   })
   
  return(
  	 <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
    	<ol className="books-grid">	
          {display}
		</ol>
    	</div>
    </div>
  )
 }
}