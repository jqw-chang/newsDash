import React, { Component } from 'react'; 

function Searchbar({getSearchTerm}) {
  let msg = "You about to learn today!"
  let sbStyle = { 
    width: '400px', 
    height: '20px' 
  };

  return (
    <input type="text" placeholder={msg} onChange={getSearchTerm} style={sbStyle}></input>
  )
}


export default Searchbar;