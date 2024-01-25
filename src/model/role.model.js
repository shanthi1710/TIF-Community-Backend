import mongoose, { Schema }from "mongoose";
import {generateID}from "../utils/snowflake.js"

const roleSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: generateID()
      },
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
},{timestamps:true})

export const Role = mongoose.model('Role',roleSchema);