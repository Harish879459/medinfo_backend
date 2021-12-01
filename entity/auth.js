    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const UserSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: [true, "Enter Fullname"]
        },
        email: {
            type: String,
            required: [true, "Enter Email"],
            unique: true,
            minlength: 5
        },
        password: {
            type: String,
            required: [true, "Enter Password"],
            minlength: 5
        },
        phone: {
            type: String,
            required: [true, "Enter Phone Number"],
            unique: true
        },
        photo:{
            type:String,
            required:false
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
        
    });

    UserSchema.pre("save", async function (next) {
        let user = this;

        await bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            next();
        })
            .catch(error => {
                console.log(`Error in hashing password: ${error.message}`);
                next(error);
            });
    });


    // UserSchema.methods.matchPassword = async function (password) {
    //     let user = this;
    //     return await bcrypt.compare(password, user.password);
    // }

    module.exports = mongoose.model("User", UserSchema);

