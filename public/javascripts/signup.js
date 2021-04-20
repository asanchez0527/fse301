$(() => {
    $('#register').submit((e) => {
        e.preventDefault()

        const username = e.target.uid.value
        const pass = e.target.pass.value
        const passConf = e.target.passconf.value     

        if (pass != passConf) {
            $('#errorField').html("Passwords do not match")
        } else {
            firebase.auth().createUserWithEmailAndPassword(username, pass)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    window.location.replace("/")
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $('#errorField').html(errorMessage)
                    // ..
                    console.log(errorMessage)
                });
        }
    })
})