import { Constants, Location, Permissions } from 'expo';

// calculate distance in feet between the user and the pet
// lat1 and lon1 are the user's location
// lat2 and lon2 are the pet's location
export const distance = (lat2, lon2) => {
  Number.prototype.toRad = function() {
   return this * Math.PI / 180;
  }
  let lat1, lon1;
  _getLocationAsync()
  .then(({latitude, longitude}) => {
    lat1 = latitude;
    lon1 = longitude;
    console.log('lat1', lat1);
    console.log('lon1', lon1);
    var R = 6371e3; // metres
    var φ1 = lat1.toRad();
    var φ2 = lat2.toRad();
    var Δφ = (lat2-lat1).toRad();
    var Δλ = (lon2-lon1).toRad();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = (R * c * 3.2808).toFixed();
    console.log('d', d)
    var bool = d <= 100;
    console.log('bool', bool);
    // return bool;
    this.setState({checkedIn: bool})
  })
};

// async request to get the user's location
export const _getLocationAsync = async () => {
  // let { status } = await Permissions.askAsync(Permissions.LOCATION);
  // if (status !== 'granted') {
  //   return 'Permission to access location was denied';
  // }

  let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
  return { latitude: location.coords.latitude, longitude: location.coords.longitude };

};
