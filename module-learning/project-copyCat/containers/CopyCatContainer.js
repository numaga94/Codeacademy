import React from 'react';
import ReactDOM from 'react-dom';
import { CopyCat } from '../components/CopyCat';

const images = {
  copycat: 'https://content.codecademy.com/courses/React/react_photo_copycat.png',
  quietcat: 'https://content.codecademy.com/courses/React/react_photo_quietcat.png'
};

class CopyCatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copying: true,
      userInput: ''
    };

    this.toggleTape = this.toggleTape.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  toggleTape() {
    this.setState({ copying: !this.state.copying });
  }

  handleUserInput(event) {
    this.setState({ userInput: event.target.value });
  }

  render() {
    return (
      <CopyCat
        copying={this.state.copying}
        toggleTape={this.toggleTape}
        userInput={this.state.userInput}
        handleChange={this.handleUserInput}
      />
    );
  }
}

ReactDOM.render(<CopyCatContainer />, document.getElementById('app'));
