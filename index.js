/*const http = require("http")

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    //res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>");
    res.end("</assets/mango.png'>");
});

server.listen(5000, () => console.log("App running on port 5000"))

const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/penguins", (req, res) => {
    
    res.send("Here are the penguins")
    
})

app.get("/penguins/:name", (req, res) => {
    res.send(req.params.name)
})

app.listen(port, () => console.log(`App running on port ${port}`))
*/
require('dotenv').config();
const express = require("express");
const fruits = require('./fruits.js');
const cors = require("cors");

const app = express();
const port = process.env.port;

app.use(cors());
app.use("/fruits", express.json());

app.get("/fruits", (req, res) => {
    
    res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
    //res.send(`Return a fruit with name ${req.params.name}`);
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
    if (fruit === undefined) {
        res.status(404).send("The fruit doesn't exist");
    } else {
        res.send(fruit);
        return true;
    }
});

let maxId = fruits.reduce(
    (max, fruit) => (fruit.id > max ? fruit.id : max),
    fruits[0].id
);

app.post("/fruits", (req, res) => {
    console.log("entered")
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if (fruit == undefined){
        maxId += 1
        req.body.id = maxId
        
        //writing to fruits file
        fruits.push(req.body)
        //alerting user
        res.status(201).send(req.body)
        
    } else {
        res.status(409).send("This fruit already exists");
    }
    
});

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);
    if (fruitIndex == -1){
        res.status(404).send("Fruit doesn't exist")
    } else {
        fruits.splice(fruitIndex, 1);
        res.sendStatus(204);
    }
    
})



app.put("/")
app.listen(port, () => console.log(`App running on port ${port}`));



// how to prevent duplicated fruit
//how to create unique id for new fruit
//access fruits js and delete