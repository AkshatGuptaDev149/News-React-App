import React from 'react'

const NewsItem =(props)=>{
  
  

    let {title,description,imgUrl,newsUrl,author,date,source}=props
    return (
      <div className='my-3'>
        <div className="card" >
            <img src={imgUrl} className="card-img-top" alt="#"/>
            <div className="card-body">
              <span className=" position-absolute top-0 start-50 translate-middle badge badge-pill badge-success bg-danger " style={{fontSize:'20px'}}>{source}</span>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toString()} </small></p>
              
              <a href={newsUrl} target='_' className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
      </div>
    )
  }

export default NewsItem
