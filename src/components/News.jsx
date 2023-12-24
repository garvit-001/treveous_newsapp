import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  document.title = `${props.category} - News Monkey`;

  // updating news
  const commonFunction = async (url) => {
    props.setProgess(10);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgess(50);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgess(100);
  };

  // const componentDidMount = async () => {
  // in function bassed component use UseEffect
  useEffect(() => {
    commonFunction(
      `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=d093053d72bc40248998159804e0e67d&page=1&pageSize=${props.pageSize}`
    );
  }, []);

  // console.log("cdm");

  // const handleNextClick = async () => {
  //   console.log("next");
  //   commonFunction(
  //     `https://newsapi.org/v2/top-headlines?category=${
  //       props.category
  //     }&country=${props.country}&apiKey=d093053d72bc40248998159804e0e67d&page=${
  //       page + 1
  //     }&pageSize=${props.pageSize}`
  //   );
  //   setPage(page + 1);
  // };

  // const handlePrevClick = async () => {
  //   console.log("prev");
  //   commonFunction(
  //     `https://newsapi.org/v2/top-headlines?category=${
  //       props.category
  //     }&country=${props.country}&apiKey=d093053d72bc40248998159804e0e67d&page=${
  //       page - 1
  //     }&pageSize=${props.pageSize}`
  //   );

  //   setPage(page - 1);
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?category=${
      props.category
    }&country=${props.country}&apiKey=d093053d72bc40248998159804e0e67d&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTotalResults(parsedData.totalResults);
    setArticles(articles.concat(parsedData.articles));
  };

  return (
    <div className="container my-4">
      <div
        className="container"
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "10px",
          backgroundColor: "rgb(45, 47, 47)",
        }}
      >
        <h1 style={{ marginTop: "65px" }}>Top {props.category} news</h1>
      </div>
      {loading && <Spinner />}
      {/* {!loading && */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row m-4">
          {articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={
                    element.title != null ? element.title.slice(0, 45) : " "
                  }
                  description={
                    element.description != null
                      ? element.description.slice(0, 88)
                      : " "
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.hindustantimes.com/img/2022/12/23/1600x900/bosco_martis_jhoome_jo_pathaan_1671786427934_1671786428078_1671786428078.jpeg"
                  }
                  newsUrl={element.url}
                  author={element.author ? element.author : "unknown"}
                  time={element.publishedAt ? element.publishedAt : "unknown"}
                  article = {element}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-light"
            onClick={handlePrevClick}
            disabled={page <= 1}
          >
            prev
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={handleNextClick}
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
          >
            next
          </button>
        </div> */}
    </div>
  );
}

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
