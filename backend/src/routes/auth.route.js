import express from 'express'
import { login, logout, onboard, signup } from '../controllers/auth.controller.js'
import { protecteRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/onbording', protecteRoute, onboard)

router.get('/me', protecteRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user })
})

export default router