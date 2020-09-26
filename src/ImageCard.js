import React from "react";

export default function ImageCard({ Image, likes, timestamp }) {
  return (
    <div className="card">
      <img className="card-image" src={Image} alt="Insta img"></img>
      <div className="card-content">
        <p>Created: {timestamp}</p>
        <p>Likes: {likes}</p>
      </div>
    </div>
  );
}
