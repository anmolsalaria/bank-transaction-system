const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim: true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Email is invalid"],
        unique:[true,"email already registered"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating user"],
    },
    password:{
        type:String,
        required:[true,"Password required"],
        trim:true,
        minlength:[8,"password must be more than 8 chars"],
        select :false
    }
},{
    timestamps: true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
    
    return next()
})


userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}