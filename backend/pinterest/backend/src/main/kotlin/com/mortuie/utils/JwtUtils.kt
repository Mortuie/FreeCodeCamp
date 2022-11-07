package com.mortuie.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm

object JwtUtils {
    private val ALGORITHM = Algorithm.HMAC256("")

    val verifier: JWTVerifier = JWT
        .require(ALGORITHM)
        .build()

}