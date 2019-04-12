const queryUtils = {
    formatBody: (body, parameters, listOfOptions) => {
        for(let option of listOfOptions) {
            if (!!parameters[option]) {
                body[option] = parameters[option].value
            }
        }
        return body;
    },
    formatQueryString: (parameters, listOfOptions) => {
        let res = "";
        for(let option of listOfOptions) {
            if (!!parameters[option]) {
                res += `${option}=${parameters[option].value}`;
            }
        }
        return res;
    }
}

module.exports = queryUtils;