
// TODO: isObject([]) does not fail.

define(['lib/base/assert'], function (Assert) {

  var fixtures = {
    fn: function () {},
    str: 'string',
    num: 1,
    nullObj: null,
    undefinedObj: undefined,
    obj: {
      a: 1
    }
  };


  function test(type, value) {
    return function () {
      Assert[type].call(this, value);
    };
  }


  function checkFixtures(method, expected) {
    for (var key in fixtures) {
      if (expected[key] === true) {
        expect(test(method, fixtures[key])).not.toThrowError();
      } else {
        expect(test(method, fixtures[key])).toThrowError();
      }
    }
  }


  describe('Assert', function () {
    it('should throw an error when checking for a function', function () {
      checkFixtures('isFunction', {
        fn: true
      });
    });


    it('should throw an error when checking for an object', function () {
      checkFixtures('isObject', {
        obj: true
      });
    });


    it('should throw an error when checking for a defined', function () {
      checkFixtures('isDefined', {
        fn: true,
        str: true,
        num: true,
        nullObj: true,
        obj: true
      });

      expect(test('isDefined', fixtures.obj.a)).not.toThrowError();
      expect(test('isDefined', fixtures.obj.b)).toThrowError();
    });


    it('should throw an error when checking for an undefined', function () {
      checkFixtures('isUndefined', {
        undefinedObj: true
      });

      expect(test('isUnefined', fixtures.obj.a)).toThrowError();
      expect(test('isUndefined', fixtures.obj.b)).not.toThrowError();
    });


    it('should throw an error when checking for null', function () {
      checkFixtures('isNull', {
        nullObj: true
      });
    });


    it('should throw an error when checking for a string', function () {
      checkFixtures('isString', {
        str: true
      });
    });


    it('should throw an error when checking for an instanceof', function () {
      function A() {}
      function B() {}

      var a = new A();
      var b = new B();

      expect(function () {
        Assert.isInstanceOf(a, A);
      }).not.toThrowError();

      expect(function () {
        Assert.isInstanceOf(b, A);
      }).toThrowError();
    });


    it('should throw an error when checking for non-empty', function () {
      var o = {};

      expect(function () {
        Assert.isNotEmpty(o);
      }).toThrowError('Is empty');

      o.name = 'hello';

      expect(function () {
        Assert.isNotEmpty(o);
      }).not.toThrowError('Is empty');
    });


    it('should throw an error when checking for empty', function () {
      var o = {};

      expect(function () {
        Assert.isEmpty(o);
      }).not.toThrowError('Not empty');

      o.name = 'hello';

      expect(function () {
        Assert.isEmpty(o);
      }).toThrowError('Not empty');
    });
  });

});