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
 const bcrypt = require('bcrypt');

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
         required: true,
         trim: true
     },
     datetime: {
         type: Date,
         default: Date.now
     },
     settings: {
        cluster: {
            distance: {
                type: Number,
                default: 40,
                min: 1,
                max: 100
            }
        },
        heatmap: {
            // radius size
            radius: {
                type: Number,
                default: 10,
                min: 1,
                max: 50
            },
            // blur size 
            blur: {
                type: Number,
                default: 15,
                min: 1,
                max: 50
            }
        },
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
        },
        delay: { 
            interval_x0x1: {
                color: {
                    type: String,
                    default: '#8080ff'
                },
                threashold: {
                    type: Number,
                    default: 25
                }
            },
            interval_x1x2: {
                color: {
                    type: String,
                    default: '#3333ff'
                },
                threashold: {
                    type: Number,
                    default: 50
                }
            },
            interval_x2x3: {
                color: {
                    type: String,
                    default: '#0000e6'
                },
                threashold: {
                    type: Number,
                    default: 75
                }
            },
            interval_x3x4: {
                color: {
                    type: String,
                    default: '#000099'
                }
            }
        },        
        throughput: { 
            interval_x0x1: {
                color: {
                    type: String,
                    default: '#9fdf9f'
                },
                threashold: {
                    type: Number,
                    default: 25
                }
            },
            interval_x1x2: {
                color: {
                    type: String,
                    default: '#66cc66'
                },
                threashold: {
                    type: Number,
                    default: 50
                }
            },
            interval_x2x3: {
                color: {
                    type: String,
                    default: '#39ac39'
                },
                threashold: {
                    type: Number,
                    default: 75
                }
            },
            interval_x3x4: {
                color: {
                    type: String,
                    default: '#267326'
                }
            }
        }

    }
 });


 // authenticate input against database
 registrationSchema.statics.authenticate = async function(email, password, callback){
     this.findOne({email:email})
        .exec(function (err,user){           
            if(err){
                return callback(err)
            }else if(!user){                
                var err = new Error('User not found.');
                // err.status(401);
                return callback(err);
            }
            bcrypt.compare(password,user.password, function(err,result){
                if(result===true){
                    return callback(null,user)
                }else{
                    var err = new Error('Wrong password.');
                    return callback(err);
                }
            });
        });
 }

 //hashing a password before saving it to the database
 registrationSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err,hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
    
 });

 module.exports = mongoose.model('Users', registrationSchema);
