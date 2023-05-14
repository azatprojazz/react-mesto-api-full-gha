class Api {
  // Конструктор принимает объект с параметрами и устанавливает базовый URL и заголовки для API
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Обрабатывает ответ сервера, возвращает JSON или ошибку
  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Выполняет запрос к API с указанными параметрами
  async _fetch(url, options = {}) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      ...options,
      headers: this._headers,
    });
    return this._response(res);
  }

  // Получает информацию о пользователе
  getUserInfo() {
    return this._fetch('/users/me');
  }

  // Обновляет информацию о пользователе (имя и описание)
  editUserInfo({ name, about }) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  // Получает начальные карточки
  getInitialCards() {
    return this._fetch('/cards');
  }

  // Добавляет новую карточку с указанными названием и ссылкой на изображение
  addNewCard({ name, link }) {
    return this._fetch('/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  // Обновляет аватар пользователя
  setNewAvatar({ avatar }) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }

  // Удаляет карточку с указанным идентификатором
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Добавляет или удаляет лайк карточки в зависимости от значения isLiked
  addLikeCard(cardId, isLiked) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
    });
  }
}

// Экспортирует экземпляр класса Api с заданным базовым URL и заголовками
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '7263adae-3071-416f-9c3c-e2fe3a770300',
    'Content-Type': 'application/json',
  },
});
