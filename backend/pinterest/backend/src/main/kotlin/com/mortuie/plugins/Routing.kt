package com.mortuie.plugins

import com.mortuie.utils.JwtUtils
import com.mortuie.utils.UserId
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

@Serializable
data class incomingAuthRequest(val username: String, val userId: String)

fun Application.configureRouting() {
    routing {
        get("/hello") {
            call.respondText("YESSIR")
        }

        post("/auth") {
            val user = call.receive<incomingAuthRequest>()

            val token: String = JwtUtils.generateToken(user.userId)

            call.respond(hashMapOf("token" to token))
        }

        authenticate {
            get("/authroute") {
                val principal = call.principal<UserId>()

                call.respondText("MEMES ${principal?.userId}")
            }
        }
    }
}
