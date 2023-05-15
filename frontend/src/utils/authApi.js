class AuthApi {
  // Конструктор принимает объект с параметрами и устанавливает базовый URL для API
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Обрабатывает ответ сервера, возвращает JSON или ошибку
  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Выполняет запрос к API с указанными параметрами
  async _fetch(url, options = {}) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    return this._response(res);
  }

  // Регистрирует нового пользователя с указанными email и паролем
  registerUser(email, password) {
    return this._fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Авторизует пользователя с указанными email и паролем
  loginUser(email, password) {
    return this._fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  logoutUser() {
    return this._fetch('/signout', {
      method: 'POST',
    });
  }

  // Проверяет валидность токена и возвращает данные пользователя
  validateToken() {
    return this._fetch('/users/me', {
      method: 'GET',
    });
  }
}

// Экспортирует экземпляр класса AuthApi с заданным базовым URL
export const authApi = new AuthApi({
  baseUrl: 'https://api.mesto.azatprojazz.nomoredomains.monster',
});
