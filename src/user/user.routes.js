const UserController = require('./user.controller');

exports.routesConfig = (app) => {
    app.get('/api/users', [
        UserController.list
    ]);

    app.post('/api/users', [
        UserController.add
    ]);
};