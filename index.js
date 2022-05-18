// const express = require("express")
// const cors = require("cors")
// const mongoose = require("mongoose")


// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

// mongoose.connect("mongodb://localhost:27017/myAuthentication", {
//     useNewUrlParser: true,
//     useUNifiedTopology: true
// }, () => {
//     console.log("connected to DB");
// })

// const usercontroller =require ("./routes/user")
// app.use("/api/users",usercontroller)
// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     email: String,
// //     password: String,
// // })

// // const User = new mongoose.model("User", userSchema)
// // // Routes
// // app.post("/login", (req, res) => {
// //     const { email, password } = req.body
// //     User.findOne({ email: email }, (err, user) => {
// //         if (user) {
// //             if (password === user.password) {
// //                 res.send({ message: "Login Successfully", user: user })
// //             } else {
// //                 res.send({ message: "Password did't match" })
// //             }
// //         } else {
// //             res.send({ message: "User not Registerd" })
// //         }
// //     })
// // })
// // app.put(`/register/:id`, async (req, res) => {
//     // console.log("reqq", req.body);
//     // console.log("iddd", req.params);
//     // const user = {
//     //     password: req.body.password
//     // }
//     // console.log("userrrrrr", user);

//     //     const updateUser = await User.findByIdAndUpdate(
//     //         { _id: req.params.id },
//     //         user
//     //     );
//     //     console.log("updateUserupdateUserupdateUser", updateUser);

//     //         res.send({ message: "password reset successfully",user:updateUser})




// // })
// // app.post("/register", (req, res) => {
// //     const { name, email, password } = req.body
// //     User.findOne({ email: email }, (err, user) => {
// //         if (user) {
// //             res.send({ message: "User Allready Registerd" })
// //         } else {
// //             const user = new User({
// //                 name,
// //                 email,
// //                 password
// //             })
// //             user.save(err => {
// //                 if (err) {
// //                     res.send(err)
// //                 } else {
// //                     res.send({ message: "Successfully Registered" })
// //                 }
// //             })
// //         }
// //     })

// // })

// app.listen(8000, () => {
//     console.log("BE Started To Port 8000!");
// })

const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const cors = require("cors")
const cokkieParser = require("cookie-parser")
const dotenv = require("dotenv")

const app = express();

app.use(express.json({ extended: true }))
app.use(cors())
dotenv.config()
app.use(cokkieParser());
app.use(express.urlencoded({ extended: true }))



mongoose.connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUNifiedTopology: true
}, () => {
    console.log("connected to DB");
})

// import routes
const userRoutes = require("./routes/user")

// route middelware

app.use("/", userRoutes)

// const createToken = async() =>{
//     const token= await jwt.sign({_id:"6225a04fb2ae049ab7783da1"},"abcdefghiklmnopqrstuvwxyz",{
//         expiresIn:"2 seconds"
//     })
//     console.log("tokentokentoken",token);

//     const userVerify = await jwt.verify(token,"abcdefghiklmnopqrstuvwxyz")
//     console.log("userVerifyuserVerify",userVerify);
// }

// createToken()

app.listen(process.env.PORT, () => console.log("Server running on port 8000"))
