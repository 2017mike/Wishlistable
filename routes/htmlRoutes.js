const router = require('express').Router()
const { rest } = require('lodash')
const passport = require('passport')
const { join } = require('path')

router.get('/home', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})


router.get('/list/:id', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'viewList.html'))
})

router.get('/makeList', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'makeList.html'))
})

router.get('/register', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'register.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'login.html'))
})


module.exports = router

