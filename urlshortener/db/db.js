const collections = "idurlmapping";


var checkIfDbContainsURI = (uri, db) => {
	
	var collection = db.collection(collections);

	collection.find({long_uri: uri}).toArray((err, docs) => {
		if (docs.length === 0) {
			return false;
		} else {
			return true;
		}
	});
}

var getJSONForUri = (uri, db) => {
	var collection = db.collection(collections);
	collection.find({long_uri: uri}).limit(1).toArray((err, data) => {
		return data[0];
	});
}

var insertJSON = (JSON, db) => {
	var collection = db.collection(collections);
	collection.insert(JSON);
}


module.exports = {
	checkIfDbContainsURI: checkIfDbContainsURI,
	getJSONForUri, getJSONForUri,
	insertJSON, insertJSON,
};