const express = require("express");
const router = express.Router();
const {UserService} = require("../services/UserService");




module.exports = {

    getUser:async function(req, res)
    {
        const users = await UserService.findUserByMail(req.body);
        console.log(users);
        res.json(users);
        return res.status(200);
    }
}

