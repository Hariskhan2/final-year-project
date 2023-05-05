import React from "react";
import "./Recommendation.css";
import images from "./Imagelinks";

class Recommendation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesToDisplay: [],
    };
  }

  handleClick = () => {
    const { index } = this.props;
    const imagesToDisplay = [];
    const links = index === 0 ? images.key0 : images.key1;

    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * links.length);
      imagesToDisplay.push(links[randomIndex]);
    }

    this.setState({ imagesToDisplay });
  };

  render() {
    const { imagesToDisplay } = this.state;

    return (
      <>
        <button type="submit" onClick={() => this.handleClick()}>
          Get Recommendation
        </button>
        <div className="imageContainer">
          {imagesToDisplay.map((link) => (
            <img src={link} alt="random image" key={link} />
          ))}
        </div>
      </>
    );
  }
}

export default Recommendation;
