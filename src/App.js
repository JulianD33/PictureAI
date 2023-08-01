import React from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import Design from  './components/Design';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import './App.css';

// const returnClarifaiRequestOptions = (imageUrl, inputFile) => {
//     const PAT = '1ec12a465cbd43faa17f85b51bc7b9f4';
//     const USER_ID = 'julian27';       
//     const APP_ID = 'test';

//     let raw;

//     raw = JSON.stringify({
//       "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//       },
//       "inputs": [
//         {
//           "data": {
//             "image": {
//               "url": imageUrl
//             }
//           }
//         }
//       ]
//     });
  

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions;
// };

// const app = new Clarifai.App({
//     apiKey: '2fecfb75a55047eba4f1fef831064522'
// });

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
        entries: 0,
        joined: ''
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
        console.log(data.name);
    }

    // componentDidMount() {
    //     fetch('http://localhost:3000')
    //     .then(response => response.json())
    //     .then(console.log)
    // }

    calculateFaceLocation = (data) => {
       const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);
       return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
       }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }



    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
       // fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        fetch('https://asa-cgwp.onrender.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
            })
        })
        // app.models.predict('face-detection', this.state.input)
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch('https://asa-cgwp.onrender.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                    id: this.state.user.id
                    })
                })
                  .then(response => response.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, { entries: count }))
                  })
                  .catch(console.log)
            }
            this.displayFaceBox(this.calculateFaceLocation(response));

        })
        .catch(err => console.log(err));
                
    }

            
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
       const { isSignedIn, imageUrl, route, box } = this.state;
    return (
        <div className="App">
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              <Design />
              { route === 'home'
                ? <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onPictureSubmit={this.onPictureSubmit}
                      />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                  </div>
                  : (
                    route === 'signin'
                    ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
           }
        </div>
    );
  }
}


export default App;
