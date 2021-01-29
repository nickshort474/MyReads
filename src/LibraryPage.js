import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

export default class LibraryPage extends Component{
  
  update(book,shelf){
    this.props.update(book,shelf); 
  }
  
 render(){
  const {data} = this.props;
  
  return(
    <div className="app">
    	<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads <span>{window.location.href}</span></h1>
            </div>


            <div className="list-books-content">
              <div>
                <div className="bookshelf">
					
					<BookShelf title={'Want to read'} data={data.filter( (book) => book.shelf === 'wantToRead')} update={this.update.bind(this)} />
                  	<BookShelf title={'Currently Reading'} data={data.filter( (book) => book.shelf === 'currentlyReading')}  update={this.update.bind(this)} />
					<BookShelf title={'Read'} data={data.filter( (book) => book.shelf === 'read')}  update={this.update.bind(this)} />	
				</div>
			</div>
        </div>
		 <div className="open-search">
            <Link to='/SearchPage'>Add a book</Link>
         </div>
	</div>
</div>
  )
 }
}