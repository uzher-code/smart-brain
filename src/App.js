import React, { Component} from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


const particleOptions = {
  particles: {
    number: {
      value:80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '0',
    joined: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,  
      topRow: clarifaiFace.top_row * height, 
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (location) => {
    this.setState({box: location})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
          })
        })
      .then(response => response.json())
      .then(response => {
        if (response !== 'unable to work with API') {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            return this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
          this.displayFaceBox(this.calculateFaceLocation(response));
        }
        
      })
      .catch(err => console.log(err));
  } 

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  onRouteChange = (page) => {
    (page === 'home') ?
      this.setState({isSignedIn: true})
      : this.setState(initialState);
    this.setState({route: page});
  }

  render(){ 
    const { isSignedIn, box, imageUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params= {particleOptions}
        />
        <Navigation isSignedIn= {isSignedIn} onRouteChange = {this.onRouteChange} />
        {route === 'signin'
          ? <Signin loadUser= {this.loadUser} onRouteChange = {this.onRouteChange} />
          : route === 'register'
            ? <Register loadUser= {this.loadUser} onRouteChange= {this.onRouteChange} />
            : <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                onInputChange = {this.onInputChange}
                onPictureSubmit = {this.onPictureSubmit}
              />
              <FaceRecognition box = {box} imageUrl = {imageUrl} />
            </div>}
        
      </div>
    );
  }
}

export default App;
