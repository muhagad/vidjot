const MongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: `mongodb://mgad:<PASSWORD>@mycluster-shard-00-00-e2mph.mongodb.net:27017,mycluster-shard-00-01-e2mph.mongodb.net:27017,mycluster-shard-00-02-e2mph.mongodb.net:27017/test?ssl=true&replicaSet=myCluster-shard-0&authSource=admin&retryWrites=true`
    }
} else {
    module.exports = {
        mongoURI: `mongodb://localhost/vidjot-dev`
    }
}


