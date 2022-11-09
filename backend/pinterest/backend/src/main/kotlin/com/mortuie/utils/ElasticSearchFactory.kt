package com.mortuie.utils

import com.jillesvangurp.ktsearch.KtorRestClient
import com.jillesvangurp.ktsearch.SearchClient
import com.jillesvangurp.ktsearch.createIndex
import com.jillesvangurp.ktsearch.getIndex
import kotlinx.coroutines.runBlocking

object ElasticSearchFactory {
    private val indexes = listOf<String>("test", "test123")

    fun init() {
        val client = SearchClient(KtorRestClient())
        client.
            for (index in indexes) {
                runBlocking {
                    try {
                        client.getIndex(index)
                        client.createIndex(index)
                    } catch (e: Exception) {
                        println("Index: $index already exists.")
                    }
                }

//            indexes.forEach {
//                try {
//                    client.getIndex(it)
//                    client.createIndex(it)
//                } catch (e: Exception) {
//                    println("Index: $it already exists.")
//                }
//            }

        }
    }


}