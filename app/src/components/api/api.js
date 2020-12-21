const get = (url) => {
    return new Promise((succeed, fail) => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.addEventListener("load", function() {
            if (request.status < 400)
                succeed(request.response);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function() {
            fail(new Error("Network error"));
        });
        request.send();
    });
};

const post = (url, requestBody) => {
    return new Promise(function(succeed, fail) {
        let request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener("load", function() {
            if (request.status < 400)
                succeed(request.response);
            else
                fail(new Error("Request failed: " + request.statusText));
        });
        request.addEventListener("error", function() {
            fail(new Error("Network error"));
        });
        request.send(requestBody);
    });
};

const postCubeParams = (paramsJSON) => {
    return post('http://localhost:3001', paramsJSON);
};
const getCubeArray = () => {
    return get('http://localhost:3001');
};


export { getCubeArray, postCubeParams };