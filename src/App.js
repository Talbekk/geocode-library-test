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
  const [description, setDescription] = useState(null);
  const [locationLink, setLocationLink] = useState(null);

  function createJsonAddress(address, coordinates, addressID){
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
        "id": addressID + "_MAP_LOCATION",
        "type": "CONTENT_PAGE",
        "line1": typedAddress,
        "line2": array[0],
        "line3": null,
        "icon": null,
        "image": "assets/arn_pleasure_beach.jpg",
        "address": {
        "addressLine1": array[0],
        "addressLine2": secondLine,
        "city": splitElement[1],
        "postcode": testPotsCode,
        "latitude": coordinates[0],
        "longitude": coordinates[1]
        },
        "components": [
          {
              "type": "VERTICAL_SPACER_COMPONENT"
          },
          {
              "type": "TEXT_COMPONENT",
              "value": description,
              "align": "CENTER",
              "fontSize": "MEDIUM",
              "isItalic": false,
              "isBold": false,
              "useInvertedColours": false
          },
          {
              "type": "VERTICAL_SPACER_COMPONENT"
          },
          {
              "type": "BUTTON_COMPONENT",
              "buttonType": "LINK",
              "line1": "Visit Website",
              "line2": null,
              "icon": null,
              "value": locationLink
          },
          {
              "type": "VERTICAL_SPACER_COMPONENT"
          }
      ]
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
    const addressID = getContentPageID();
    Geocode.fromLatLng(coordinates[0], coordinates[1]).then(
      response => {
        const address = response.results[0].formatted_address;
        createJsonAddress(address, coordinates, addressID);
        setAddress(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  function getContentPageID(){
    const originalAddress = typedAddress.toUpperCase().split(' ');
    const refactoredAddress = originalAddress[0] + "_" + originalAddress[1] + "_";
    return refactoredAddress;
  }

  function getLocation(e){
    e.preventDefault();
    Geocode.setApiKey("AIzaSyBu6NyTxgHpIcOEBZG21gGnF9JNqLUdYew");
    let testLat = 0;
    let testLong = 0;

  // Get latidude & longitude from address.
Geocode.fromAddress(typedAddress).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    createJson(lat, lng)
    setLatitude(lat);
    setLongitude(lng);
    getContentPageID();
    testLat = lat;
    testLong = lng;
    console.log("hit lat, long");
  },
  error => {
    console.error(error);
  }
).then(() => {
  getFullAddress([testLat, testLong]);
  });
}

  function handleChange(e, setter){
    setter(e.target.value);
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
            <input type="text" name="name" onChange={(e) => handleChange(e, settypedAddress)}/>
          </label>
          <label>
           Description:
            <input type="text" name="name" onChange={(e) => handleChange(e, setDescription)}/>
          </label>
          <label>
            Link:
            <input type="text" name="name" onChange={(e) => handleChange(e, setLocationLink)}/>
          </label>
        </form>
        <br></br>
        <button type="button" onClick={getLocation}>Click To Get Location Details!</button>
        <p>{jsonAddress}</p>
      </header>
    </div>
  );
}

export default App;
