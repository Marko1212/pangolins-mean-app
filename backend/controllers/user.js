const bcrypt = require('bcrypt')

const User = require('../models/User')

exports.signup = (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        age: req.body.age,
        family: req.body.family,
        breed: req.body.breed,
        food: req.body.food
      })
      user.save()
        .then(() => res.status(201).json({ message: 'User saved !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}
