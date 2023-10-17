import { Component } from "react";
import React from "react";


export class Searchbar extends Component{
    state = {
        query: "",
    }

    handleQueryChange = (e) => {
        this.setState({query: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: ""})
    }
    render() {
        return (
      <header >
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}