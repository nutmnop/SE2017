var payment = require('../controllers/payment.controller');

module.exports = function(app){
    app.post('/payment',payment.render);
    app.get('/payment2/:branchname/:theaternum/:showtime',payment.renderselectseat);
    app.get('/payment3/:branchname/:theaternum/:showtime',payment.renderstep3);
    app.get('/payment4/:branchname/:theaternum/:showtime',payment.renderstep4);
}
