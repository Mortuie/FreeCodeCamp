package com.mortuie.services

import co.elastic.clients.elasticsearch.ElasticsearchClient
import co.elastic.clients.elasticsearch._types.ElasticsearchException
import co.elastic.clients.elasticsearch.core.GetRequest
import com.mortuie.models.UserModel
import com.mortuie.utils.ElasticSearchFactory

object ElasticSearchService {
    private val USER_INDEX: String = "users"
    private val PICTURE_INDEX: String = "pictures"
    private val indexes = listOf<String>(
        USER_INDEX,
        PICTURE_INDEX
    )
    private val client: ElasticsearchClient = ElasticSearchFactory.getEsClient()

    fun init() {
        indexes.forEach {
            if (!indexExists(it)) createIndex(it)
        }
    }

    fun createIndex(indexName: String): Unit {
        client.indices().create {
            it.index(indexName)
        }
        println("Created index: '$indexName'.")
    }

    fun indexExists(indexName: String): Boolean {
        try {
            client.indices().get {
                it.index(indexName)
            }
            println("Index '$indexName' already exists.")
            return true
        } catch (e: ElasticsearchException) {}
        return false
    }

//    fun getUserById(userId: String) {
//        val x = GetRequest()
//        client.get(x, UserModel.class)
//    }

    fun insertUser(user: UserModel) {
        client.index {
            it
                .index(USER_INDEX)
                .id(user.id)
                .document(user)
        }
    }
}