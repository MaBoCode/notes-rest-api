const networkInterfaces = require('os').networkInterfaces();

console.log(networkInterfaces);

module.exports = {
    "port": 3000,
    "host": networkInterfaces['wlp4s0']['address'],
    "environment": "dev"
};