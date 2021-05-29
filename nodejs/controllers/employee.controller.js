var express = require('express');
var router = express.Router();
const fs = require('fs');
const dataPath = './mock-data/employee-list.json';
const {check, validationResult} = require('express-validator');
let employeeService = require('../services/employee.service');
let performService = require('../services/performance.service');

// get all Employee list
router.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});


//POST /employee Create
router.post('/', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const payload = {
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone,
        id: Date.now().toString()
    };
    employeeService.createEmployee(payload).then(resp => {
        res.json({ status: 200, message :'Employee has been successfully added!' })
    }).catch((e) => {
        res.json({ status: 500, message :e.message })
    });
});

// UPDATE any employee Details
router.put('/:id', [
    check('name').isLength({min: 3}),
    check('department').exists()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    employeeService.updateEmployee(req).then(resp => {
        if(resp) {
            res.json({ status: 200, message :'Employee Details has been successfully updated' })
        } else {
            res.json({ status: 400, message :'No Record with this Id.'});
        }
    }).catch((e) => {
        res.json({ status: 500, message :e.message});
    });
});


// Delete task
router.delete('/:id', (req, res) => {
    employeeService.deleteEmployee(req).then(resp => {
        if(resp) {
            res.json({ status: 200, message :`Employee id:${req.params['id']} removed`});
        } else {
            res.json({ status: 400, message :'No Record with this Id.'});
        }
    }).catch((e) => {
        res.status(500).json({errors: e.message});
    });
});

// get perfomance reviews of employee
router.get('/performance/:employeeId', [
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    performService.getPerformanceReview(req).then(resp => {
        res.send(resp);
    }).catch((e) => {
        res.json({ status: 500, message :e.message});
    });
});

//POST /performance Create Employee Performance
router.post('/performance', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const payload = {
        employeeId: req.body.employeeId,
        review: req.body.review,
        id: Date.now().toString()
    };
    performService.createPerformanceFeedback(payload).then(resp => {
        if(resp) {
            res.json({ status: 200, message :'Employee Feedback has been successfully added!' })
        }
    }).catch((e) => {
        res.json({ status: 500, message :e.message })
    });
});

module.exports = router;