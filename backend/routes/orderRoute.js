import express from 'express';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.post('/verify', verifyOrder);
router.post('/userorders', authMiddleware, userOrders);
router.get('/list', adminMiddleware, listOrders); // maybe only for admin
router.post('/status', authMiddleware, updateStatus);

export default router;
