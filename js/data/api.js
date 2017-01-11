'use strict';

import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import { API_URL } from './../../web.config';
import { store } from '../store';
import * as constants from '../constants';

export function signIn(username, password) {
    let credentials = {
        username: username,
        password: password
    };

    let url = `${API_URL}/signin`;

    let options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(credentials)
    };

    let promise = new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            // this will not reject on error. only on network failure
            if (response.status != 200) {
                reject();
            } else {
                response.json().then((json) => {
                    resolve(json.token);
                });
            }
        }).catch(() => {
            // network failure
            reject();
        });
    });

    return promise;
}

export function signUp(username, password) {
    let credentials = {
        username: username,
        password: password
    };

    let url = `${API_URL}/signup`;

    let options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(credentials)
    };

    let promise = new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            // this will not reject on error. only on network failure
            if (response.status != 200) {
                reject();
            } else {
                response.json().then((json) => {
                    resolve(json.token);
                });
            }
        }).catch(() => {
            // network failure
            reject();
        });
    });

    return promise;
}

export function loadRecipes(recipeType) {
    let auth = store.getState().auth;

    let url = `${API_URL}/recipes`;

    if (recipeType == constants.recipeTypes.PERSONAL) {
        url += '/personal';
    } else {
        url += '/public';
    }

    let options = {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "Authorization": "JWT " + auth.token
        }
    };

    let promise = new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            // this will not reject on error. only on network failure
            if (response.status != 200) {
                reject();
            } else {
                response.json().then((json) => {
                    resolve(json);
                });
            }
        }).catch(() => {
            // network failure
            reject();
        });
    });

    return promise;
}

export function loadRecipeDetails(recipeId, recipeType) {
    let auth = store.getState().auth;

    let url = `${API_URL}/recipes/${recipeType}/${recipeId}`;

    let options = {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "Authorization": "JWT " + auth.token
        }
    };

    let promise = new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            // this will not reject on error. only on network failure
            if (response.status != 200) {
                reject();
            } else {
                response.json().then((json) => {
                    resolve(json);
                });
            }
        }).catch(() => {
            // network failure
            reject();
        });
    });

    return promise;
}

export function editRecipeDetails(recipeDetails, recipeId, recipeType) {
    let auth = store.getState().auth;

    let url = `${API_URL}/recipes/${recipeType}/${recipeId}`;

    var form = new FormData();
    form.append('client_id', config.APP_KEY);
    form.append('image', recipeDetails.ima)

    let options = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "Authorization": "JWT " + auth.token
        },
        body: form
    };

    let promise = new Promise((resolve, reject) => {
        fetch(url, options).then((response) => {
            // this will not reject on error. only on network failure
            if (response.status != 200) {
                reject();
            } else {
                response.json().then((json) => {
                    resolve(json);
                });
            }
        }).catch(() => {
            // network failure
            reject();
        });
    });

    return promise;
}