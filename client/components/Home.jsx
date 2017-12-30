import React, { Component } from 'react'; 
import axios from 'axios';

import Searchbar from './searchbar';
import Results from './results';
import Checkbox from './checkbox';

const sources = { // source name : source id
  CNN: 'cnn', 
  NYTimes: 'the-new-york-times', 
  BI: 'business-insider', 
  Reddit: 'reddit-r-all', 
  TechCrunch: 'techcrunch' 
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showing: false,
      topic: '',
      sources: [], 
      results: [],
      resultsBtn: '', // 'save' or 'delete'
      showResultsRes: false,
      resultsRes : '' // 'saved!' or 'deleted!'
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.handleArticleToggle = this.handleArticleToggle.bind(this);
    this.handleArticleSave = this.handleArticleSave.bind(this);
    this.openNewTab = this.openNewTab.bind(this); 
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
    this.selectedArticles = new Set();
  }


  /***** Options functionality ******/

  toggleCheckbox(label, isChecked) {
    isChecked = !isChecked
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else this.selectedCheckboxes.add(label);

    console.log(label, isChecked);

    return isChecked;
  }

  createCheckbox(label) {
    return <Checkbox 
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
      isChecked={false}
    />
  }

  createCheckboxes() {
    return Object.keys(sources).map(this.createCheckbox);
  }
 
  /***** Searchbar functionality ******/

  getSearchTerm(event) {
    this.setState({
      topic: event.target.value
    })
  }

  handleOnSubmit(event) {
    event.preventDefault();
    let checkedSources = '';
    let count = 0;

    this.selectedCheckboxes.forEach(source => {
      count++;
      checkedSources += (sources[source] + ',');
    });

    checkedSources = checkedSources.slice(0, -1);
    let url = `https://newsapi.org/v2/everything?q=${this.state.topic}&sources=${checkedSources}&sortBy=popularity&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1`


    if (this.state.topic === '' && count === 0) {
      let allCheckedSources = Object.values(sources).join(',');
      url = `https://newsapi.org/v2/top-headlines?sources=${allCheckedSources}&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1`
    }

    if (this.state.topic === '' && count !== 0) {
      console.log(checkedSources); 
      url = `https://newsapi.org/v2/top-headlines?sources=${checkedSources}&apiKey=6bfbd78dd5c64b3c9f6642e69d60f7e1`
    }

    axios(url).then(res => {
      this.setState({ 
        results: res.data.articles,
        showing: true,
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  openNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
  }

  /***** Save Articles functionality ******/

  handleArticleToggle(article) {
    if (this.selectedArticles.has(article)) {
      this.selectedArticles.delete(article);
    } else this.selectedArticles.add(article);
  }

  handleArticleSave() {
    let articlesToSave = [];
    this.selectedArticles.forEach(article => {
      articlesToSave.push(article);
    })

    let options = {
      method: 'POST',
      body: JSON.stringify(articlesToSave),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    console.log(articlesToSave.length, '-----', options.body)

    fetch('/saveArticles', options)
    .then(res => res.json())
    .then(res => {
      this.setState({
        showResultsRes: true,
        resultsRes: 'Saved!'
      })

      setTimeout(() => {
        this.setState({
          showResultsRes: false
        })
      }, 10000)
    })
    .catch(error => console.log(error))
  }



  render() {

    let btnStyle = {
      height: '25px',
      border: '.5px solid white',
    }

    let mediaStyle = {
      width: '700px'
    }

    return [
      <div key={0} className="h3" style={mediaStyle}>
        <center><p className="h1">Welcome To Your News Dash</p></center>
        Choose Media: 
        <button id="ReadingMode" style={{float: 'right'}}>Reading Mode On</button>
        <center>
          <div className="checkBoxes">{this.createCheckboxes()}</div>
          <Searchbar getSearchTerm={this.getSearchTerm}/>
        <button id="submit" onClick={this.handleOnSubmit} style={btnStyle}> Submit </button>
        </center>
      </div>,
      <Results key={1} openNewTab={this.openNewTab} articles={this.state.results} showing={this.state.showing} toggleArticle={this.handleArticleToggle} saveArticle={this.handleArticleSave} showResultsRes={this.state.showResultsRes} resultsBtn={this.state.resultsBtn} resultsRes={this.state.resultsRes}/>
    ];
  }
}

export default Home;