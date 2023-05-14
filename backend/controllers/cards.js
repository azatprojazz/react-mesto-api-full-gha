const { CastError, ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const Card = require('../models/card');

const {
  CREATED_201,
} = require('../utils/constants');

const getCards = async (_, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    const populatedCard = await card.populate(['owner']);
    res.status(CREATED_201).send({ data: populatedCard });
  } catch (err) {
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(new BadRequestError(`Переданы некорректные данные: ${errorMessage}`));
    } else {
      next(err);
    }
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      next(new NotFoundError('Карточка с таким ID не найдена'));
      return;
    }
    if (req.user._id !== card.owner.toString()) {
      next(new ForbiddenError('Карточку нельзя удалить'));
      return;
    }
    await card.deleteOne();
    res.send({ data: card });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Неверный формат идентификатора карточки'));
    } else {
      next(err);
    }
  }
};

const changeLikeCard = async (req, res, likeData, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.cardId, likeData, {
      new: true,
    }).populate(['owner', 'likes']);

    if (!updatedCard) {
      next(new NotFoundError('Карточка с таким ID не найдена'));
    } else {
      res.json(updatedCard);
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Неверный формат идентификатора карточки или пользователя'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  const likeData = { $addToSet: { likes: req.user._id } };
  changeLikeCard(req, res, likeData, next);
};

const dislikeCard = async (req, res, next) => {
  const likeData = { $pull: { likes: req.user._id } };
  changeLikeCard(req, res, likeData, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
