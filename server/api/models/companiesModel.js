'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompaniesSchema = new Schema({
  id: {
    type: Number,
    required: 'Kindly enter the ID OF the company'
  },
  name: {
    type: String,
    required: 'Kindly enter the name of the company'
  },
  locations: {
    id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  employees: {
    id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }
    ],
    default: ['pending']
  }
})

module.exports = mongoose.model('Companies', CompaniesSchema)
