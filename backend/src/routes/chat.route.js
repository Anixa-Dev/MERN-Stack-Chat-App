import express from 'express'
import { protecteRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/token',protecteRoute, getStreamToken)

export default router;