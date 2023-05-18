// document.getElementById('log-in').addEventListener('click', function() {
//     console.log('ding')
//   });
console.log("we in")
  

async function handlesLogin(event) {
    event.preventDefault();
    console.log('ding')

    // value of username & password
    // trim removes white space at the beginning and end of string
    const username = document.querySelector('.usernameLogin').value.trim();
    const password = document.querySelector('.passwordLogin').value.trim();

    // if both user & password have been entered then convert them to json string
    if (username && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    

        // if login authenticated, load profile, else alert login status fail
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log in');
        }
      }

};


document.querySelector('.loginForm').addEventListener('submit', handlesLogin);