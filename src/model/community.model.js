import mongoose, { Schema } from "mongoose";
import {generateID}from "../utils/snowflake.js"

const communitySchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: generateID()
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      owner: {
        type:String,
        required: true,
        ref: 'User',
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: null,
      }

},{timestamps:true})

export const Community = mongoose.model('community',communitySchema)