var theatre = require('../controllers/theatre.controller');


module.exports = function(app){
    app.get('/admin-editshowtime',theatre.rendereditshowtime);
}
