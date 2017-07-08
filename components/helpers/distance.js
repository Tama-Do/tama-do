import { Constants, Location, Permissions } from 'expo';

// calculate distance in feet between the user and the pet
// lat1 and lon1 are the user's location
// lat2 and lon2 are the pet's location
export function distance(lat2, lon2, userId, petKey) {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
  let lat1, lon1;
  _getLocationAsync()
    .then(({ latitude, longitude }) => {
      lat1 = latitude;
      lon1 = longitude;
      var R = 6371e3; // metres
      var φ1 = lat1.toRad();
      var φ2 = lat2.toRad();
      var Δφ = (lat2 - lat1).toRad();
      var Δλ = (lon2 - lon1).toRad();
      var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = (R * c * 3.2808).toFixed();
      var bool = d <= 200;
      this.setState({ checkedIn: bool });
      if (!bool) {
        this.setState({ animationType: 'DISGUST' })
      }
      dateVisited.call(this, userId, petKey, bool)
    })
    .catch(console.error);
};

// async request to get the user's location
export const _getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    // this.setState({
    //   errorMessage: 'Permission to access location was denied',
    // });
  }
  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  return { latitude: location.coords.latitude, longitude: location.coords.longitude };
};

function dateVisited(userId, petKey, checkedIn) {
  // if pet has never been visited, and user is not checked in
  if (!this.state.pet.dates && !checkedIn) {
    return null;
  }

  // if user is checkedIn
  if (checkedIn) {
    let today = new Date();
    let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
    let dateMS = Date.now()
    // if user is checkedIn and pet has never been visited
    if (!this.state.pet.dates) {
      this.props.addPetDate(userId, petKey, dateMS, date)
      this.setState({ lastVisit: date })
    } else {
      // if user is checkedIn and pet has been visited before today
      let lastDate = Object.keys(this.state.pet.dates).map(dateMS => Number(dateMS))
      lastDate = this.state.pet.dates[Math.max(...lastDate)]
      if (lastDate !== date) {
        this.props.addPetDate(userId, petKey, dateMS, date)
        this.setState({ lastVisit: date })
      } else {
        // if user is checkedIn but pet has been visited the same day
        this.setState({ lastVisit: lastDate })
      }
    }
  } else {
    // if user is not checkedIn
    let lastDate = Object.keys(this.state.pet.dates).map(dateMS => Number(dateMS))
    lastDate = this.state.pet.dates[Math.max(...lastDate)]
    this.setState({ lastVisit: lastDate });
  }
}
