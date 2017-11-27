var branch = require('../controllers/branch.controller');


module.exports = function(app){
    app.post('/addbranch',branch.addbranch);
    app.get('/admin-allbranch',branch.adminallbranch);
}
