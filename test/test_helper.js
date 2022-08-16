const mongoose = require("mongoose");


before((done) => {
    mongoose.connect('mongodb://localhost/users_test');

    mongoose.connection
        .once('open', () => {
            console.log('Connection success');
            done()
        })
        .on('error', (err) => console.error('Connection failed', err));
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});