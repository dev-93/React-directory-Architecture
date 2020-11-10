import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import CommonStore from './stores/CommonStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = `${process.env.REACT_APP_ROOT}/api`;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        console.log(err);
    }

    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (CommonStore.token) {
        req.set('Authorization', `Bearer ${CommonStore.token}`);
    }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const User = {
    temp1: () =>
        requests.get(),
    login: () =>
        requests.post(),
};

export default {
    User,
};
