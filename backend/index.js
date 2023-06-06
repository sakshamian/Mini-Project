const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const http = require('http');

const server = http.Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

const users=[{
        "name": "Saksham",
        "password": "Indiana"
    },{
        "name": "Wysa",
        "password": "12345"
    }
]

const data = [ 
    "I am Wysa- an AI Chatbot built by therapists", 
    "I am here to understand your concerns and connect you with best resources available", 
    "Can I help?"
];

io.on("connection", (socket) => {

    data.forEach((ele, ind) => {
        setTimeout(()=> {
            socket.emit("Hello", ele);
        }, ind*1000);
    });
});

app.use(express.json());
app.use(require("cors")());

app.get('/users', (req,res)=> {
    res.json(users);
});

app.post('/users', async (req,res)=> {
    try{
        const { name, password } = req.body;
        const hashedPassword=await bcrypt.hash(password, 10);
        const user = { name, hashedPassword };
        users.push(user);
        res.status(201).json({user});
    } catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
});

app.post('/users/login', async(req,res) => {
    const { name, password } = req.body;
    const user=users.find(user => user.name === name);
    if(user === null){ 
        return res.status(400).json({error: "User not found"});
    }
    console.log(user);
    try{
        // const passCheck = await bcrypt.compare(password, user.password);
        if(password === user.password){
            return res.status(200).json({ status:"success", user });
        } else{
            return res.status(400).json({ error: "Password does not match" });
        }
    } catch(err){
        console.log(err);
        return res.status(500).json({error: err.message});
    }
});

server.listen(8000);


