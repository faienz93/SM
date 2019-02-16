/*
 * ===========================================================================
 * File: Users.js 
 * Author: Antonio Faienza
 * Desc: This file allow to defines the Database Schema. Schemas allow you to 
 * define the fields stored in each document along with their type, validation
 * requirements and default values. 
 * ===========================================================================
 */

 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
     username: {
         type: String,
         unique: true,
         required: true,
         trim: true
     },
     email: {
         type: String,
         unique: true,
         required: true,
         trim: true
     },
     password: {
         type: String,
         trim: true
     },
     datetime: {
         type: Date,
         default: Date.now
     },
     settings: {
        pdr: { 
            interval_x0x1: {
                color: {
                    type: String,
                    default: '#ff8080'
                },
                threashold: {
                    type: Number,
                    default: 25
                }
            },
            interval_x1x2: {
                color: {
                    type: String,
                    default: '#ff3333'
                },
                threashold: {
                    type: Number,
                    default: 50
                }
            },
            interval_x2x3: {
                color: {
                    type: String,
                    default: '#e60000'
                },
                threashold: {
                    type: Number,
                    default: 75
                }
            },
            interval_x3x4: {
                color: {
                    type: String,
                    default: '#990000'
                }
            }
        }        
    }
 });

 module.exports = mongoose.model('Users', userSchema);

