const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users');

const router = express.Router();

router.post(
  '/check_in_internal',
  [check('userId').isMongoId(), check('eventId').isMongoId()],
  usersController.checkInInternal
);

router.post(
  '/check_in_external',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('discordId').notEmpty(),
    check('eventId').isMongoId(),
  ],
  usersController.checkInExternal
);

module.exports = router;
