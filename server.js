const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@email.com',
      password: 'babanas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password) {
    console.log('signin ok');
    res.status(200).json('success');
  } else {
    console.log('signin not ok');
    res.status(400).json('error logging in');
  }
  
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  database.users.push({
    name: name,
    email: email,
    password: password,
    id: 125,
    entries: 0,
    joined: new Date()
  })
  res.status(200).json(database.users[database.users.length - 1]);
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});