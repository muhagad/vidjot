// const MongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb+srv://mgad:il0veallah@mycluster-e2mph.mongodb.net/test?retryWrites=true'
    }
} else {
    module.exports = {
        mongoURI: `mongodb://localhost/vidjot-dev`
    }
}



// const MongoClient = require('mongodb').MongoClient;
// module.exports.mongoURI = () => {
//     const uri = "mongodb+srv://mgad:il0veallah@mycluster-e2mph.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// }

