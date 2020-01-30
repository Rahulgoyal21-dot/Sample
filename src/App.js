import React, { Component } from "react";
import { Image, Box } from "grommet";
import "./App.css";
import { Link, BrowserRouter as Router } from "react-router-dom";

import Form from "./components/Form";
import Recipe from "./components/Recipe";

class App extends Component {
  state = {
    photos: []
  };
  getRecipe = async e => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
    const api_call = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await api_call.json();
    this.setState({ photos: data });
    console.log(data);
    console.log(this.state.photos[0].url);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipe photos={this.state.photos} />
      </div>
    );
  }
}
export default App;
