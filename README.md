**Test Strategy:**
1. Smoke tests: - Manual - Done
   1. Check if all the requirements are met.
   2. Check if functionality implemented is as per expectations.
2. Cross Browser Testing: - Browserstack - Done
   1. Check in multiple devices and multiple user agents.
3. Performance Testing: - Application instrumentation
   1. Check if the application is meeting the stipulated performance metrics. (TODO: Define the metrics.)
4. Stress Testing: - Gatling - Done - 
   Load test is performed using gatling. Simulation is recorded using gatling recorder.
   1. Check the application performance while the system is under stress (handling heavy load).
5. Security Testing: - Mostly manual
   1. Check if the application is meeting the stipulated security standards.
6. Application specific testing:
   1. Randomness test
7. Exploratory testing - Done
8. Integration tests are not performed as no integration points are found in the application.


**Tests performed as part of the test suite:**
1. Cross browser functional tests using Browserstack and Selenium. Browserstack local is used to tunnel local application.
2. Load test using gatling

**To run the tests:**

1. Start the game application.
2. execute `npm test` in this test suite root folder.
3. Currently, functional tests are run on `Chrome v69.0 in windows 10` and `Safari in iPhone 6S in iOS v9.0`. In order to run tests against more devices, add them to `user-agents` key in `config/default.yml` file.


**Report regarding findings:**

1. It is possible to access any file in the filesystem through the application. For example, Accessing http://127.0.0.1:8000/../outcomeHandler.js in postman gives the file contents in the response. This is a major security vulenrability.
2. The application rejects requests to outcome.json which doesn't contain referer value as 127.0.0.1:8000. 
    1. This approach to "authenticating" requests is sub-optimal as this header value can be easily tampered. This also resulted tightly coupling presentation layer and backend.
    2. Also, the referer check is done on a loopback address which will block the user in using the game if the app is hosted in a remote server.
3. Unit testability: Unit testable code and adding unit tests helps in identifying issues earlier in dev life cycle thus reducing the cost of fixing the issue. The source code doesn't contain unit tests.
4. True random number generator can be used instead of a psuedo random number generator. (https://www.random.org/)
5. Usability testing: It would have been better incase the start button has a descriptive label.
6. Accessibility: App doesn't conform to ARIA rules.
7. Spinner is not shown until results are fetched. It is out of sync with the "outcome" fetch operation. (Found during test automation)
8. Measures to block malicious activity (eg. DOS attack) can be added.
9. Page title and Favicon can be added.
