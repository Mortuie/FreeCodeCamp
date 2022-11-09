package com.mortuie

import com.jillesvangurp.ktsearch.KtorRestClient
import com.jillesvangurp.ktsearch.SearchClient
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.mortuie.plugins.*
import com.mortuie.utils.ElasticSearchFactory

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    ElasticSearchFactory.init()


    configureSerialization()
    configureSecurity()
    configureRouting()
}
