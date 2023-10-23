import React from "react";

export const Button = ({ onClick, hasMoreImages }) => (
 hasMoreImages && (<button onClick={onClick}>
    Load more
  </button>)
);