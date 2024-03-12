const mongoose = require('mongoose');
const {MongoClient, ObjectId } = require("mongodb");
const {DbManager} = require("../db/DbManager");
const { dbObj } = require('../db/DbGlobal');





const userScema = new mongoose.Schema({
    name: String,
    qouta: Number,
    email: String
});



const UserModel = mongoose.model('User', userScema);

class UserService {



    static async saveUser(name, score) {
        try {

            const newUser = UserModel({name, score,email});
            const savedUser = await newUser.save();
            console.log('User saved:', savedUser);
        } catch (error) {
            console.error('Error saving user:', error.message);
        }
    }


    static async findUserByMail(email) {
        try {

            const collection = dbObj().collection('user');
            const user = await collection.findOne({ email: email });
            if(user) {
                const groupList = await UserService.handleUserPermission(user.name,user.permissionsGroupId);
                user.groupList = groupList;
            }
            return user

        } catch (error) {
            console.error('Error finding user:', error.message);
        }
    }

    static async handleUserPermission(name, permissionsGroupIds)  {
        let userPermissionsList = [];
        try {
            const permissionGroup = dbObj().collection('PermissionGroup');
            for(const permission of  permissionsGroupIds) {
                let res = await permissionGroup.findOne({_id:new ObjectId(permission)});
                userPermissionsList = userPermissionsList.concat(res?.groupList);
            }
        } catch (error) {
            console.error(`Error fetching/setting permission for user ${name}  error : ${error.message}`);
        }
             return userPermissionsList;
    }
}
module.exports = {UserService: UserService};