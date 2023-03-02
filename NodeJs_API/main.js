var express = require('express');
var app = express();
var fs = require("fs");

app.get('/users/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.error(err); 
        }
        
        let allData = JSON.parse(data);
        let user = allData.users.find(u => u.id == req.params.id)
        if (!user) {
            res.status(400);
            res.send("The user with id " + req.params.id + " does not exist.")
        }
        res.end(JSON.stringify(user));
    });
})


app.get('/posts/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }

        var allData = JSON.parse(data);
        let post = allData.posts.find(p => p.id == req.params.id)

        if (!post) {
            res.status(400);
            res.send("The post with id " +  req.params.id + " does not exist.");
        }
        res.end(JSON.stringify(post));
    });
})

app.get('/posts/', function (req, res){

    let startDate = new Date(req.query.DatumOd).toJSON().slice(0, 10);
    //let startDate = start.toISOString().replace('Z', '').replace('T', ' ');;
    let endDate = new Date(req.query.DatumDo).toJSON().slice(0, 10);
    //let endDate = end.toISOString().replace('Z', '').replace('T', ' ');
    
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        let allData = JSON.parse(data);
        let arr = [];  
        if (startDate > endDate) {
            res.status(400);
            res.send("Wrong date range");
        } 

        for (let i = 0; i < allData.posts.length; i++){
            if (allData.posts[i]["last_update"] > startDate && allData.posts[i]["last_update"] < endDate) {
                arr.push(allData.posts[i]);
            }
        }
        res.end(JSON.stringify(arr));
    });
    
})


app.post('/users/:id/', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        let allData = JSON.parse(data);
        let index = allData.users.findIndex(u => u.id == req.params.id)
        if (index === -1) {
            res.status(400);
            res.send("The user with id " + req.params.id + " does not exist");
        }
        
        allData.users[index]["email"] = req.query.noviEmail;
        fs.writeFile("data.json", JSON.stringify(allData), (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Mail has been successfully changed.")
        })
        res.end(JSON.stringify(allData))
    })
})


app.put('/posts', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        
        let allData = JSON.parse(data);

        let postDate = new Date().toJSON().slice(0, 10);
        let postTime = new Date().toJSON().slice(11, 19);
        let postUpdate = postDate + " " + postTime;

        let userFound = allData.users.find(u => u.id == req.query.userId)
        if (!userFound) {
            res.status(400);
            res.send("Error! The user with id " + req.query.userId + " does not exist.")
        }
        else{
            let newPost = {
                "id": allData.posts.length + 1,
                "title": req.query.title, 
                "body": req.query.body,
                "user_id": (+req.query.userId),
                "last_update": postUpdate
            }
            allData.posts.push(newPost);
            fs.writeFile("data.json", JSON.stringify(allData), function(err){
                if (err) {
                    console.log(err);
                }
                console.log("The post has been added")
            })
            res.end(JSON.stringify(allData));
        }
    })
})


app.listen(3000, function() {
    console.log("App listening...");
})