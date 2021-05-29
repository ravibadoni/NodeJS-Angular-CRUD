const dataPath = './mock-data/performance-list.json';
const fs = require('fs');

exports.getPerformanceReview = (req) => {
    try {
        return new Promise((resolve, reject) => {
            readFile( data => {
                let record = data.filter(item => parseInt(item.employeeId) === parseInt(req.params['employeeId']));
                return resolve(record);
            }, true);
        })
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}

exports.createPerformanceFeedback = async (payload) => {
    try {
        return new Promise((resolve, reject) => {
            readFile(data => {
                data.unshift(payload);
                writeFile(JSON.stringify(data, null, 2), () => {
                    resolve(true);
                });
            }, true);
        });
    } catch (e) {
        // Log Errors // return bad request
        throw Error(e);
    }
}

// common functions

const readFile =  (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8'
) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile =  (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8'
) => {
    fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
            throw err;
        }
        callback();
    });
};