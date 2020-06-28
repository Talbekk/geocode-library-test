import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Geocode from 'react-geocode';

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const [typedAddress, settypedAddress] = useState("");
  const [jsonAddress, setJsonAddress] = useState("");
  const [jsonCoordinates, setJsonCoordinates] = useState("");

  function createJsonAddress(address){
    const array = address.split(',')
    array.pop()
    let secondLine = null;
    // let secondArray = address.split(' ')
    if ( array.length === 3) {
     secondLine = array.slice(-2).pop();
    }
    let element = array.slice(-1).pop();
    let splitElement = element.split(' ');
    let testPotsCode = splitElement[2] + " " + splitElement[3];


    const obj = {
        "addressLine1": array[0],
        "addressLine2": secondLine,
        "city": splitElement[1],
        "postcode": testPotsCode,
    }
    let myJson = JSON.stringify(obj);
    setJsonAddress(myJson)
    
  }

  function createJson(lat, lng){
    const obj = {
        "latitude": lat,
        "longitude": lng,
    }

    let myJson = JSON.stringify(obj);
    console.log(myJson)
    setJsonCoordinates(myJson)
}

  function getFullAddress(coordinates){
    Geocode.fromLatLng(coordinates[0], coordinates[1]).then(
      response => {
        const address = response.results[0].formatted_address;
        createJsonAddress(address)
        setAddress(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  function getLocation(e){
    e.preventDefault();
    Geocode.setApiKey("");
    let testLat = 0;
    let testLong = 0;

  // Get latidude & longitude from address.
Geocode.fromAddress(typedAddress).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    createJson(lat, lng)
    setLatitude(lat);
    setLongitude(lng);
    testLat = lat;
    testLong = lng;
    console.log("hit lat, long");
  },
  error => {
    console.error(error);
  }
).then(() => {
  console.log("trigger get address");
  getFullAddress([testLat, testLong]);
  });
}

  function handleChange(e){
    settypedAddress(e.target.value);
  }

  // function chooseCountry(e){
  //   setChosenCountry(e.target.value)
  // }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test for Geocode Library!
        </p>
        {/* <form onSubmit={chooseCountry}>
          <label>
            Address:
            <input type="text" name="name" onChange={handleChange}/>
          </label>
        </form> */}
        <form onSubmit={getLocation}>
          <label>
            Address:
            <input type="text" name="name" onChange={handleChange}/>
          </label>
        </form>
        <br></br>
        <button type="button" onClick={getLocation}>Click To Get Location Details!</button>
        <p>{jsonAddress}</p>

        <p>{jsonCoordinates}</p>
      </header>
    </div>
  );
}

export default App;
