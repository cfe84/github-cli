const sendRequestAsync = require("./sendRequestAsync");
const queryUtils = require("./queryUtils");

const processListReposAsync = async (parameters) => {
    let endpoint = "/user/repos?";
    endpoint += queryUtils.formatQueryString(parameters, ["affiliation", "type", "visibility"]);
    const result = await sendRequestAsync({
        endpoint
    });
    return result;
}

const processViewRepoAsync = async(parameters) => {
    return await sendRequestAsync({
        endpoint: "/repos/" + parameters.value
    });
}

const processCreateRepoAsync = async(parameters) => {
    const body = queryUtils.formatBody({
        name: parameters.value
    }, parameters, ["description", "private"]);
    return await sendRequestAsync({
        endpoint: "/user/repos",
        method: "POST",
        body
    });
}

const processRepoCommandAsync = async (parameters) => {
    if (!!parameters.list) {
        return await processListReposAsync(parameters.list);
    } 
    else if (!!parameters.view) {
        return await processViewRepoAsync(parameters.view);
    }
    else if (!!parameters.create) {
        return await processCreateRepoAsync(parameters.create);
    }
}

module.exports = processRepoCommandAsync;