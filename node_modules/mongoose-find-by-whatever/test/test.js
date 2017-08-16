var expect = require('chai').expect;
var sinon = require('sinon');
var Model = require('./model');

function test (type, value, expectedAttr) {
  Model[type+'ByWhatever'](value);
  var criteria = {};
  criteria[expectedAttr] = value;
  expect(Model[type].calledWith(criteria)).to.be.true;
}

describe('findByWhatever', function () {
  describe('#findByWhatever', function () {
    before(function(){  sinon.spy(Model, 'find'); });

    it ('matches catch-all', test.bind(null, 'find', 'foo', 'name'));
    it ('matches ObjectId', test.bind(null, 'find', '52aa38f7bcd27e0200000024', '_id'));
    it ('matches email', test.bind(null, 'find', 'foo@bar.com', 'email'));
    it ('matches secret', test.bind(null, 'find', 'my secret', 'secret'));

    after(function(){  Model.find.restore(); });
  });

  describe('#findOneByWhatever', function () {
    before(function(){  sinon.spy(Model, 'findOne'); });

    it ('matches catch-all', test.bind(null, 'findOne', 'foo', 'name'));
    it ('matches ObjectId', test.bind(null, 'findOne', '52aa38f7bcd27e0200000024', '_id'));
    it ('matches email', test.bind(null, 'findOne', 'foo@bar.com', 'email'));
    it ('matches secret', test.bind(null, 'findOne', 'my secret', 'secret'));

    after(function(){  Model.findOne.restore(); });
  });

});

