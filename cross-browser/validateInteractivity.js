let { getWebDriverWithCapabilites, startTunnel, stopTunnel } = require("./globals");
let config = require("config");
let webDriver = require('selenium-webdriver');
let assert = require("assert");
let { Condition } = require('selenium-webdriver');
let dateMath = require('date-arithmetic');


let userAgents = config.get("user-agents");

let expectedOutcomes = ['No Win, try again.', 'No Win, try again.', 'Small win, try again to win more.', 'Big win, congratulations.'];

describe("After Intial page load", () => {
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

            it('should display winning status on click of spin button', () => {
                return driver.get(config.get("base-url")).then(() => {
                    return driver.findElement(webDriver.By.id("start")).click().then(() => {
                        let clickedTime = new Date;
                        return driver.wait(new Condition("Fetch Data", () => {
                             //wait for 20 seconds to let the xhr complete
                            return dateMath.diff(clickedTime, new Date, "seconds", false) > 20;
                            }), 40000, "Failed to fetch data").then((value) => {
                            return driver.findElement(webDriver.By.id("status")).then(webElement => {
                                return webElement.getText().then(text => {
                                    return new Promise((resolve, reject) => {
                                        if(expectedOutcomes.includes(text)) resolve();
                                        else reject(text);
                                    });
                                })
                            })
                        })
                    });
                }).catch((err) => assert.fail(err));
            });

            it('should display winning status corresponding to the images on click of start button', () => {
                return driver.get(config.get("base-url")).then(() => {
                    return driver.findElement(webDriver.By.id("start")).click().then(() => {
                        let clickedTime = new Date;
                        return driver.wait(new Condition("Fetch Data", () => {
                            return dateMath.diff(clickedTime, new Date, "seconds", false) > 20;
                        }), 40000, "Failed to fetch data").then((value) => {
                            return driver.findElement(webDriver.By.id("status")).then(webElement => {
                                return webElement.getText().then(text => {
                                    return driver.findElements(webDriver.By.css("#result .pulse")).then((icons) => {
                                        return new Promise((resolve, reject) => {
                                            if(expectedOutcomes[icons.length] === text) resolve();
                                            else reject(`Expected: ${expectedOutcomes[icons.length]}. Actual: ${text}`);
                                        });
                                    });
                                });
                            });
                        });
                    });
                }).catch((err) => assert.fail(err));
            });

        });
    });
});