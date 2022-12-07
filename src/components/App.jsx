import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./Searchbar/ImageGallery/ImageGallery";


export class App extends Component {
  state = {
    value: '',
  }

  formSubmitHandler = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery data={this.state.value} />
      </>
    );
  };
};
