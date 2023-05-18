async function handlesLogin(event) {
    event.preventDefault();

    // value of username & password
    // trim removes white space at the beginning and end of string
    const username = document.querySelector('.usernameLogin').value.trim();
    const password = document.querySelector('.passwordLogin').value.trim();

    // if both user & password have been entered then convert them to json string

    // if login authenticated, load profile, else alert login status fail
}