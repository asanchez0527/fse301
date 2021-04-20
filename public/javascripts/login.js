$(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            var uid = user.uid;
            window.location.replace("/")
            alert("Already logged in!")
            // ...
        } else {
            // User is signed out
        }
    });

    $('#login').submit((e) => {
        e.preventDefault()
        const username = e.target.uid.value
        const password = e.target.pass.value

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("signed in")
                window.location.replace('/')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    })
})