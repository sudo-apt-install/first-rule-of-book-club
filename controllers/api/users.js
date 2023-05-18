// const express = require('express');
// const app = express();



// // Endpoint for user login
// app.post('/api/users/login', (req, res) => {
//   // Retrieve the username and password from the request body
//   const { username, password } = req.body;

//   // Perform your login logic here, such as checking against a database
//   // Validate the username and password, and authenticate the user

//   // For example, let's assume the username is "admin" and password is "password"
//   if (username === 'admin' && password === 'password') {
//     // Successful login
//     console.log('success');
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     // Failed login
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });