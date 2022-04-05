const HttpError = require('../models/http-error');
const Event = require('../models/event');
const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.checkInInternal = async (req, res, next) => {
  const errors = validationResult(req);
  const { userId, eventId } = req.body;

  if (!errors.isEmpty())
    return next(new HttpError('Invalid inputs, please check your data.', 422));

  let user, event;

  try {
    user = await User.findById(userId);
    event = await Event.findById(eventId);
  } catch (error) {
    return next(new HttpError('Could not check in'));
  }

  if (!user || !event)
    return next(new HttpError('Could not check you in', 422));

  let addedEvent, addedUser;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    addedEvent = user.events.addToSet(eventId);
    addedUser = event.users.addToSet(userId);
    await user.save({ session });
    await event.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError('Could not check you in'));
  }

  res.status(200).json({
    message:
      addedUser?.length > 0 && addedEvent?.length > 0
        ? 'Successfully checked in.'
        : 'Already checked in.',
  });
};

exports.checkInExternal = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  const { name, email, discordId, eventId } = req.body;

  if (!errors.isEmpty())
    return next(new HttpError('Invalid inputs, please check your data.', 422));

  let user, event;

  try {
    user = await User.findOne({ email: email });
    event = await Event.findById(eventId);
  } catch (error) {
    return next(new HttpError('Could not check in'));
  }

  if (!event) return next(new HttpError('Could not check you in', 422));

  let addedUser, addedEvent;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    if (user) {
      addedEvent = user.events.addToSet(eventId);
      addedUser = event.users.addToSet(user.id);
      await user.save({ session });
    } else {
      const newUser = new User({ name, email, discordId, events: [] });
      addedEvent = newUser.events.addToSet(eventId);
      addedUser = event.users.addToSet(newUser.id);
      await newUser.save({ session });
    }
    await event.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new HttpError('Could not check you in'));
  }

  res.status(200).json({
    message:
      addedUser?.length > 0 && addedEvent?.length > 0
        ? 'Successfully checked in.'
        : 'Already checked in.',
  });
};
