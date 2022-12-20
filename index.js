const express = require('express');
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://SweetDreams:Deloitte303@ac-ojuroaf-shard-00-00.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-01.2mzcji7.mongodb.net:27017,ac-ojuroaf-shard-00-02.2mzcji7.mongodb.net:27017/?ssl=true&replicaSet=atlas-femeg7-shard-0&authSource=admin&retryWrites=true&w=majority"
const dbName = "app_menu"
const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true })
const port = process.env.PORT || 8080;
app.use(express.json());
const users = require("./Models/users")

connect.then(() => {
    console.log("Connected correctly to server");

    let pratos = require("./Controllers/menu_do_dia")
    app.use(async function (req, res, next) {
        let login = req.header('Authorization')
        login = login.split(" ")[1]
        let loginDec = Buffer.from(login, 'base64').toString('utf8')
        let [user, password] = loginDec.split(":")
        let userDB = await users.findOne({ "user": user }).sort({ _id: -1 }).limit(1)
            .then((result) => {
                if (result != null) {
                    return result
                } else {
                    res.status(404).send("Nao encontrado")
                }
            })
        if (userDB.password == password) {
            next()
        } else {
            res.status(401).send("Password incorreta")
        }
    })
    app.use(function (req, res, next) {
        console.log("New request has been made " + req.method)
        next()
    })
    app.use("/pratos", pratos)
    app.listen(port, () => console.log("Ratatui inicializado na porta", port))
})
    .catch(err => console.error(err))
