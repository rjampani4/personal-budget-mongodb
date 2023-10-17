const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
//const budget= require('./server.json')
const mongoose=require('mongoose')
const budgetSchema=require('./models/Budget_Schema')
let url='mongodb://127.0.0.1:27017/personal-budget'
app.use(bodyParser.json());
app.use('/',express.static('public'));
app.get('/intro', (req, res) => {
    res.send("Hello world");
});
app.get('/budget', (req, res) => {
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>{
            console.log("Connected to Db")
            budgetSchema.find({})
                        .then((data)=>{
                            res.json(data)
                            mongoose.connection.close()
                        })
                        .catch((conerr)=>{
                            console.log(conerr)
                        })
                    })
        .catch((conerr)=>{
                        console.log(conerr)
                    })
});

app.post('/updatebudget',(req,res)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>{
            console.log("Connected to Db",req.body)
            const newdata=req.body
            budgetSchema.insertMany(newdata)
            .then((data)=>{
                console.log(data)
                res.status(200).json({ message: 'Data updated successfully', data: data });
                mongoose.connection.close()
            })
            .catch((conerr)=>{
                console.log(conerr)
                res.status(500).json({ message: 'Internal server error' });
            })
      
})
        .catch((conerr)=>{
                        console.log(conerr)
                    })
})


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});