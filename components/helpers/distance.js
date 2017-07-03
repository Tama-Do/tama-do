import { Constants, Location, Permissions } from 'expo';

// calculate distance in feet between the user and the pet
// lat1 and lon1 are the user's location
// lat2 and lon2 are the pet's location
export function distance (lat2, lon2) {
  Number.prototype.toRad = function() {
   return this * Math.PI / 180;
  }
  let lat1, lon1;
  _getLocationAsync()
  .then(({latitude, longitude}) => {
    lat1 = latitude;
    lon1 = longitude;
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
    var bool = d <= 200;
    console.log('d', d)
    console.log('lat1 ', lat1, 'lon1 ', lon1)
    console.log('lat2', lat2, 'lon2 ', lon2)
    this.setState({checkedIn: bool});
  })
  .catch(console.error);
};

// async request to get the user's location
export const _getLocationAsync = async () => {
  let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
  return { latitude: location.coords.latitude, longitude: location.coords.longitude };
};
