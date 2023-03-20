var express = require('express');
var app = express();
var fs = require('fs');
let cors = require('cors')
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());

//get posts
app.get('/posts/', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        let allData = JSON.parse(data);
        let posts = allData.posts;
        res.send(posts);
    });
})

//get user
app.get('/users/', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        let allData = JSON.parse(data);
        let posts = allData.users;
        res.send(posts);
    });
})


//edit user
app.post('/users/:id/', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }

        let allData = JSON.parse(data);
        let user = allData.users.find(u => u.id == req.params.id);
        let index = allData.users.indexOf(user);
        
        if (index === -1) {
            res.status(404);
            res.send("The user with id " + req.params.id + " does not exist");
        }

        allData.users[index]["name"] = req.body.name;
        allData.users[index]["email"] = req.body.email;
        fs.writeFile("data.json", JSON.stringify(allData), (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.send(allData);
    })
})


//add user
app.put('/users', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
      
        let allData = JSON.parse(data);
        let user = allData.users.find(u => u.email == req.query.email);
        let index = allData.users.indexOf(user);
        
        if (index !== -1) {
            res.status(404);
            
        }
        else {
            let newUser = {
                "id": allData.users.length + 1,
                "name": req.query.name, 
                "email": req.query.email
            }
            allData.users.push(newUser);
            //console.log(newUser);
            fs.writeFile("data.json", JSON.stringify(allData), function(err){
                if (err) {
                    console.log(err);
                }
            })
            res.send(newUser);
        }
    })

})

//get user by id
app.get('/users/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.error(err); 
        }
        
        let allData = JSON.parse(data);
        let user = allData.users.find(u => u.id == req.params.id)
        if (!user) {
            res.status(404);
            res.send("User with id " + req.params.id + " does not exist.")

        }
        res.end(JSON.stringify(user));
    });
})



app.listen(3000, function() {
    console.log("App listening...");
})