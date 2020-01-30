import React from "react";

const Recipe = props => {
  {
    props.photos.map(photo => {
      return <h3>{photo.title.toUpperCase()}</h3>;
    });
  }
};

export default Recipe;
