const ClothingItem = require('../models/clothingItem');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body || {};

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data'));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError('Item not found');
  })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You cannot delete someone else's item");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
      .then((deletedItem) => res.status(200).send(deletedItem))
      .catch((err) => {
        if (err.name === 'CastError') {
          return next(new BadRequestError('Invalid item id'));
        }
        return next(err);
      });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item id'));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
