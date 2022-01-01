const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyeto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log('database connected successfully');


    const database = client.db('Lee_Shop');

    const productsCollection = database.collection('products');
    // const usersCollection = database.collection('users');
    // const itemsCollection = database.collection('items');
    // const reviewsCollection = database.collection('reviews');


    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });

  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from onlineHomeShop!')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})