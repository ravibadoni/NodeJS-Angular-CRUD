const dataPath = './mock-data/employee-list.json';
const fs = require('fs');

exports.createEmployee = async (payload) => {
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

exports.updateEmployee = (req) => {
    try {
        return new Promise((resolve, reject) => {
            readFile( data => {
                let record = data.find(item => parseInt(item.id) === parseInt(req.params['id']));
                if (record) {
                    data.map(item => {
                        if (item.id === req.params['id']) {
                            item.name = req.body.name;
                            item.department = req.body.department;
                            item.email = req.body.email;
                            item.phone = req.body.phone;
                        }
                    })
                     writeFile(JSON.stringify(data, null, 2), () => {
                         resolve({status: 200});
                     });
                } else {
                    resolve({status: 401});
                }
            }, true);
        })
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}

exports.deleteEmployee = async (req) => {
    try {
        return new Promise((resolve, reject) => {
            readFile(data => {
                const record = data.find((item) => parseInt(item.id) === parseInt(req.params['id']));
                if (record) {
                    data.splice(data.indexOf(record),1);
                    writeFile(JSON.stringify(data, null, 2), () => {
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            }, true);
        });
    } catch (e) {
        // Log Errors
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
