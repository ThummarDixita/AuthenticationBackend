const User = require("../Model/User");
const jwt = require("jsonwebtoken")


// Get All Product

const secretPage = async (req, res) => {
 console.log("tokennn",req.cookies.jwtToken);
    res.send("this is my secretpage")
}

const all_Data = async (req,res) =>{
    try {
        const users = await User.find();
        console.log("users", users);
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
}

const user_get = async (req, res,) => {
    try {
        const users = await User.find();
        console.log("users", users);
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
}

const user_logout = async (req, res,) => {
    try {
        const users = await User.find();
        res.clearCookie(`jwToken`);
        console.log("users", users);
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
}


// const userLogin_get = async (req, res,) => {
//     // try{
//     //     const user = await User.find();
//     //     console.log("resssss",user[0].tokens[0].token);
//     //     const data= user[0].tokens[0].token
//     //     console.log("dataaa",data);
//     //     res.cookie(`jwt`,data,{
//     //         maxAge: 5000,
//     //         // expires works the same as the maxAge
//     //         expires: new Date('01 12 2021'),
//     //         secure: true,
//     //         httpOnly: true,
//     //         sameSite: 'lax'
//     //     });
//     //     res.send({message:"Data Get",user:user})

//     // } catch (error){
//     //     res.json({message:error})
//     // }
//     // console.log("this is the secret cookie",req.cookies.jwt);
// }

const user_create = async (req, res) => {
    console.log("ressssss", res);
    const { name, email, password } = req.body
    User.findOne({ email: email }, async (err, user) => {

        if (user) {
            res.send({ message: "User Allready Registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered", user: user })
                }
            })
            console.log("tokenuserrrre", user);
        }
    })


}

// Update  Product
const user_update = async (req, res) => {
    console.log("reqq", req.body);
    console.log("iddd", req.params);
    const user = {
        password: req.body.password
    }
    console.log("userrrrrr", user);

    const updateUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        user
    );

    console.log("updateUserupdateUserupdateUser", updateUser);

    res.send({ message: "password reset successfully", user: updateUser })

}
// Login
// const usr_login = async (req, res) => {
//     const users = await User.find({ email: req.body.email})

//     console.log("users",users);


//     const login_user = {
//       email: req.body.email
//     }
//     console.log("login_user",login_user);

//     try {
//       const token = jwt.sign(
//         { user_id: users._id, email: login_user.email },
//         process.env.SECRET_KEY,
//         {
//           expiresIn: "2h",
//         }
//       );

//       console.log("++++++++++users", token);
//       // save user token
//       users[0].token = token;
//     //   let update_user =  {
//     //     user_name: users[0].user_name,
//     //     email: users[0].email,
//     //     photo: users[0].photo,
//     //     mobile_number: users[0].mobile_number,
//     //     token: users[0].token,
//     // }
//     //   // await user_update(update_user)
//     //   await axios.put(`http://localhost:${process.env.PORT}/register/${users[0]._id}`, update_user);
//     //   console.log("++++++++++users", users);
//       res.cookie(`jwToken`, token);
//       res.send({ message: "Login Successfully", user: users })

//       // user
//       // res.status(200).json(users);

//     } catch (error) {
//       console.log("error", error);

//     }

//   }

const user_login = async (req, res) => {

    const { email, password } = req.body
    User.findOne({ email: email }, async (err, users) => {
        const login_user = {
            email: req.body.email
        }
        if (users) {
            if (password === users.password) {
                const token = jwt.sign(
                    { user_id: users._id, email: login_user.email },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                console.log("++++++++++users", token);
                console.log("usersssss", users);
                users.token = token;
                res.cookie(`jwToken`, token);

                res.send({ message: "Login Successfully", user: users })

            } else {
                res.send({ message: "Password did't match" })
            }
        } else {
            res.send({ message: "User not Registerd" })
        }
    })

}


// }
// Delete  Product
// const product_delete = async (req, res) => {
//     try{
//         const removeproduct = await Product.findByIdAndDelete(req.params.productId)
//         res.json(removeproduct);
//     } catch (error) {
//             res.json({message:error})
//     }
// }

module.exports = {
    user_create,
    user_update,
    user_login,
    secretPage,
    user_get,
    user_logout,
    all_Data

}