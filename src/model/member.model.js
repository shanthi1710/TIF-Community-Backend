import mongoose, { Schema }from "mongoose";
import {generateID}from "../utils/snowflake.js"

const memberSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: generateID()
      },
      community: {
        type:   String,
        required: true,
        ref: 'Community',
      },
      user: {
        type: String,
        required: true,
        ref: 'User',
      },
      role: {
        type:String,
        required: true,
        ref: 'Role',
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
},{timestamps:true})

export const Member =mongoose.model('Member',memberSchema)