/**
 * Created by Justin on 7/24/2015.
 */
exports.render = function(req, res) {
    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });
};