console.log("we in")
  

const handlesLogin = async (event) => {
  event.preventDefault();
  console.log("ding");

  // value of username & password
  // trim removes white space at the beginning and end of string
  const username = document.querySelector("#usernameLogin").value.trim();
  const password = document.querySelector("#password").value.trim();

  // if both user & password have been entered then convert them to json string
   if (username && password) {
     const login = await fetch('/api/users/login', {
       // might also be api/users/login but idk
       method: 'post',
       body: JSON.stringify({
         username: username,
         password: password,
       }),
       headers: { "Content-Type": "application/json" },
     });

     console.log(username, password, login);
     // if login authenticated, load profile, else alert login status fail
     if (login.ok) {
       document.location.replace("/profile");
      console.log('works');
     } else {
       alert("Failed to log in");
     }
   }
};

document.querySelector(".loginForm").addEventListener("submit", handlesLogin);
