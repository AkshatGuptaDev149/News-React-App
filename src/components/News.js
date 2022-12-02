import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'


const News=(props)=>{
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)
  const [LoadingBarProgress,setLoadingBarProgress]=useState(0)
  const [totalResults,setTotalResults]=useState(0)
  
  const Capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1)
  }

    // Changing titel as NewsFever category and capitalizing the first character of category
    // document.title=`NewsFever -${this.Capitalize(props.category)}`

  const Updatefunc=async (pages)=>{
    setPage(pages)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.ApiKey}&page=${pages}&pageSize=${props.pageSize}`;
    setLoading(true)
    setLoadingBarProgress(LoadingBarProgress+30)
    let NewsPromise=await fetch(url);
    let Newsdata=await NewsPromise.json()
    setArticles(Newsdata.articles)
    
    setTotalResults(Math.ceil(Newsdata.totalResults/props.pageSize))
    setLoading(false)
    setLoadingBarProgress(100)
  }
  useEffect(()=>{
    Updatefunc(1)
  },[])

  const handleNext=async ()=>{
    Updatefunc(page+1)
  }
  
  const handlePrev=async ()=>{
    Updatefunc(page-1)
    
  }
    
    return (
      <>
      <LoadingBar
      color='#0f67f5'
      height={4}
      progress={LoadingBarProgress}
      onLoaderFinished={() => setLoadingBarProgress(0)}
      />
      <div className='container my-2'>
        <h1 className='my-4'>Top {Capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>} {/*this means that if loading is true show spinner otherwise not*/}
        <div className='row '>
          {!loading && articles.map((element)=>{
            return (
              <div className='col-md-4' key={element.url}>
              <NewsItem  title={element.title?element.title:''} newsUrl={element.url} author={element.author?element.author:'unknown'} source={element.source.name} date={element.publishedAt} description={element.description?element.description.slice(0,81)+'....':'...'} imgUrl={element.urlToImage?element.urlToImage:'https://static.toiimg.com/thumb/imgsize-37494,msid-95837046,width-400,resizemode-4/95837046.jpg'} />
              </div>
            )})}
        </div>
        <div className='container my-2 d-flex justify-content-between' style={{width:'30vw'}}>
          <button disabled={page<=1} type="button" className="btn btn-outline-info " onClick={handlePrev}>&#8678; Previous</button>
          <button disabled={page>=totalResults} type="button" className="btn btn-outline-info " onClick={handleNext}>Next &#8680;</button>
        </div>  
      </div>
      </>
    )
  

            }
News.defaultProps={
  country:'in',
  pageSize:5,
  category:'general'
}
News.propTypes={
  country:PropTypes.string.isRequired,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News