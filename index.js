const parseCommands = require("./src/parseCommands");
const repoCommands = require("./src/parseRepoCommandAsync");
const formatResponse = require("./src/formatResponse");
/*
{ repo:
   { value: true,
     create: { value: 'totobite', description: [Object] } } }
     */

const runAsync = async () => {
    const commands = parseCommands();
    let res = null;
    
    if (!!commands.repo) {
        res = await repoCommands(commands.repo);
    }
    if (!res) {
        console.warn("No response");
    }
    else {
        const formattingOptions = {};
        if (commands.out) {
            formattingOptions.output = commands.out.value;
        }
        if (commands.query) {
            formattingOptions.query = commands.query.value;
        }
        formatResponse(res, formattingOptions);
    }
};
runAsync().then();