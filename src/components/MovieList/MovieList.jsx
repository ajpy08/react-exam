import React, { useState, useEffect } from "react";
import { CircularProgress, Rating, Pagination, Box } from "@mui/material";
import axios from "axios";
import "./MovieList.css";
import noPoster from '../../assets/files/no-poster.png'

const Sections = {
  latest: "Latest",
  nowPlaying: "Now Playing",
  popular: "Popular",
  topRated: "Top Rated",
  upcoming: "Upcoming",
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [section, setSection] = useState(Sections.popular);

  useEffect(() => {
    fetchData(section, currentPage);
  }, [currentPage, section]);

  const fetchData = async (section, page) => {
    let options;
    if (section === Sections.latest) {
      options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/latest",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("apiKey")}`,
        },
      };
    }

    if (section === Sections.nowPlaying) {
      options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=${page}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("apiKey")}`,
        },
      };
    }

    if (section === Sections.popular) {
      options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/popular?language=es-MX&page=${page}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${sessionStorage.getItem("apiKey")}`,
        },
      };
    }
  
    if (section === Sections.topRated) {
      options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/top_rated?language=es-MX&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("apiKey")}`
        }
      };
    }
  
    if (section === Sections.upcoming) {
      options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/upcoming?language=es-MX&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("apiKey")}`
        }
      };
    }

    if (options) {
      axios
      .request(options)
      .then(function (response) {
        const data = response.data.results
          ? response.data.results
          : [response.data];
        setMovies(data);
        setLoading(false);
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages)
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSection = (section) => {
    setSection(section);
    setCurrentPage(1)
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div className="button-group">
        <div className="button-container">
          <button
            name={Sections.latest}
            className={`button ${section === Sections.latest ? 'selected' : ''}`}
            onClick={() => handleSection(Sections.latest)}
          >
            Latest
          </button>
          <button
            name={Sections.nowPlaying}
            className={`button ${section === Sections.nowPlaying ? 'selected' : ''}`}
            onClick={() => handleSection(Sections.nowPlaying)}
          >
            Now Playing
          </button>
          <button
            name={Sections.popular}
            className={`button ${section === Sections.popular ? 'selected' : ''}`}
            onClick={() => handleSection(Sections.popular)}
          >
            Popular
          </button>
          <button
            name={Sections.topRated}
            className={`button ${section === Sections.topRated ? 'selected' : ''}`}
            onClick={() => handleSection(Sections.topRated)}
          >
            Top Rated
          </button>
          <button
            name={Sections.upcoming}
            className={`button ${section === Sections.upcoming ? 'selected' : ''}`}
            onClick={() => handleSection(Sections.upcoming)}
          >
            Upcoming
          </button>
        </div>
      </div>
      <br />
      <h1 style={{marginLeft: '10%'}}>{section}</h1>
      <br/>
      <div className="image-grid">
        {movies.map((item, index) => {
          const normalizedRating = Math.min(10, Math.max(0, item.vote_average));
          return (
            <div key={index} className="image-item">
              <img
                src={`${
                  !item.poster_path
                    ? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'
                    : `https://image.tmdb.org/t/p/w300${item.poster_path}?w=164&h=164&fit=crop&auto=format`
                }`}
                alt={item.title}
              />
              <div className="overlay">
                <div className="overlay-text">
                  <div className="overlay-text-title">{item.title}</div>
                  <div className="overlay-text-title">{`${item.release_date}`}</div>
                  <br />
                  <div style={{textAlign: "justify"}}>
                    {!item.overview
                      ? "The overview will be soon..."
                      : item.overview.length > 250
                      ? `${item.overview.substring(0, 240)}...`
                      : item.overview}
                  </div>
                  <br />
                  <br />
                  <div>
                    <Rating
                      name="rating"
                      value={normalizedRating / 2}
                      precision={0.5}
                      max={5}
                      size="large"
                      readOnly
                    />
                  </div>{" "}
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          showFirstButton={true}
          showLastButton={true}
          style={{ fontSizeAdjust: 5 }}
        />
      </Box>
    </div>
  );
};

export default MovieList;
