const { CastError, ValidationError } = require('mongoose').Error;

const bcrypt = require('bcryptjs'); // импортируем bcrypt

const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFound');

const User = require('../models/user');

const { CREATED_201 } = require('../utils/constants');

const getUsers = async (_, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;
  User.findById(currentUserId)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const user = await bcrypt.hash(password, 10).then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }));
    res.status(CREATED_201).send({ data: user });
  } catch (err) {
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(new BadRequestError(`Переданы некорректные данные: ${errorMessage}`));
    }
    if (err.code === 11000) {
      next(new ConflictError('Такой пользователь уже существует в базе данных'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    // Создаем JWT токен
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    // Отправляем токен в куки, браузер автоматически сохранит его
    res
      .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000, // Устанавливаем время жизни куки
        httpOnly: true, // Флаг, указывающий, что куки должны быть доступны только через HTTP(S)
        sameSite: true, // Куки отправляются только если домен запроса совпадает с доменом куки
      })
      .send({ message: 'Успешная аутентификация' });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход из аккаунта' });
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('Пользователя нет в базе');
    }
    res.send({ data: user });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Неверный формат идентификатора пользователя'));
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, updateData, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    });
    if (!user) {
      throw new NotFoundError('Пользователь с указанным ID не найден');
    }
    res.send({ data: user });
  } catch (err) {
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(
        new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${errorMessage}`),
      );
    } else {
      next(err);
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  const updateData = { name, about };
  updateUser(req, res, updateData);
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const updateData = { avatar };
  updateUser(req, res, updateData);
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  logout,
  getUserById,
  updateProfile,
  updateAvatar,
};
