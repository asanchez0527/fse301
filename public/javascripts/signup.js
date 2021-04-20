$(() => {
    $('#register').submit((e) => {
        e.preventDefault()

        const username = e.target.uid.value
        const pass = e.target.pass.value
        const passConf = e.target.passconf.value

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     

        if (pass != passConf) {
            alert("passwords do not match!")
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
                    // ..
                    console.log(errorMessage)
                });
        }
    })
})