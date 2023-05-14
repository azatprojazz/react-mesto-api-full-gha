const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFound');
const {
  createUserValidation,
  userLoginValidation,
} = require('../middlewares/validators/UserValidations');

// роуты, не требующие авторизации,
// например, регистрация и логин
router.post('/signup', createUserValidation, createUser);
router.post('/signin', userLoginValidation, login);

router.use('/users', auth, users);
router.use('/cards', auth, cards);

router.get('/signout', auth, logout);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
