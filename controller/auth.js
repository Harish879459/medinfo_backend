    const ErrorHandler = require('../utilities/ErrorHandler');
    const User = require('../entity/auth');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
const { response } = require('express');

exports.uploads=async (req, res) => {
    if(req.file===undefined){
         res.status(400).json({success:false});
    }
   const  photo = req.file.filename;
//    console.log(photo);

    User.findByIdAndUpdate({_id:req.params.id},{photo:photo}).then((photo)=>{
        console.log(photo);
        res.status(200).json({success:true});
        //Changed  data:photo was added for api...
    }).catch((ex)=>{
        res.status(501).json({success:false});

    })
   
};


exports.uploadProfileImage=async (req, res) => {
    if(req.file===undefined){
         res.status(400).json({success:false});
    }
   const  photo = req.file.filename;
//    console.log(photo);

    User.findByIdAndUpdate({_id:req.params.id},{photo:photo}).then((photo)=>{
        console.log(photo);
        res.status(200).json({success:true});
    }).catch((ex)=>{
        res.status(501).json({success:false});

    })
   
};


    //User Registration
    exports.register = async (req, res) => {
     
        User.findOne({username: req.body.username})
            .then(async (data) => {
            if (data) {
                res.status(401)
                    .json(
                        {
                            message: "User with such username already exists",
                            success: false});
            }

                    const user = User({fullName:req.body.fullName,email:req.body.email,phone:req.body.phone,password:req.body.password});
                   await user.save().then((data)=>{
                        res.status(200).json({
                            success: true,
                            data: data
                        });
                    })
         
                 })
     }
 

    exports.eraseMe = async (req, res) => {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
           return res.status(404).json({
                success: false
            });
        }
        await user.remove();
        return res.status(200).json({
            success: true,
            count: user.length,
            data: {}
        });
    }

    exports.update=async(req,res)=>{

        await User.findByIdAndUpdate({_id:req.params.id},req.body).then((user)=>{
           return res.status(200).json({success:true,data:user});
        })

    }

    exports.profile=async(req,res)=>{
        await User.findById({_id:req.params.id}).then((user)=>{
            return res.status(200).json({success:true,data:user});
        })
    }


    exports.changePassword = async (req, res) => {
        const {password, newPassword} = req.body;
        const id = req.params.id;

        await User.findOne({_id: id}).then((user) => {
            if (user) {
                if (!password || !newPassword) {
                   return res.status(400).json({message: 'Invalid Request !', success: false});
                } else {
                    bcrypt.compare(password, user.password, (err, ok) => {
                        if (!ok) {
                         return   res.status(401).json({success: false});
                            console.log("zzzzzzzzzzzz");
                        } else {
                            bcrypt.hash(newPassword, 10).then((hash) => {
                                user.newPassword = hash;
                                User.updateOne({_id: id}, {password: user.newPassword}).then((success) => {
                                    if (success) {
                                      return  res.status(200).json({success: true});
                                        
                                    } else {
                                    return    res.status(401).json({success: false});
                                        console.log("err")
                                    }
                                })
                            })
                        }
                    })
                }
            } else {
               return res.status(404).json({message: "No User Found", success: false});
            }

        })
    }


    exports.login = async (req, res) => {
        const {email, password} = req.body;
        await User.findOne({email: email}).then((user) => {
            if (user === null) {
            
                return res.status(201).json({
                    success: false,
                    data: user,
                    message: "Invalid Username! Please Enter Valid Username"
                });
               
            }
            bcrypt.compare(password, user.password, (err, ok) => {
                if (ok === false) {
                   return res.status(201).json({
                        success: false,
                        message: "Invalid Password! Please Enter Valid Password"
                    });
                } else {
                    //Generate WebToken
                    try {
                        const token = jwt.sign({tokenId: user._id}, "pk");
                        console.log('Welcome To Dashboard');
                        return res.status(200).json({success: true, data: user, token: token});
                        
                    } catch (ex) {
                        new ErrorHandler("Error Generating Token" + ex.message);
                    }
                }
            });
        });
    }


    exports.logout = async (req, res) => {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({success: true, message: 'User Logged Out'});
    }















