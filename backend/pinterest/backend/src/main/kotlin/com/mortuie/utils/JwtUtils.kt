package com.mortuie.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import kotlinx.serialization.Serializable
import java.util.*


@Serializable
data class UserId(val userId: String): Principal

object JwtUtils {
    private val SECRET: String = "ASHDJKAHSDKJ"
    private val ALGORITHM = Algorithm.HMAC256(SECRET)
    private val jwtValidity: Long = 86400000

    fun validator(credential: JWTCredential): Principal? {
        val userId: String = credential.payload.getClaim("userId").asString()
        if (userId != "") {
            return UserId(userId)
        }
        return null
    }

    val verifier: JWTVerifier = JWT
        .require(ALGORITHM)
        .build()

    fun generateToken(userId: String): String = JWT
        .create()
        .withClaim("userId", userId)
        .withExpiresAt(getExpirationDate())
        .sign(ALGORITHM);

    private fun getExpirationDate(): Date = Date(
        System.currentTimeMillis() + jwtValidity
    )
}