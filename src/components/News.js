import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'


export default class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string.isRequired,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  Capitalize(string){
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
  articles=[]
  constructor(props){
    super(props)
    this.state={
      articles:this.articles,
      loading:false,
      page:1,
      LoadingBarProgress:0
    }
    // Changing titel as NewsFever category and capitalizing the first character of category
    document.title=`NewsFever -${this.Capitalize(this.props.category)}`
  }

  async Updatefunc(pages){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${pages}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true,LoadingBarProgress:this.state.LoadingBarProgress+30})
    let NewsPromise=await fetch(url);
   
    let Newsdata=await NewsPromise.json()
    this.setState({
      page:pages,
      articles:Newsdata.articles,
      totalResults:Math.ceil(Newsdata.totalResults/this.props.pageSize),
      loading:false,
      LoadingBarProgress:100
    })
  }

  async componentDidMount(){
    this.Updatefunc(1)
  }
  handleNext=async ()=>{
    this.Updatefunc(this.state.page+1)
  }
  
  handlePrev=async ()=>{
    this.Updatefunc(this.state.page-1)
    
  }
  render() {
    
    return (
      <>
      <LoadingBar
      color='#0f67f5'
      height={4}
      progress={this.state.LoadingBarProgress}
      onLoaderFinished={() => this.setState({LoadingBarProgress:0})}
      />
      <div className='container my-2'>
        <h1 className='my-4'>Top {this.Capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>} {/*this means that if loading is true show spinner otherwise not*/}
        <div className='row '>
          {!this.state.loading && this.state.articles.map((element)=>{
            return (
              <div className='col-md-4' key={element.url}>
              <NewsItem  title={element.title?element.title:''} newsUrl={element.url} author={element.author?element.author:'unknown'} source={element.source.name} date={element.publishedAt} description={element.description?element.description.slice(0,81)+'....':'...'} imgUrl={element.urlToImage?element.urlToImage:'https://static.toiimg.com/thumb/imgsize-37494,msid-95837046,width-400,resizemode-4/95837046.jpg'} />
              </div>
            )})}
        </div>
        <div className='container my-2 d-flex justify-content-between' style={{width:'30vw'}}>
          <button disabled={this.state.page<=1} type="button" className="btn btn-outline-info " onClick={this.handlePrev}>&#8678; Previous</button>
          <button disabled={this.state.page>=this.state.totalResults} type="button" className="btn btn-outline-info " onClick={this.handleNext}>Next &#8680;</button>
        </div>  
      </div>
      </>
    )
  }
}

