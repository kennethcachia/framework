define(['lib/base/inherit'], function (inherit) {

  describe('inherit', function () {
    var A;
    var B;
    var C;

    beforeEach(function () {
      A = function () {};
      B = function () {};
      C = function () {};

      A.prototype = {
        a: true
      };

      B.prototype = {
        b: true
      };

      C.prototype = {
        c: true
      };
    });


    it('should create objects that have correct instanceof checks', function () {
      inherit(B, A);
      inherit(C, B);

      var c = new C();

      expect(c instanceof B).toEqual(true);
      expect(c instanceof A).toEqual(true);
    });


    it('should not destroy the original constructor', function () {
      var innerFn = jasmine.createSpy();

      var D = function () {
        innerFn();
      };

      var E = function () {
        D.call(this);
        innerFn();
      };

      inherit(E, D);
      inherit(D, A);

      new E();
      expect(innerFn.calls.count()).toEqual(2);
    });


    it('should augment B with properties from A', function () {
      inherit(B, A);

      expect(A.prototype.a).toEqual(true);
      expect(B.prototype.a).toEqual(true);
    });


    it('should augment C with properties from A', function () {
      inherit(C, A);

      expect(A.prototype.a).toEqual(true);
      expect(C.prototype.a).toEqual(true);
    });


    it('should keep a reference to the super class', function () {
      function X() {}
      X.prototype.x = true;

      function Y() {}
      inherit(Y, X);
      Y.prototype.y = true;

      function Z() {}
      inherit(Z, Y);
      Z.prototype.z = true;

      expect(Y.super).toEqual(X.prototype);
      expect(Y.superClass).toEqual(X);
      expect(Y.super.x).toBeTruthy();

      expect(Z.super).toEqual(Y.prototype);
      expect(Z.superClass).toEqual(Y);
      expect(Z.super.y).toBeTruthy();
      expect(Z.super.x).toBeTruthy();
    });
  });

});