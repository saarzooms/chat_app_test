import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    console.log('res ', res);
    if (res.status === 200) {
      window.location.href = '/chat';
    } else {
      alert('Invalid username or password');
    }
  });
};

return (
  <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);
};

export default Login