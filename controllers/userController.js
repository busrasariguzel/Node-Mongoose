const User = require('../models/Users')
const bcrypt = require('bcryptjs')




module.exports = {
    getAllUsers : (req,res) => {
        User.find({}).then(users=> res.json(users));
    },
    register : (req,res) => {
        return new Promise((resolve,reject)=> {
            const {name,email,password}=req.body;
            if(req.body.name.length===0 || req.body.email.length===0|| req.body.password.length ===0){ //checking the input if they put something in
                return res.json({message: 'All fields must be completed'})
            }
            User.findOne({email:req.body.email})
            .then(user=>{
                if(user){
                    return res.status(403).json({message:'User already exists'})
                }
        const newUser = new User();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
    
        newUser.name=req.body.name;
        newUser.email=req.body.email;
        newUser.password=hash; 
    
        newUser
        .save()
        .then((user)=> {
    res.status(200).json({message: 'user created',user})
        })
        .catch(err=> {
            reject(err);
        });
            });
        });
    
    },
    login : (req,res) => {
        return new Promise((resolve,reject) => {
            User.findOne({email:req.body.email})
            .then((user) => {
                bcrypt.compare(req.body.password, user.password)
                .then((user) => {
                    return res.send(user=== true ? 'you are logged in' : 'incorrect credentials');
                }).catch(err=>{
                    return res.status(500).json({message:'server error', err})
                })
            })
            .catch(err => reject(err));
        });
    },
    updateProfile : (req,res) => {
        return new Promise((resolve,reject)=> {
            User.findById({_id: req.params.id})
            .then((user) => {
        const { name , email } = req.body;
    
        user.name = name ? name : user.name
        user.email = email ? email : user.email;
    
        user.save()
        .then((user) => {
            return res.status(200).json({message: 'user updated', user})
        }).catch(err=> reject(err))
            }).catch(err=> res.status(500).json({message: 'server error', err}))
        })
    },
    deleteProfile: (req,res) => {
        try {
            return new Promise((resolve,reject) => {
                User.findByIdAndDelete({_id:req.params.id})
                .then((user) => {
                    return res.status(200).json({message: 'user deleted', user })
                }).catch(err=> res.status(400).json({message: 'no user to delete'}));
            });
        }catch (error) {
            return res.status(500).json({message: 'server error'})
        }
    }

}