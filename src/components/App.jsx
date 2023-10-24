import React from "react";
import { Component } from "react";
import axios from "axios";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { ModalComponent } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { MagnifyingGlass } from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: "",
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1, images: [], hasMoreImages: true }, this.fetchImages);
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = "39227373-dd01e2c6342e880b425481406";
    const perPage = 12;
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    this.setState({ isLoading: true });

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
          hasMoreImages: response.data.hits.length === perPage,
        }));
      })
      .catch((error) => console.error("Error fetching images: ", error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  handleQuerySubmit = (query) => {
    this.setState({ query });
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: "" });
  };

  render() {
    const { images, isLoading, selectedImage, hasMoreImages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        {!images.length ? null : hasMoreImages && !isLoading && (
          <Button onClick={this.fetchImages} hasMoreImages={hasMoreImages} />
        )}
        <ModalComponent
          largeImageURL={selectedImage}
          onRequestClose={this.handleCloseModal}
        />
      </div>
    );
  }
}