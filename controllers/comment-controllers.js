const mongoose = require("mongoose");

const User = require("../models/user");
const Place = require("../models/place");
const Comment = require("../models/comment");
const HttpError = require("../models/http-error");

// ----------------GET COMMENT with PLACE ID --------------------

const getCommentsByPlaceId = async (req, res, next) => {
  const placeId = req.params.pid;

  let placeWithComment;
  try {
    placeWithComment = await Place.findById(placeId).populate("comments");
  } catch (err) {
    const error = new HttpError(
      "Fetching comments failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!placeWithComment) {
    const error = new HttpError(
      "Could not find comment for provided place id.",
      404
    );
    return next(error);
  }

  res.json({
    comments: placeWithComment.comments.map((comment) => {
      comment.toObject({ getters: true });
    }),
  });
};

// ---------------------CREATE COMMENT ----------------------

const createComment = async (req, res, next) => {
  const { title, description } = req.body;

  const createdComment = new Comment({
    title,
    description,
    place: req.UserData.placeId,
    creator: req.UserData.userId,
  });

  let user;
  try {
    user = await User.findById(req.UserData.userId);
  } catch (err) {
    const error = new HttpError(
      "Creating comment failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdComment.save({ session: sess });
    user.comments.push(createdComment);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ comment: createdComment });
};

exports.getCommentsByPlaceId = getCommentsByPlaceId;
exports.createComment = createComment;
