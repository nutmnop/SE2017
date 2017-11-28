var theatre = require('../controllers/theatre.controller');


module.exports = function(app){
    app.get('/admin-editshowtime/:theatreid',theatre.rendereditshowtime);
    app.get('/admin-alltheatre/:branchname',theatre.renderalltheatre)
}
