const API_URL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:8080/ivis/dmp/api/v0' : 'https://api.guestm.app/api/v1/messages';

export function getMessages() {
  return fetch(API_URL + "/buildings/getlist?type=INTERCOM&page=1")
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(messages => {
      console.log(typeof messages); // Check the type of messages
      if (typeof messages !== 'object' || messages === null) {
        throw new Error('Response is not an object');
      }
      
      // Handle object properties accordingly
      const messageArray = Object.values(messages); // Convert object values to an array
      
      const haveSeenLocation = {};
      return messageArray.reduce((all, message) => {
        const key = `${message.latitude.toFixed(3)}${message.longitude.toFixed(3)}`;
        if (haveSeenLocation[key]) {
          haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
          haveSeenLocation[key].otherMessages.push(message);
        } else {
          haveSeenLocation[key] = message;
          all.push(message);
        }
        return all;
      }, []);
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
      // Handle the error gracefully, e.g., show a message to the user
    });
}



// export function getLocation() {
//   return new Promise((resolve) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       resolve({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       });
//     }, () => {      
//       resolve(fetch('https://ipapi.co/json')
//         .then(res => res.json())
//         .then(location => {
//           return {
//             lat: location.latitude,
            
//             lng: location.longitude
//           };
//         }));
//     });
//   });
// }

export function sendMessage(message) {
  return fetch(API_URL + "/building", {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message)
  }).then(res => res.json());
}
