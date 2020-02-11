const express =  require('express')
const app = express();
const logger = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/Users')
const userRouter = require('./routes/userRoutes')
require('dotenv').config();// to require .env file which has the secret code that no body should see

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('MongoDB Connected');
}).catch(err => console.log(`Mongo Error: ${err}`));

const port = process.env.PORT || 4000;



app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', userRouter)

// app.get('/getAllUsers',(req,res)=>{
//     User.find({}).then(users=> res.json(users));
// });
// WELLL DONE B GOOD WORK 

// app.post('/register',(req,res)=>{
//     return new Promise((resolve,reject)=> {
//         const {name,email,password}=req.body;
//         if(req.body.name.length===0 || req.body.email.length===0|| req.body.password.length ===0){ //checking the input if they put something in
//             return res.json({message: 'All fields must be completed'})
//         }
// //check if user exists
//         User.findOne({email:req.body.email})
//         .then(user=>{
//             if(user){
//                 return res.status(403).json({message:'User already exists'})
//             }
//     const newUser = new User();
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password,salt);

//     newUser.name=req.body.name;
//     newUser.email=req.body.email;
//     newUser.password=hash; 

//     newUser
//     .save()
//     .then((user)=> {
// res.status(200).json({message: 'user created',user})
//     })
//     .catch(err=> {
//         reject(err);
//     });
//         });
//     });
// });


// // app.post(('/',(req,res) => {
// // return new Promise((resolve,reject) => {
// //     user.findOne({email:req.body.email})
// //     .then(user => {
// //         const passwordMatch = user.password === req.body.password ? true : false;
// //         if(!passwordMatch){
// //             return res.status(400).json({message: 'incorrect email or password'});
// //         } else {
// //             res.status(200).json({message:`you are logged in ${user.email}`});
// //             resolve(user)
// //         }
        
// //     }).catch(err=>reject(err));
// // })
// // })

// app.post('/login', (req,res) => {
//     return new Promise((resolve,reject) => {
//         User.findOne({email:req.body.email})
//         .then((user) => {
//             bcrypt.compare(req.body.password, user.password)
//             .then((user) => {
//                 return res.send(user=== true ? 'you are logged in' : 'incorrect credentials');
//             }).catch(err=>{
//                 return res.status(500).json({message:'server error', err})
//             })
//             // const passwordMatch = user.password === req.body.password ? true : false;
//             // if (!passwordMatch) {
//             //     return res.status(400).json({message: 'Incorrect email or password'});
//             // } else {
//             //     res.status(200).json({message: `You are now logged in ${user.email}`});
//             //     resolve(user);
//             // }
//         })
//         .catch(err => reject(err));
//     });
// });

// app.put('/update/:id',(req,res)=>{
//     return new Promise((resolve,reject)=> {
//         User.findById({_id: req.params.id})
//         .then((user) => {
//     const { name,email } = req.body;

//     user.name = req.body.name ? req.body.ame : user.name
//     user.email = req.body.email ? req.body.email : user.email;

//     user.save()
//     .then((user) => {
//         return res.status(200).json({message: 'user updated', user})
//     }).catch(err=> reject(err))
//         }).catch(err=> res.status(500).json({message: 'server error', err}))
//     })
// });

// app.delete('/delete/:id', (req,res) => {
//     try {
//     return new Promise((resolve,reject) => {
//         User.findByIdAndDelete({_id:req.params.id})
//         .then((user) => {
//             return res.status(200).json({message: 'user deleted', user })
//         }).catch(err=> res.status(400).json({message: 'no user to delete'}));
//     });
// }catch (error) {
//     return res.status(500).json({message: 'server error'})
// }
// });



app.listen(4000, () => {
    console.log(`Listening on port ${port}`)
});