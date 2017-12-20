import React, { Component } from 'react';

function Results({articles}) {
  console.log(articles)

  let boxStyle = {
    
  }

  let btnSty = {
    width: '20px',
    height: '20px'
  }

  return [
    <p key={0} className="h3">List of Results</p>,
    <div>
    <ul>
      {articles.map((article, i) => {
        return [
        <div className="box">
          <li key={i}><button style={btnSty} ></button> {article.title}</li>
        </div>
        ]
      })}
    </ul>
    </div>
  ]
}

export default Results;