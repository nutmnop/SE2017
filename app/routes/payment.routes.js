var payment = require('../controllers/payment.controller');

module.exports = function(app){
    app.post('/payment',payment.render);
    app.get('/payment2/:branchname/:theaternum/:showtime',payment.renderselectseat);

}
