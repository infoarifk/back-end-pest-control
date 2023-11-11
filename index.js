const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.nud4ico.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("pestSolutionDB");
const contactCollection = database.collection("contacts");

async function run() {
  try {
    
    await client.connect();

    
    app.post("/contacts", async(req, res)=>{


        const contact = req.body;
        console.log("received users: ", contact);
       
        //send data to database
        const result = await contactCollection.insertOne(contact);
        res.send(result);
  
  
      });
  
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);











app.get("/", (req, res)=>{

    res.send("pest control server is running");
});

app.listen(port, ()=>{
    console.log(`server is running in port: ${port}`);
})