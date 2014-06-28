define(['lib/base/properties'], function (Properties) {

  describe('Mutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {};
      Properties.defineMutableProperty(A.prototype, 'prop1', 10);
      a = new A();
    });

    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
    });

    it('should allow modification', function () {
      a.prop1 = 20;
      expect(a.prop1).toEqual(20);
    });
  });

  describe('Immutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {};
      Properties.defineImmutableProperty(A.prototype, 'prop1', 10);
      a = new A();
    });

    it('should throw an error if an initial value is not defined', function () {
      var B = function () {};

      expect(function () {
        Properties.defineImmutableProperty(B.prototype, 'prop1');
      }).toThrowError();
    });

    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
    });

    it('should not allow modification', function () {
      a.prop1 = 20;
      expect(a.prop1).toEqual(10);
    });
  });

  describe('Immutable Accessors', function () {
    var A;
    var a;
    var getter;

    beforeEach(function () {
      A = function () {};
      getter = function (val) {
        return val;
      };

      Properties.defineImmutableAccessor(A.prototype, 'prop1', 1, getter);

      a = new A();
    });

    it('should set an initial value', function () {
      expect(a.prop1).toEqual(1);
    });

    it('should not allow modification', function () {
      a.prop1 = 100;
      expect(a.prop1).toEqual(1);
    });
  });

  describe('Mutable Accessors', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {};

      Properties.defineMutableAccessor(A.prototype, 'prop1', 1, function (val) {
        return val;
      }, function (val) {
        return val;
      });

      a = new A();
    });

    it('should set an initial value', function () {
      expect(a.prop1).toEqual(1);
    });

    it('should allow modification', function () {
      a.prop1 = 2;
      expect(a.prop1).toEqual(2);
    });

    it('should allow computed values', function () {
      Properties.defineMutableAccessor(A.prototype, 'prop2', 1, function (val) {
        return val + 1;
      }, function (val) {
        return val + 10;
      });

      a = new A();

      expect(a.prop2).toEqual(2);
      a.prop2 = 20;
      expect(a.prop2).toEqual(31);
    });
  });

});