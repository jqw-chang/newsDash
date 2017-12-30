import React, { Component } from 'react';

function Results({articles, showing, openNewTab, toggleArticle, saveArticle, showResultsRes, resultsBtn, resultsRes}) {
  let outStyle = {
    display: (showing ? 'flex' : 'none'),
    paddingTop: '40px',
  }

  let authorStyle = {
    color: 'thistle',
    float: 'right'
  }
  let dateStyle = {
    color: 'teal',
    float: 'right'
  }

  let divStyle = {
    width: '800px',
    height: '500px',
    overflow: 'scroll',
    paddingRight: '30px'
  }

  let boxStyle = {
    width: '600px',
    overflow: 'show',
    marginLeft: '50px',
    padding: '0 0 40px 0'
  }

  let btnStyle = {
    marginRight: '20px'
  }

  let resStyle = {
    display: (showResultsRes ? 'flex' : 'none'),
    color: 'white',
  }

  return [
    <div key={0} className="h3" id="results" style={outStyle}>
      <div key={1}>
        <p>Results:</p>
        <button type="submit" onClick={saveArticle}>save</button>
        <div style={resStyle}>{resultsRes}</div>
      </div>
      <div key={2} className="resultsList" style={divStyle}>
        <ul>
          {articles.map((article, i) => {
            let date;
            if (article.publishedAt) {
              // date = Date.now(article.publishedAt);
              date = article.publishedAt;
              console.log(typeof date)
            }

            return [
            <li key={i} className="result" style={{listStyle: 'none'}}>
              <input type="checkbox"
                style={btnStyle}
                onChange={() => toggleArticle(article)}>
              </input>
              <a href="#" onClick={() => openNewTab(article.url)}>{article.title}</a> 
              <br /><p style={authorStyle}>{article.author}</p>
              <p style={dateStyle}> {date}</p>
              <br /><div className="box" style={boxStyle}>{article.description}</div>
            </li>
            ]
          })}
        </ul>
      </div>
    </div>
  ]
}

export default Results;