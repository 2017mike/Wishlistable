const router = require('express').Router()
const { User, List, Item } = require('../models')
const passport = require('passport')
//all of these routes require the user to be authenticated
//led with the /api route

//get all lists from all users and all the comments per post
router.get('/lists',
  //  passport.authenticate('jwt'),
  (req, res) => List.findAll({

  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err)))

//get all lists from one user
router.get('/lists/users', passport.authenticate('jwt'), (req, res) => {
  List.findAll({
    where: { uid: req.user.id },
    // include: [User, Comment]
  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err))
})

//get one list by id
router.get('/list/:id',
  // passport.authenticate('jwt'), 
  (req, res) => List.findOne({
    where: { randomURL: req.params.id }
    , include: [User]
  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err)))

//create list
router.post('/lists', passport.authenticate('jwt'), (req, res) => List.create({
  title: req.body.title,
  randomURL: req.body.randomURL,
  uid: req.user.id
})
  .then(list => res.json(list))
  .catch(err => console.log(err)))

//update list
router.put('/lists/:id', passport.authenticate('jwt'), (req, res) => List.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

//delete post
router.delete('/lists/:id', passport.authenticate('jwt'), (req, res) => List.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

//export routes
module.exports = router
