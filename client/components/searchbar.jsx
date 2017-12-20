import React, { Component } from 'react'; 


class Searchbar extends Component {
  render() {
    let msg = "What's on your mind today?"
    let sbStyle = { 
      width: '400px', 
      height: '20px' 
    };

    return (
      <input key={0} type="text" placeholder={msg} name="topic" style={sbStyle}></input>
    )
  }
}


export default Searchbar;