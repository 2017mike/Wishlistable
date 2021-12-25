const router = require('express').Router()
const { User, List, SavedList } = require('../models')
const passport = require('passport')
//all of these routes require the user to be authenticated
//led with the /api route

//get all lists from all users and all the comments per post
let listDataArray = []
router.get('/savedLists',
  //  passport.authenticate('jwt'),
  (req, res) => SavedList.findAll({

  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err)))

//get all lists from one user
router.get('/savedLists/users', passport.authenticate('jwt'), (req, res) => {
  SavedList.findAll({
    where: { uid: req.user.id }
  })
    .then(savedLists => {
    res.json(savedLists)
    })
      
    .catch(err => console.log(err))
})


//get one list by id
router.get('/savedList/:id',
  // passport.authenticate('jwt'), 
  (req, res) => SavedList.findOne({
    where: { listId: req.params.id }
    , include: [User]
  })
    .then(lists => res.json(lists))
    .catch(err => console.log(err)))

//create list
router.post('/savedLists', passport.authenticate('jwt'), (req, res) => SavedList.create({
  listId: req.body.listId,
  uid: req.user.id
})
  .then(savedList => res.json(savedList))
  .catch(err => console.log(err)))

//update list
// router.put('/lists/:id', passport.authenticate('jwt'), (req, res) => List.update(req.body, { where: { id: req.params.id } })
//   .then(() => res.sendStatus(200))
//   .catch(err => console.log(err)))

// delete SavedList
router.delete('/savedList/:id', passport.authenticate('jwt'), (req, res) => SavedList.destroy({ where: { listId: req.params.id, uid: req.user.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

//export routes
module.exports = router
