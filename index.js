const express = require ('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x6hwmbl.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const classCollection = client.db('fitWithRahat').collection('classes');

        app.get('/classes', async(req, res)=>{
            const query ={};
            const cursor = classCollection.find(query);
            const classes = await cursor.toArray()
            res.send(classes);
        });

        app.get('/classes/:id', async (req, res) =>{
            const id =  req.params.id;
            const query = {_id: ObjectId(id) };
            const classe = await classCollection.findOne(query);
            res.send(classe);
        })
        

    }
    finally{

    }



}

run().catch(err => console.error(err));





app.get('/', (req, res)=>{
    res.send('fit with Rahat server is running')
    
})

app.listen(port, ()=>{
    console.log(`Fit with rahat server running on ${port}`)
})

