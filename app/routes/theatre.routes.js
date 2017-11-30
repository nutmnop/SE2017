var theatre = require('../controllers/theatre.controller');


module.exports = function(app){
    app.route('/admin-editshowtime/:theatreid')
    .get(theatre.rendereditshowtime)
    .post(theatre.editshowtime);
    app.get('/admin-alltheatre/:branchname',theatre.renderalltheatre)
}
