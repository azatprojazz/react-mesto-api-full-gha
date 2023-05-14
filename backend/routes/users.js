const router = require('express').Router();
const {
  userIdValidation,
  userAvatarValidation,
  userUpdateValidation,
} = require('../middlewares/validators/UserValidations');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:id', userIdValidation, getUserById);

router.patch('/me', userUpdateValidation, updateProfile);
router.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = router;
