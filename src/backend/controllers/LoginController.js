const express = require("express");
const router = express.Router();
const {UserService} = require('../services/UserService')


module.exports = {

    login:async function(req,res)
    {
        var user = await UserService.findUserByMail(req.body.email);
        if (!user) {
            return res.status(404).json({message: 'user not found'});
        }
        // Return a success status or data if login is successful
        return res.status(200).json({ message: 'Login successful', user: user });
    }

}

