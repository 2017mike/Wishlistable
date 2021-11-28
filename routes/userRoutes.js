const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')



router.get('/users', (req, res) => {
  User.findAll({
    // include: [User]
  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err))
})



router.post('/users/register', (req, res) => {
  const {
    username
    // any other properties you need
  } = req.body

  User.register(new User({
    username
    // any other properties you need
  }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

module.exports = router
