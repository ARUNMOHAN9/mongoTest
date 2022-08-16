const assert = require('assert');
const User = require('../src/user');

describe('Reading users records', () => {
    let joe;

    beforeEach(async () => {
        joe = new User({ name: 'Joe' });
        try {
            await joe.save();
        } catch (error) {
            console.error(error);
        }
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.updateOne({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
            done
        );
    });

});