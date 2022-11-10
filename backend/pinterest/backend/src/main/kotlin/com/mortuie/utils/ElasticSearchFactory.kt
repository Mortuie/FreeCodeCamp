package com.mortuie.utils

import co.elastic.clients.elasticsearch.ElasticsearchClient
import co.elastic.clients.elasticsearch._types.ElasticsearchException
import co.elastic.clients.json.jackson.JacksonJsonpMapper
import co.elastic.clients.transport.rest_client.RestClientTransport
import org.apache.http.HttpHost
import org.elasticsearch.client.RestClient


object ElasticSearchFactory {
    private var client: ElasticsearchClient? = null

    fun getEsClient(): ElasticsearchClient {
        val tempClient = client
        if (tempClient != null) {
            return tempClient
        }
        val restClient: RestClient = RestClient.builder(
            HttpHost("localhost", 9200)
        ).build()

        val transport = RestClientTransport(restClient, JacksonJsonpMapper())

        val tempClient2 = ElasticsearchClient(transport)
        client = tempClient2
        return tempClient2
    }
}