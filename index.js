var Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
var model = require('./models');
var connectionMap = new Map()
var db = function getConnection(uri, port, dbName) {

  let connection = connectionMap.get(dbName)
  if (!connection) {

    connection = Mongoose.createConnection(
      'mongodb://' + uri + ':' + port + '/' + dbName);
    connectionMap.set(dbName, connection)

  }

  return connection;

}

//var gfs = Grid(Mongoose.mongo.Db, Mongoose.mongo);
Mongoose.set('debug', true);

exports.checkIfExists = function (query, collectionName) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.findOne(query, function (err, results) {

      if (err)
        reject(err)
      else
        resolve(results)

    })

  })

}



exports.checkIfExistsWithAttributes = function (query, collectionName, attibutes) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.findOne(query, attibutes, function (err, results) {

      if (err)
        reject(err)
      else
        resolve(results)
    })

  })

}


// exports.nextSequence = function (key) {

//   return new Promise(function (resolve, reject) {
//     var seqFunction = "nextSequence('" + key + "')"
//     Connection.db.eval(seqFunction, function (err, nextNo) {

//       if (err)
//         reject(err)
//       else
//         resolve(nextNo)

//     })

//   })
// }

exports.findAggregate = function (collectionName, aggregateArray) {

  return new Promise(function (resolve, reject) {
    var coll = model.getModel(collectionName);
    coll.aggregate(aggregateArray).collation({ locale: 'en', caseLevel: true }).exec((err, aggVal) => {
      if (err) reject(err);
      resolve(aggVal)
    });

  })
}

// exports.createMongoFunction = function () {
//   let doc = {
//     _id: "nextSequence",
//     value: function (sequenceName) {
//       var sequenceDocument = db.counters.findAndModify(
//         {
//           query: { _id: sequenceName },
//           update: { $inc: { sequence_value: 1 } },
//           new: true
//         });
//       if (sequenceDocument)
//         return sequenceDocument.sequence_value;
//       else {
//         db.counters.insert({
//           "_id": sequenceName,
//           "seq": 1,
//           "sequence_value": 1
//         })
//         return 1;
//       }
//     }

//   };

//   var coll = model.getModel("system.js");

//   coll.insertMany(doc, {}, function (err, obj) {
//     if (err) {
//       reject(err);
//       return;
//     }
//     resolve(obj);
//   })

// model.getConnection().db.save({
//   _id: "nextSequence",
//   value: function (sequenceName) {
//     var sequenceDocument = db.counters.findAndModify(
//       {
//         query: { _id: sequenceName },
//         update: { $inc: { sequence_value: 1 } },
//         new: true
//       });
//     if (sequenceDocument)
//       return sequenceDocument.sequence_value;
//     else {
//       db.counters.insert({
//         "_id": sequenceName,
//         "seq": 1,
//         "sequence_value": 1
//       })
//       return 1;
//     }
//   }

// })
// }

exports.insert = function (collectionName, doc) {

  return new Promise(function (resolve, reject) {
    var CollSchema = model.getModel(collectionName);
    var coll = new CollSchema(doc);

    coll.save(function (err, obj) {
      if (err) {
        reject(err);
        return;
      }
      resolve(obj);
    });

  })
}

// exports.insert = function (collectionName, doc) {

//   return new Promise(function (resolve, reject) {
//     var coll = model.getModel(collectionName);

//     coll.insert(doc, function (err, obj) {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(obj);
//     });

//   })
// }

exports.insertMany = function (collectionName, doc, options) {

  return new Promise(function (resolve, reject) {
    var coll = model.getModel(collectionName);

    coll.insertMany(doc, options, function (err, obj) {
      if (err) {
        reject(err);
        return;
      }
      resolve(obj);
    });

  })

}



// exports.getCollection = function (collectionName, options) {

//   return new Promise(function (resolve, reject) {

//     var coll = model.getModel(collectionName);

//     coll.find({}, options, function (err, results) {

//       if (err)
//         reject(err)
//       else
//         resolve(results)

//     })

//   })
// }


// exports.getCollectionCount = function (collectionName) {

//   return new Promise(function (resolve, reject) {

//     var coll = model.getModel(collectionName);

//     coll.find({}).count(function (err, count) {

//       if (err)
//         reject(err)
//       else
//         resolve(count)
//     })
//   })

// }


exports.getCollectionCountWithCriteria = function (collectionName, criteria) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.find(criteria).count(function (err, count) {
      if (err)
        reject(err)
      else
        resolve(count)
    })
  })
}


exports.getCollectionWithCriteriaAndProjections = function (collectionName, criteria, projections, options) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.find(criteria, projections, options, function (err, results) {

      if (err)
        reject(err)
      else
        resolve(results)

    })
  })
}


exports.findOneWithCriteriaAndProjections = function (collectionName, criteria, projections) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.findOne(criteria, projections, function (err, results) {

      if (err)
        reject(err)
      else
        resolve(results)

    })

  })

}


exports.getCollectionWithCriteriaProjectionsAndSort = function (collectionName, criteria, projections, sort, options) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);
    coll.find(criteria, projections, options).sort(sort).exec(function (err, results) {

      if (err)
        reject(err)
      else
        resolve(results)

    })

  })

}

exports.deleteOneWithCriteria = function (collectionName, criteria) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);

    coll.deleteOne(criteria, function (err, res) {
      if (err)
        reject(err) //TODO: add logging
      else
        resolve(res)

    });

  })

}

exports.deleteManyWithCriteria = function (collectionName, criteria, options) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);

    coll.remove(criteria, options, function (err, res) {
      if (err)
        reject(err) //TODO: add logging
      else
        resolve(res)

    });

  })

}

exports.updateCollection = function (collectionName, criteria, updateDoc, multi) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);

    coll.update(criteria, updateDoc, { 'multi': multi, 'strict': false, 'upsert': true }, function (err, results) {
      if (err)
        reject(err)
      else
        resolve(results)


    })

  })
}


exports.findOneAndUpdate = function (collectionName, criteria, updateDoc) {

  return new Promise(function (resolve, reject) {

    var coll = model.getModel(collectionName);

    coll.findOneAndUpdate(criteria, updateDoc, { strict: false, new: true }, function (err, results) {
      if (err)
        reject(err)
      else
        resolve(results)


    })



  })
}

exports.createTextSearchIndex = function (collectionName, fields) {

  return new Promise(function (resolve, reject) {

    var User = model.getIndexModel(collectionName, fields);
    User.create(function (err, res) {
      if (err)
        reject(err)
      else
        resolve(res)
    });

  })
}

exports.db = db;
exports.model = model;
