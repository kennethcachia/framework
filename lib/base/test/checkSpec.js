define(['lib/base/check'], function (Check) {

  var fixtures = {
    fn: (function () {}),
    str: 'string',
    num: 1,
    nullObj: null,
    undefinedObj: undefined,
    obj: {
      a: 1
    }
  };

  function test(type, value) {
    return Check[type].call(this, value);
  };

  function testNot(type, value) {
    return Check.not[type].call(this, value);
  };

  function checkFixtures(method, expected) {
    for (var key in fixtures) {
      if (expected[key] === true) {
        expect(test(method, fixtures[key])).toBeTruthy();
        expect(testNot(method, fixtures[key])).toBeFalsy();
      } else {
        expect(test(method, fixtures[key])).toBeFalsy();
        expect(testNot(method, fixtures[key])).toBeTruthy();
      }
    }
  }

  describe('Check', function () {
    it('should return true/false when checking for a function', function () {
      checkFixtures('isFunction', {
        fn: true
      });
    });

    it('should return true/false when checking for an object', function () {
      checkFixtures('isObject', {
        obj: true
      });
    });

    it('should return true/false when checking for undefined', function () {
      checkFixtures('isUndefined', {
        undefinedObj: true
      });
    });

    it('should return true/false when checking for a null', function () {
      checkFixtures('isNull', {
        nullObj: true
      });
    });

    it('should return true/false when checking for a string', function () {
      checkFixtures('isString', {
        str: true
      });
    });
  });

});