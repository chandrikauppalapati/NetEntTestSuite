package netent

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class BasicSimulation extends Simulation {

	val httpProtocol = http
		.baseURL("http://127.0.0.1:8000")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:64.0) Gecko/20100101 Firefox/64.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_3 = Map("Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Referer" -> "http://127.0.0.1:8000")



	val scn = scenario("BasicSimulation")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/button.png"),
            http("request_2")
			.get("/Symbol_0.png"),
            http("request_3")
			.get("/favicon.ico")
			.headers(headers_3)))
		.pause(4)
		.exec(http("request_4")
			.get("/outcome.json")
			.headers(headers_3)
			.resources(http("request_5")
			.get("/Symbol_3.png"),
            http("request_6")
			.get("/Symbol_1.png"),
            http("request_7")
			.get("/Symbol_2.png")))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}