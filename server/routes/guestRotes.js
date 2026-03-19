const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.get('/', guestController.listGuests);
router.post('/checkin', guestController.checkIn);

module.exports = router;