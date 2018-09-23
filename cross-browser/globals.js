let webdriver = require('selenium-webdriver');
let config = require('config');
let browserStackLocal = require("browserstack-local");
let browserStackLocalInstance = new browserStackLocal.Local();
let merge = require("merge");

function getWebDriverWithCapabilites(userAgentDetails) {
    return new webdriver.Builder().usingServer(config.get("browserstack.server")).withCapabilities(merge(userAgentDetails, {
        'browserstack.user': config.get("browserstack.user"),
        'browserstack.key': config.get("browserstack.key"),
        'browserstack.local': 'true'
    })).build();
}

function startTunnel(callback) {
    browserStackLocalInstance.start({
            'key': config.get('browserstack.key'),
            'force': 'true',
            'onlyAutomate': 'true'
        },
        callback);
}

function stopTunnel() {
    browserStackLocalInstance.stop(() => {
        console.log("Browserstack local stopped");
    });
}

module.exports = {getWebDriverWithCapabilites, startTunnel, stopTunnel};