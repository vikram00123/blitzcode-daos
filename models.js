var modelMap = new Map()
var Mongoose = require('mongoose')
var Schema = Mongoose.Schema;
const dao = require('./index');
var contextService = require('request-context');

exports.getModel = function (collectionName) {

    let connection = exports.getConnection();
    if (!connection) {
        exports.setForcedConnection("salesTeamTrackingDB");
        connection = exports.getConnection();
    }
    if (modelMap.get(collectionName)) {

        return modelMap.get(collectionName);

    }
    else {

        var collSchema = new Schema({ any: Schema.Types.Mixed }, { strict: false });
        var schema = connection.model(collectionName, collSchema, collectionName);
        //collSchema.plugin(mongoosePaginate);
        modelMap.set(collectionName, schema);
        return schema;
    }

}

exports.getConnection = function () {
    let connection = contextService.get('namespace:currDb.connection');
    return connection;
}


exports.setConnection = function (dbName) {
    let connection = contextService.get('namespace:currDb.connection');
    if (!connection) {
        contextService.set('namespace:currDb', { connection: dao.db("142.93.212.122", "52031", dbName) });
        modelMap.clear();
    }

}


exports.setForcedConnection = function (dbName) {

    contextService.set('namespace:currDb', { connection: dao.db("142.93.212.122", "52031", dbName) });
    modelMap.clear();
}
