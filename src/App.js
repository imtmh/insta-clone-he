import React, { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./ImageCard";

const LIKE = "likes";
const DATE = "timestamp";
const ASC = "ASC";
const IMAGES_URL = "http://starlord.hackerearth.com/insta";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [sortBy, setSortBy] = useState({});

  function handleSortBy(type) {
    const isAsc = !sortBy[ASC];
    console.log(isAsc, sortBy);
    setSortBy({ type, [ASC]: isAsc });
    handleSorting(type, isAsc);
  }
  function handleSorting(type, isAsc) {
    setImages(images.sort((img1, img2) => ((isAsc && 1) || -1) * (img1[type] > img2[type] ? 1 : img1[type] < img2[type] ? -1 : 0)));
  }

  useEffect(() => {
    fetch(IMAGES_URL)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setImages(data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="sticky-header">
        <h1 className="title">Insta Clone</h1>
        <div className="buttons-container">
          <button className="button" onClick={() => handleSortBy(DATE)}>
            Sort by date {!!(sortBy.type === DATE) ? (sortBy[ASC] ? "^" : "v") : ""}
          </button>
          <button className="button" onClick={() => handleSortBy(LIKE)}>
            Sort by Likes {!!(sortBy.type === LIKE) ? (sortBy[ASC] ? "^" : "v") : ""}
          </button>
        </div>
      </div>
      {isLoading ? (
        <div>Fetching images...</div>
      ) : (
        <div>
          <div className="card-list">
            {images.map((image, index) => (
              <ImageCard key={index} {...image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
