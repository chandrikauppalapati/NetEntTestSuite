let { getWebDriverWithCapabilites, startTunnel, stopTunnel } = require("./globals");
let config = require("config");
let webDriver = require('selenium-webdriver');
let assert = require("assert");

let userAgents = config.get("user-agents");


describe("Initial page", () => {
    before((done) => {
        startTunnel(() => {
            console.log("Browserstacklocal started");
            done();
        });
    });

    after(() => {
        stopTunnel();
    });
    userAgents.forEach(userAgent => {
        describe(`for userAgent ${JSON.stringify(userAgent)}`, () => {
            let driver;
            before(() => {
                driver = getWebDriverWithCapabilites(userAgent);
            });

            after(() => {
                if(driver) driver.quit();
            });

            it('should display welcome message', () => {
                return driver.get(config.get("base-url")).then(() => {
                    return driver.findElement(webDriver.By.id("status")).then(webElement => {
                        return webElement.getText().then(text => {
                            assert.equal(text, "Welcome");
                        });
                    });
                });
            });

            it('should display spin button', () => {
                return driver.get(config.get("base-url")).then(() => {
                    return driver.findElement(webDriver.By.id("start")).then(webElement => {
                        return webElement.getTagName().then(tagName => assert.equal(tagName, 'div'))
                    });
                });
            });

        });
    });
});