const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const servicesCollecrion = database.collection("services");
const bookingCollection = database.collection("bookings");

async function run() {
  try {
    
   


    app.get("/services", async(req, res)=>{

      const cursor = servicesCollecrion.find();
      const result = await cursor.toArray();
      res.send(result);

    });

    app.get("/bookings", async(req, res)=>{

      const cursor = bookingCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    });

    app.get("/services/:id", async(req, res)=>{

      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await servicesCollecrion.findOne(query);
      res.send(result);

    })

    
    app.post("/contacts", async(req, res)=>{


        const contact = req.body;
        console.log("received users: ", contact);
       
        //send data to database
        const result = await contactCollection.insertOne(contact);
        res.send(result);
  
  
      });

      app.post("/services", async (req, res)=>{

        const service = req.body;
        console.log("received service: ", service);
        const result = await servicesCollecrion.insertOne(service);
        res.send(result);
      });

      app.post("/bookings", async (req, res)=>{

        const booking = req.body;
        console.log("received service: ", booking);
        const result = await bookingCollection.insertOne(booking);
        res.send(result);
      });

      app.put("/services/:id", async(req, res)=>{

        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
        const updatedService = req.body;
        const service = {
          $set: {
            serviceName:updatedService.serviceName,
            serviceImg: updatedService.serviceImg, description: updatedService.description,
            price: updatedService.price,
            area: updatedService.area

          }
        }

        const result = await servicesCollecrion.updateOne(filter, service, options);

        res.send(result);

      });

      app.delete(`/services/:id`, async(req, res)=>{

        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await servicesCollecrion.deleteOne(query);
        res.send(result);
    
      })
  
    
    
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


