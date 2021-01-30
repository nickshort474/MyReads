import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component{
 
 static propTypes = {
    image: PropTypes.string.isRequired,
    id:PropTypes.string.isRequired
  }
  
 constructor(props){
   super(props);
   
   this.state = {
     value:this.props.shelf ? this.props.shelf : 'none'
   }
 }
  
 handleChange(e){
   this.setState({
     value:e.target.value
   })
   
   this.props.updateUI(this.props.book , e.target.value);
   
 }

 render(){
    
   let authors = [];
   if(this.props.author !== undefined){
     authors = this.props.author.map((author)=>{
       return <div className="book-authors" key={author}>{author}<br /></div>
    })
   }
  
  return(
    <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${this.props.image})` }}></div>
          <div className="book-shelf-changer">
            
			<select value={this.state.value} onChange={this.handleChange.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>


          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        {authors}
        
      </div>
  )
   
 }
  
}