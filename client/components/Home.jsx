import React, { Component } from 'react'; 
import axios from 'axios';
// import components
import Searchbar from './searchbar';
import Results from './results';
import Options from './options';

class Home extends Component {
  constructor() {
    super()

    this.state = {
      results : []
    }

    // this.props.results = [];

    this.getAPI = this.getAPI.bind(this)
  }
  
  getAPI() {
    // `https://newsapi.org/v2/everything?q=${bitcoin}&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1`
    // `https://newsapi.org/v2/everything?q=apple&from=${2017-12-19}&to=${2017-12-19}&sortBy={popularity}&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1
    //'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1'
    let storyType = 'everything'; // or 'top-headlines'
    let topic = 'bitcoin';

    let url = `https://newsapi.org/v2/${storyType}?q=${topic}&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1`

    axios(url).then((res)=> {
      // console.log(res.data);
      
      this.setState({
        results: res.data.articles
      })
      
      if (res.data.status !== "ok") console.log('uh oh');
    }).catch((e) => {
      console.log(e);
    });
  }


  

  render() {
    let btnStyle = {
      height: '25px',
      border: '.5px solid white',
    }

    return (
      <div className="h3">Choose Media:
      <Options />
      <Searchbar />
      <button id="submit" onClick={this.getAPI} style={btnStyle} > Submit </button>
      <Results articles={this.state.results} />
      </div>
    );
  }
}

export default Home;