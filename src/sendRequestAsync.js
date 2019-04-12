const https = require("https");

const sendRequestAsync = ({
    method = "GET",
    endpoint,
    body = null
}) => new Promise((resolve, reject) => {
    token = process.env["GITHUB_TOKEN"];
    const request = https.request({
        method,
        hostname: "api.github.com",
        path: endpoint,
        headers: {
            "Content-type": "application/json",
            "User-agent": "github-cli",
            "Authorization": `Basic ${token}`
        }
    }, (res) => {
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => resolve(JSON.parse(data)));
        res.on("error", (err) => reject(err));
    });
    if (!!body) {
        if (typeof body === "object") {
            body = JSON.stringify(body);
        }
        request.write(body);
    }
    request.on("error", (err) => reject(err));
    request.end();
});

module.exports = sendRequestAsync;