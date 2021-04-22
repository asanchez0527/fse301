const db = firebase.firestore()

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // save current location to db
    getLocation(user.uid)
    setupJitsi(user.email, user.uid)
  } else {
    // User is signed out
    window.location.replace("/login")
  }
});

// jitsi setup
function setupJitsi(email, uid) {
  const domain = 'meet.jit.si';
  const options = {
    roomName: 'swagmaster69',
    width: 800,
    height: 600,
    userInfo: {
      email: email,
      displayName: uid
    },
    configOverwrite: {
      prejoinPageEnabled: false,
      disableDeepLinking: true
    },
    parentNode: document.querySelector('#meet')
  };
  const api = new JitsiMeetExternalAPI(domain, options);
  api.executeCommand('toggleVideo')
}

function getLocation(uid) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => { savePosition(pos, uid) });
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

function savePosition(position, uid) {
  db.collection("location").doc(uid).set({
    location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
  })
}

$(() => {
  $('#trafficBtn').click(() => {
    db.collection("reports").doc('latest').set({ data: 'traffic' })
    alert('success')
  })

  $('#accidentBtn').click(() => {
    db.collection("reports").doc('latest').set({ data: 'accident' })
    alert('success')
  })

  $('#policeBtn').click(() => {
    db.collection("reports").doc('latest').set({ data: 'police' })
    alert('success')
  })

  db.collection('reports').doc('latest').onSnapshot((doc) => {
    var msg = new SpeechSynthesisUtterance((doc.data())['data']);
    window.speechSynthesis.speak(msg);
  })
  // starCountRef.on('value', (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });
})
