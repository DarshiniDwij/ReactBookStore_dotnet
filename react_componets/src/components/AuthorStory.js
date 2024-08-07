import React from "react";
import { useLocation } from "react-router-dom";
const AuthorStory = () => {
  const location = useLocation();
  const author = location.state;

  const imageUrl = `/images/Authors/${author.name}.png`;

  return (
    <div>
      <div>
        <span>
          <h5>Story Of</h5>
        </span>
        <h1>{author.name}</h1>
      </div>
      <div className="main-div">
        <div className="empty-div">
          <div className="author-img">
            <img src={imageUrl} alt="" />
          </div>
          <div className="content-div">
            <h2>Biography</h2>

            {author.biography.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorStory;
