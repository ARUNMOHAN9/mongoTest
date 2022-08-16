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

    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
          .then((users) => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
          });
      });

      it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
          .then((user) => {
            assert(user.name === 'Joe');
            done();
          });
      });
});