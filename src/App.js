import React, { Component} from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';



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
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '0',
    joined: '',
    age: ''
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
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBoxes = (locations) => {
    this.setState({boxes: locations})
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
          this.displayFaceBoxes(this.calculateFaceLocation(response));
        }
        
      })
      .catch(err => console.log(err));
  } 

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  onRouteChange = (page) => {
    if (page === 'signout') {
      return this.setState(initialState)
    } else if (page === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: page});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render(){ 
    const { isSignedIn, isProfileOpen, boxes, imageUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params= {particleOptions}
        />
        <Navigation isSignedIn= {isSignedIn} toggleModal={this.toggleModal}
          onRouteChange = {this.onRouteChange} />
        }
        { isProfileOpen && 
          <Modal>
            <Profile 
              isProfileOpen = {isProfileOpen}
              toggleModal = {this.toggleModal}
              loadUser = {this.loadUser} 
              user={user}/>
          </Modal>
        }
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
              <FaceRecognition boxes = {boxes} imageUrl = {imageUrl} />
            </div>}
        
      </div>
    );
  }
}

export default App;
