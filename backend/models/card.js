const mongoose = require('mongoose');
const { regExp } = require('../utils/constants');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'нет имени'],
      minlength: [2, 'недостаточная длина имени'],
      maxlength: [30, 'длина имени превышает 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'нет ссылки'],
      validate: {
        validator(value) {
          return regExp.test(value);
        },
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: [true, 'напишите имя пользователя'],
    },
    likes: {
      type: [ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
