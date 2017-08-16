var util = require('util');

function check (value, test) {
  if ('function' === typeof test) return test.call(null, value);
  if (util.isRegExp(test)) return test.test(value);
  if ('*' === test) return true;
  if ('ObjectId' === test) return !!value.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = function findByWhatever (schema, options) {

  function finder (type) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var whatever = args.shift();
      var test, attr, criteria = {};
      for (var i = 0, len = options.length; i < len; i++){
        test = options[i];
        attr = Object.keys(test)[0];
        if (check(whatever, test[attr])) {
          criteria[attr] = whatever;
          args.unshift(criteria);
          return this[type].apply(this, args);
        }
      }
    };
  }

  schema.statics.findOneByWhatever = finder('findOne');
  schema.statics.findByWhatever = finder('find');
};
