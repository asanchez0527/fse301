$(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      var uid = user.uid;
      const db = firebase.firestore()

      // save current location to db
      getLocation()

      const domain = 'meet.jit.si';
      const options = {
        roomName: 'swagmaster69',
        width: 800,
        height: 600,
        userInfo: {
          email: user.email,
          displayName: user.uid
        },
        configOverwrite: {
          prejoinPageEnabled: false
        },
        parentNode: document.querySelector('#meet')
      };
      const api = new JitsiMeetExternalAPI(domain, options);
      api.executeCommand('toggleVideo')

      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(savePosition);
        } else {
          console.log("Geolocation is not supported by this browser.")
        }
      }

      function savePosition(position) {
        db.collection("location").doc(user.uid).set({
          location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
        })
        console.log("location saved")
      }

    } else {
      // User is signed out
      window.location.replace("/login")
    }
  });
})