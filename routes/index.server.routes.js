/**
 * Created by Justin on 7/24/2015.
 */
// Renders initial home page.
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};