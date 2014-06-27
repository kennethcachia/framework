define(['lib/base/assert'], function (Assert) {

  var fn = function () {};
  var str = 'string';

  var obj = {
    a: 1
  };

  function test(type, value) {
    return function () {
      Assert[type].call(this, value);
    };
  };

  describe('Assert', function () {
    it('should throw an error when checking for a function', function () {
      expect(test('isFunction', fn)).not.toThrowError();
      expect(test('isFunction', str)).toThrowError();
    });

    it('should throw an error when checking for a defined', function () {
      expect(test('isDefined', obj.a)).not.toThrowError();
      expect(test('isDefined', null)).not.toThrowError();
      expect(test('isDefined', obj.b)).toThrowError();
    });

    it('should throw an error when checking for a string', function () {
      expect(test('isString', str)).not.toThrowError();
      expect(test('isString', fn)).toThrowError();
      expect(test('isString', obj)).toThrowError();
    });
  });

});