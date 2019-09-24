function scriptureFetch(path, queryParams = {}, method = "GET", version = "v1") {
    const keys = Object.keys(queryParams);
    let queryString = '';

    keys.forEach(key => {
        if (queryString === '')
            queryString += '?';
        else
            queryString += "&";

        queryString += `${key}=${queryParams[key]}`;
    });

    return fetch(`https://api.scripture.api.bible/${version}/${path}${queryString}`, {
        method,
        headers: {
            'api-key': 'ab4d9c573a777a5ba520c3071c961096'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error('There was an issue with the response');
        }
    }).catch(e => {
        throw Error(e);
    });
}

export default scriptureFetch;
