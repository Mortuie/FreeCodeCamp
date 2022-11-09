package com.mortuie.plugins

import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import com.mortuie.utils.JwtUtils
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

fun Application.configureSecurity() {
    authentication {
            jwt {
                verifier(JwtUtils.verifier)
                validate { credential ->
                    JwtUtils.validator(credential)
                }


                challenge { _, _ ->
                    call.respond(
                        HttpStatusCode.Unauthorized,
                        hashMapOf("message" to "Token is invalid or has expired.")
                    )
                }
            }
        }

}
