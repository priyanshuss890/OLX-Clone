require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('mongoose-type-url');
mongoose.set('strictQuery', false);
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
const cors = require('cors');
const { json } = require('body-parser');
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Connection
mongoose.connect(process.env.MONGO_CONNECTION_URL);

//Schema  i.e the structure we want for data
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isSold: Boolean,
  imageUrl: mongoose.SchemaTypes.Url,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boughtItems: [itemSchema],
  listedItems: [itemSchema],
});

//Model
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

// console.log(user1);
const item1 = new Item({
  //new document in the collection
  name: 'Table',
  price: 8000,
  isSold: false,
});

// item1.save();

const item2 = new Item({
  name: 'Computer',
  price: 50000,
  isSold: true,
  imageUrl:
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
});
// console.log(item2);

app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.get('*', function (_, res) {
//   res.sendFile(
//     path.join(__dirname, '../client/build/index.html'),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.get('/api', (req, res) => {
  Item.find({ isSold: false }, function (err, foundItems) {
    if (foundItems) {
      res.send(foundItems);
      //   console.log(foundItems);
    } else console.log(err);
  });
});

app.post('/new-item', (req, res) => {
  const data = req.body[0];
  const itemName = data.itemName;
  const itemPrice = data.itemPrice;
  const itemImgUrl = data.itemImgUrl;
  const userName = data.userName;
  const userId = data.userId;
  // console.log(userName);

  const newItem = new Item({
    name: itemName,
    price: itemPrice,
    isSold: false,
    imageUrl: itemImgUrl,
  });

  newItem.save((err) =>
    !err
      ? User.findOne({ _id: userId }, (err, foundUser) => {
          !err &&
            User.updateOne(
              { _id: foundUser._id },
              { listedItems: [...foundUser.listedItems, newItem] },
              (err) => {
                !err ? console.log('superFunPoop') : console.log(err + 'poop');
              }
            );
        })
      : console.log(err)
  );
});

app.post('/buy-item', (req, res) => {
  const data = req.body[0];
  const itemId = data.itemId;
  const userId = data.userId;
  // console.log(data);

  Item.updateOne({ _id: itemId }, { isSold: true }, (err) =>
    console.log(!err ? '' : err)
  ) &&
    Item.findOne({ _id: itemId }, (err, foundItem) => {
      User.findOne({ _id: userId }, (err, foundUser) => {
        !err &&
          User.updateOne(
            { _id: foundUser._id },
            { boughtItems: [...foundUser.boughtItems, foundItem] },
            (err) => {
              !err
                ? console.log('superFunPoopaMania')
                : console.log(err + 'poop');
            }
          );
      });
    });
});

app.post('/login', (req, res) => {
  const data = req.body[0];
  const username = data.username;
  const password = data.password;
  // console.log(data);
  User.findOne({ username: username }, (err, foundUser) => {
    !err && foundUser
      ? bcrypt.compare(password, foundUser.password, (err, result) =>
          !err && result
            ? res.send(JSON.stringify(foundUser))
            : console.log(err + 'poop')
        )
      : res.send(JSON.stringify('poop'));
  });
});
app.post('/register', (req, res) => {
  const data = req.body[0];
  const username = data.username;
  const password = data.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const newUser = new User({
      username: username,
      password: hash,
    });

    newUser.save((err) => {
      //password will be encrypted now
      if (!err) {
        res.send(JSON.stringify(username));
      } else {
        console.log(err);
      }
    });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Server started on port 5000');
});
