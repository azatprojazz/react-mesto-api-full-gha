const mongoose = require('mongoose');

const { isEmail } = require('validator');

const bcrypt = require('bcryptjs'); // импортируем bcrypt

const UnauthorizedError = require('../errors/Unauthorized');

const { regExp } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'не введен email'],
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: 'Адрес email не соответствует формату',
      },
    },
    password: {
      type: String,
      required: [true, 'не введен пароль'],
      minlength: [6, 'минимальная длина пароля от 6 символов'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'недостаточная длина имени'],
      maxlength: [30, 'длина имени превышает 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'недостаточная длина описания'],
      maxlength: [30, 'длина описания превышает 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator(values) {
          return regExp.test(values);
        },
        message: 'Некорректный URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
