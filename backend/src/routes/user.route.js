import express from 'express'
import { protecteRoute } from '../middleware/auth.middleware.js'
import { acceptFriendRequest, getFriendRequests, getMyFriends, getRecommendedUsers, sendFriendRequest, getOutgoingRequests } from '../controllers/user.controller.js'

const router = express.Router()

router.use(protecteRoute)

router.get('/', getRecommendedUsers)
router.get('/friends', getMyFriends)

router.post('/friend-request/:id', sendFriendRequest)
router.put('/friend-request/:id/accept', acceptFriendRequest)

router.get('/friend-requests', getFriendRequests)
router.get('/outgoing-friend-requests', getOutgoingRequests)

export default router