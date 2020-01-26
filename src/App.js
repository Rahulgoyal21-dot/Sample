import React, { Component } from "react";
import { Image, Box } from "grommet";
import "./App.css";

import Form from "./components/Form";

class App extends Component {
  state = {
    photos: []
  };
  getRecipe = async e => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
    const api_call = await fetch("https://jsonplaceholder.typicode.com/photos");
    // .then(response => {
    //   //const api_data = response.json();
    //   console.log(response.json());
    //   console.log("data...", api_call);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
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
        {this.state.photos.map(photo => {
          return (
            <Box
              height="300px"
              width="300px"
              direction="row"
              gap="medium"
              alignSelf="center"
            >
              <Image src="photo.thumbnailUrl" fit="contain" />;
            </Box>
          );
        })}
      </div>
    );
  }
}
export default App;
