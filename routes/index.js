const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./listRoutes.js'))
router.use('/api', require('./itemRoutes.js'))


router.use('/', require('./htmlRoutes'))


module.exports = router


