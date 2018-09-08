const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kissanpierut66',
    database : 'smart-brain'
  }
});

//db.select('*')
//    .from('users')
//    .then(data => console.log(data));

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
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
    
  db.select('*')
      .from('users')
      .where({id})
      .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('not found')
        }
      })
      .catch(err => res.status(400).json('error getting user'))
});

app.put('/image/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  
  if (!found) {
    res.status(400).json('not found');
  }
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && 
      req.body.password === database.users[0].password) {
    res.json(database.users[0]); // res.status(200).json('success');
//    res.send('signed in');
  } else {
    console.log('signin not ok');
    res.status(400).json('error logging in');
  }
  
});

app.post('/register', (req, res) => {
//  console.log(req.body);
  const {name, email, password} = req.body;
  db('users')
    .returning('*')
    .insert({
    name: name,
    email: email,
    joined: new Date()
  })
  .then(user => res.json(user[0]))
  .catch(err => res.status(400).json('unable to register'));
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});