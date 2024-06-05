const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');
const app = express();
const port = 3000;


const contactsPath = 'contacts.json'
const secretKey = process.env.secretKey;


app.use(express.static(path.join(__dirname, 'public', 'static')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'styles')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'scripts')));
app.use(express.static(path.join(__dirname, 'public', 'static', 'images')));

app.use('/admin', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token || token == 'null' || token === '' || token === 'undefined') {
    return res.send({'success': false});
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send({'success': false});
    }
    req.user = decoded;
    next();
  })
}

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'static', 'home.html'));
});

app.get('/admin', async (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

app.get('/api/admin/get-contacts', verifyToken, async (req, res) => {
  try {
    let contacts = await fs.readJson(contactsPath);
    res.send({'success': true, 'contacts': contacts});
  } catch (error) {
    res.send({'success': false, 'error': 'Error getting contacts'});
  }
})

app.get('/admin-login', async (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin-login.html'));
});

app.post('/admin-login', async (req, res) => {
  const {username, password} = req.body;
  if (username == process.env.adminUsername && password == process.env.adminPassword) {
    const token = jwt.sign({username: username}, secretKey, {expiresIn: '24h'});
    res.send({'success': true, 'token': token});
  } else {
    res.send({'success': false});
  }
});

app.post('/api/contact-us', async (req, res) => {
  const {name, business, email, phone, message} = req.body;

  if (name == null || name.length == 0) {
    res.send({'success': false, 'error': 'Please enter your name'});
    return;
  }
  if (business == null || business.length == 0) {
    res.send({'success': false, 'error': 'Please enter your business name'});
    return;
  }
  if (email == null || email.length == 0) {
    res.send({'success': false, 'error': 'Please enter your email so that we can contact you!'});
    return;
  }
  if (phone != null && phone.length == 0) {
    phone = null;
  }
  if (message == null || message.length == 0) {
    res.send({'success': false, 'error': 'Please enter a message before submitting the form. We need to know how we can assist you!'});
    return;
  }

  if (name.length > 50) {
    res.send({'success': false, 'error': 'Name must be under 50 characters'});
    return;
  }
  if (business.length > 100) {
    res.send({'success': false, 'error': 'Business name must be under 100 characters'});
    return;
  }
  if (email.length > 50) {
    res.send({'success': false, 'error': 'Email must be under 50 characters'});
    return;
  }
  if (phone != null && phone.length > 20) {
    res.send({'success': false, 'error': 'Phone must be under 20 characters'});
    return;
  }
  if (message.length > 1500) {
    res.send({'success': false, 'error': 'Message must be under 1500 characters'});
    return;
  }

  try {
    let contacts = [];
    if (await fs.pathExists(contactsPath)) {
      contacts = await fs.readJson(contactsPath);
    }

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      timeZone: 'America/Chicago'
    });
    contacts.push({name, email, phone, message, timestamp});

    await fs.writeJson(contactsPath, contacts);

    res.send({'success': true});
  } catch (error) {
    console.log('Error saving contact data:', error);
    res.send({'success': false, 'error': 'Something went wrong on our side'});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});