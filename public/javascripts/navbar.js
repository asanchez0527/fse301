$(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $('#bigNav').append(`<ul class="navbar-nav navbar-right">
            <li class="nav-item">
                <button id="logoutBtn" class="btn" type="submit">logout</button>
            </li>
        </ul>`)

        $("#logoutBtn").click(()=> {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.replace("/")
              }).catch((error) => {
                // An error happened.
              });
        })
        } else {
            $('#bigNav').append(`
            <ul class="navbar-nav navbar-right">
                <li class="nav-item">
                    <a class="nav-link" href="/login">Log in</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signup">Register</a>
                </li>
            </ul>`
            )
        }
    });
})