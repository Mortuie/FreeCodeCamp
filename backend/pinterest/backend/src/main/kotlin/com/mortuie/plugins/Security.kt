package com.mortuie.plugins

import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import com.mortuie.utils.JwtUtils
import io.ktor.server.application.*

fun Application.configureSecurity() {
    authentication {
            jwt {
                val jwtAudience = this@configureSecurity.environment.config.property("jwt.audience").getString()
                realm = this@configureSecurity.environment.config.property("jwt.realm").getString()
                verifier(JwtUtils.verifier)
                validate { credential ->
                    if (credential.payload.audience.contains(jwtAudience)) JWTPrincipal(credential.payload) else null
                }


            }
        }

}
