define(['lib/base/check'], function (Check) {

  var fixtures = {
    fn: function () {},
    str: 'string',
    integer: 1,
    decimal: 0.5,
    nullObj: null,
    undefinedObj: undefined,
    obj: {
      a: 1
    },
    array: [1, 2, 3],
    truthy: true,
    falsy: false
  };


  function test(type, value) {
    return Check[type].call(this, value);
  }


  function testNot(type, value) {
    return Check.not[type].call(this, value);
  }


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


    it('should return true/false when checking for an array', function () {
      checkFixtures('isArray', {
        array: true
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


    it('should return true/false when checking for an integer', function () {
      checkFixtures('isInteger', {
        integer: true
      });
    });


    it('should return true/false when checking for a number', function () {
      checkFixtures('isNumber', {
        integer: true,
        decimal: true
      });
    });


    it('should return true/false when checking for a boolean', function () {
      checkFixtures('isBoolean', {
        truthy: true,
        falsy: true
      });
    });


    it('should return true/false when checking for an instanceof', function () {
      function A() {}
      function B() {}

      var a = new A();
      var b = new B();

      expect(Check.isInstanceOf(a, A)).toBeTruthy();
      expect(Check.isInstanceOf(b, B)).toBeTruthy();
      expect(Check.isInstanceOf(b, A)).toBeFalsy();

      expect(Check.not.isInstanceOf(b, A)).toBeTruthy();
      expect(Check.not.isInstanceOf(b, B)).toBeFalsy();
    });


    it('should return true/false when checking for an empty object', function () {
      var o = {};
      expect(Check.isEmpty(o)).toBeTruthy();
      expect(Check.not.isEmpty(o)).toBeFalsy();

      o.name = 'hello';
      expect(Check.isEmpty(o)).toBeFalsy();
      expect(Check.not.isEmpty(o)).toBeTruthy();
    });
  });

});