const Parser = require("yaclip");
const commandLineUsage = require("command-line-usage");

const createRepoCommands = [
    { name: "description", alias: "d", type: String, multiple: false},
    { name: "private", alias: "p", type: Boolean, multiple: false},
]

const listRepoOptions = [
    { name: "affiliation", alias: "a", type: String, multiple: false, description: "owner, collaborator, organization_member. Can be comma separated. Default is all"},
    { name: "type", alias: "t", type: String, multiple: false, description: "Can be one of all, owner, public, private, member. Default is all"},
    { name: "visibility", alias: "v", type: String, multiple: false, description: "Can be one of all, public, or private. Default: all"},

]

const repoCommands = [
    { name: "list", alias: "l", type: Boolean, multiple: false, subcommands: listRepoOptions},
    { name: "view", alias: "v", type: String, multiple: false },
    { name: "create", alias: "c", type: String, multiple: false, subcommands: createRepoCommands }
]

const commands = [
    { name: "repo", alias: "r", type: Boolean, multiple: false, subcommands: repoCommands},
    { name: "out", alias: "o", type: String, multiple: false, description: "json, tsv"},
    { name: "query", alias: "q", type: String, multiple: false, description: "JMESPath query"},
    { name: "help", alias: "h", type: Boolean, multiple: false}
];

const displayUsage = () => {
    const usage = [
        { 
            header: "GitHub Cli", 
            content: "Cli to GitHub"},
        {
            header: "Example",
            content: "gh repo list"
        },
        {
            header: "Options",
            optionList: commands
        },
        {
            header: "Repositories",
            optionList: repoCommands
        },
        {
            header: "List repository options",
            optionList: listRepoOptions
        },
        {
            header: "Repository creation",
            optionList: createRepoCommands
        }
    ]
    console.log(commandLineUsage(usage));

}

const parseCommandLine = () => {
    try {
        args = Parser.parseCommandLine(commands, {
            dashesAreOptional: true
        });        
    }
    catch(error) {
        console.error(error.message);
        displayUsage();
        process.exit();
    }
    
    if ((process.argv.length === 2) || !!args.help) {
        displayUsage();
        process.exit();
    }
    return args;
}

module.exports = parseCommandLine;