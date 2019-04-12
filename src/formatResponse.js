const jmespath = require("jmespath");

const formatJson = (doc) => {
    return JSON.stringify(doc, null, 2);
}

const formatEntry = (element) => {
    if (typeof element === "object") {
        return Array.from((function*() {for (property in element) {
            yield element[property];
       }})()).join("\t");
    } else {
        return element;
    }
}

const formatTSV = (doc) => {
    let res = "";
    if (typeof doc === "array") {
        doc.forEach(element => {
            res += formatEntry(element) + "\n";
        });
    } else {
        return formatEntry(doc)
    }
    return res;
}

const formatResponse = (response, {output = "json", query = null}) => {
    if (query != null) {
        response = jmespath.search(response, query);
    }

    if (output === "json") {
        console.log(formatJson(response));
    }
    else if (output === "tsv") {
        console.log(formatTSV(response));
    }
    else {
        console.error("Unknown output type: " + output);
    }
}

module.exports = formatResponse;