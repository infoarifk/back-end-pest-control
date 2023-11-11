const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//pestsolution
//h39MbaHwhKLLRnwP



const uri = "mongodb+srv://pestsolution:h39MbaHwhKLLRnwP@cluster0.nud4ico.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    //code here
    
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