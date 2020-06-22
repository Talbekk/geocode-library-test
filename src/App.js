import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Geocode from 'react-geocode';

function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const [typedAddress, settypedAddress] = useState("");

  function getAddress(){
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setAddress(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  function getLocation(e){
    e.preventDefault();
    // Geocode.setApiKey("");

  // Get latidude & longitude from address.
Geocode.fromAddress(typedAddress).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    setLatitude(lat);
    setLongitude(lng);
  },
  error => {
    console.error(error);
  }
);
  }

  function handleChange(e){
    settypedAddress(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test for Geocode Library!
        </p>
        <form onSubmit={getLocation}>
          <label>
            Address:
            <input type="text" name="name" onChange={handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br></br>
        <button type="button" onClick={getLocation}>Click To Get Lat/Long!</button>
        <br></br>
        <button type="button" onClick={getAddress}>Click To Get Address!</button>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <p>Address is: {address}</p>
      </header>
    </div>
  );
}

export default App;
