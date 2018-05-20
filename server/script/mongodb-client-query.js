const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

const getStudents = function(pageIdx, pageSizs) {
	return new Promise(resolve => {
		MongoClient.connect(url, function(err, db) {
			if (err) {
				throw err;
			}
			const dbo = db.db('exam');
			const queryLimit = getQueryLimit(pageIdx, pageSizs);
			dbo.collection('students').find().skip(queryLimit.skip).limit(
				queryLimit.limit).toArray(
				function(
					err2,
					result,
				) {
					if (err2) {
						throw err2;
					}
					resolve(result);
					db.close();
				});
		});
	});
};

/**
 *
 * @param pageIdx 第几页 0 --->
 * @param pageSize 每页记录
 * @returns {{skip: number, limit: *}}
 */
const getQueryLimit = function(pageIdx, pageSize) {
	return {
		skip : parseInt(pageIdx, 10) * pageSize,
		limit: parseInt(pageSize, 10),
	};
};

module.exports = {getStudents};
