import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    }
})

export default mongoose.model("Usuario", usuariosSchema);