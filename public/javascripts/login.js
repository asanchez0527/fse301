$(() => {
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
                $('#errorField').html(errorMessage)
            });
    })
})