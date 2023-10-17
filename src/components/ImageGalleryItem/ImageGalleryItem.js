import React from "react";

export const ImageGalleryItem = ({ image, onImageClick }) => (
    <li style={{ listStyle: "none" }} ><img src={image.webformatURL} alt="" onClick={() => onImageClick(image.largeImageURL)} />
    </li>
)