/*
 * ===========================================================================
 * File: Test.js 
 * Author: Antonio Faienza
 * Desc: This file allow to defines the Database Schema. Schemas allow you to 
 * define the fields stored in each document along with their type, validation
 * requirements and default values. 
 * In this case we definie a Test Schema. With this we mean the creation of 
 * the experiment that will be added to Database and subsequently showed into
 * the map
 * ===========================================================================
 */

const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({

    latitude: { 
        type: Number,
        required: true, 
        trim: true 
    },
    longitude: { 
        type: Number,
        required: true, 
        trim: true 
    },    
    metrics: { 
        pdr: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        delay: { 
            type: Number,
            default: 0 
        }, 
        throughput: {
            type: Number,
            default: 0
        }
    },
    name: { 
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    latitudeServer: {
        type: Number,
        required: true,
        trim: true
    },
    longitudeServer: { 
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at' 
});

module.exports = mongoose.model('Experiment', experimentSchema);