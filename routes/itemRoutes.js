const router = require('express').Router()
const { Item } = require('../models')
const passport = require('passport')
//all of these routes require the user to be authenticated

//get items array
router.get('/items', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.items)
})

//create item (need post id and user id)
router.post('/items', passport.authenticate('jwt'), (req, res) => Item.create({
  description: req.body.description,
  link: req.body.link,
  isDone: false,
  uid: req.user.id,
  lid: req.body.lid
})
  .then(post => res.json(post))
  .catch(err => console.log(err)))


module.exports = router