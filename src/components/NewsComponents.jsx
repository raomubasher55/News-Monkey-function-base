import React from 'react'
import { useEffect, useState } from "react";
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const NewsComponents = (props) => {
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [catagory, setCatagory] = useState('general')
  const [author, setAuthor] = useState("")
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `  ${capitalize(props.category)} - NewsMonkey`



  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const newsUpdate = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(40);
    let data = await fetch(url);
    let res = await data.json();
    setArticle(res.articles)
    props.setProgress(70);
    setTotalResults(res.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    newsUpdate(page);
  }, [])



  // const handleNextBtn = async () => {
  //   newsUpdate(setPage(page + 1))
  // }
  // const handlePreBtn = async () => {
  //   newsUpdate(setPage(page - 1))
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true);
    let data = await fetch(url);
    let res = await data.json();
    setArticle(article.concat(res.articles));
    setTotalResults(res.totalResults);
  };

  

  return (
    <>
      <h1 className='text-center my-3' style={{paddingTop : "67px"}}>{capitalize(props.category)} Headlines</h1>
      {/* {loading && <Loading />} */}
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {article.map((e) => (
              e.urlToImage != null ?
                (<div key={e.url} className="col-md-4">
                  <NewsItem title={e.title ? e.title.slice(0, 45) : ""}
                    description={e.description ? e.description.slice(0, 88) : "" || "No description here"}
                    imageUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>) : null
            ))}
          </div>


          {/* yeh next or previous buttons hain old app waly */}
          {/* <div className="container d-flex justify-content-between">
              <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePreBtn}>&larr; Previous</button>
              <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={handleNextBtn}>Next &rarr;</button>
            </div> */}


        </div>
      </InfiniteScroll>
    </>
  );


}
NewsComponents.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'

}

NewsComponents.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default NewsComponents