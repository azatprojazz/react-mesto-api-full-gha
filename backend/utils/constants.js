const http2 = require('http2');

const {
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_UNAUTHORIZED: UNAUTHORIZED_401,
  HTTP_STATUS_FORBIDDEN: FORBIDDEN_403,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_500,
  HTTP_STATUS_CONFLICT: CONFLICT_409,
} = http2.constants;

const regExp = /^(https?|ftp):\/\/([a-zA-Z0-9_-]+(?:(?:\.[a-zA-Z0-9_-]+)+))(:[0-9]{1,5})?(\/[^\s]*)?$/m;

module.exports = {
  CREATED_201,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
  regExp,
};
