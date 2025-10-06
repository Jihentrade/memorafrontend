const route = require('express').Router()

const { isAuth } = require('../middlewares/isAuth')
const auth = require('../controllers/auth.js')

route.post('/login', auth.login)
route.post('/logout', auth.logout)
// route.get('/current', isAuth, auth.getAuthUser)
module.exports = route
