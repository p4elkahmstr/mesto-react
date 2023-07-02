class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject;
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.description,
                // avatar: data.avatar,
            }),
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    setNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link,
            }),
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    addLike(dataId) {
        return fetch(`${this._url}/cards/${dataId}/likes`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    deleteLike(dataId) {
        return fetch(`${this._url}/cards/${dataId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse)
        .catch((err) => console.log(err));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        })
        .then(this._checkResponse)
        .catch((err) => console.log(err));
        
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
    headers: {
        authorization: "03065fbb-dcfa-4975-a9cf-14ec6e4c94d3",
        "Content-Type": "application/json",
    },
});

export default api