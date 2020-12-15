const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  family: { type: String, required: false },
  breed: { type: String, required: false },
  food: { type: String, required: false }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
