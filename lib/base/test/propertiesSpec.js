define(['lib/base/properties'], function (Properties) {

  describe('Mutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {
        Properties.defineMutableProperty(this, 'prop1', 10);  
      };

      Properties.defineMutableProperty(A.prototype, 'prop2', 20);
      a = new A();
    });


    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should allow modification', function () {
      a.prop1 = 20;
      a.prop2 = 40;

      expect(a.prop1).toEqual(20);
      expect(a.prop2).toEqual(40);
    });
  });


  describe('Immutable Properties', function () {
    var A;
    var a;

    beforeEach(function () {
      A = function () {
        Properties.defineImmutableProperty(this, 'prop1', 10);
      };

      Properties.defineImmutableProperty(A.prototype, 'prop2', 20);
      a = new A();
    });


    it('should throw an error if an initial value is not defined', function () {
      expect(function () {
        var B = function () {
          Properties.defineImmutableProperty(this, 'prop1');
        };
        new B();
      }).toThrowError();

      expect(function () {
        var B = function () {};
        Properties.defineImmutableProperty(B.prototype, 'prop1');
      }).toThrowError();
    });


    it('should assign a default value', function () {
      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });


    it('should not allow modification', function () {
      a.prop1 = 20;
      a.prop2 = 40;

      expect(a.prop1).toEqual(10);
      expect(a.prop2).toEqual(20);
    });
  });


  describe('Immutable Accessors', function () {
    it('should not allow modification', function () {
      function A() {
        this._prop1 = 0;

        Properties.defineImmutableAccessor(this, 'prop1', function () {
          return this._prop1;
        }, function (val) {
          this._prop1 = val;
        });
      }

      var a = new A();
      expect(a.prop1).toEqual(0);
      a.prop1 = 100;
      expect(a.prop1).toEqual(0);
    });
  });


  describe('Mutable Accessors', function () {
    it('should allow modification', function () {
      function A() {
        this._prop1 = 0;

        Properties.defineMutableAccessor(this, 'prop1', function () {
          return this._prop1;
        }, function (val) {
          this._prop1 = val;
        });
      }

      var a = new A();
      expect(a.prop1).toEqual(0);
      a.prop1 = 100;
      expect(a.prop1).toEqual(100);
    });


    it('should allow computed values', function () {
      function A() {
        this._prop1 = 0;

        Properties.defineMutableAccessor(this, 'prop1', function () {
          return this._prop1;
        }, function (val) {
          this._prop1 = val + 20;
        });
      }

      var a = new A();
      expect(a.prop1).toEqual(0);
      a.prop1 = 20;
      expect(a.prop1).toEqual(40);
    });
  });


  describe('Properties', function () {
    it('should create independent properties when they are defined within constructors', function () {
      var A = function () {
        Properties.defineMutableProperty(this, 'prop', {
          a: 1
        });
      };

      var a = new A();
      var b = new A();

      b.prop.a = 100;

      expect(a.prop.a).toEqual(1);
      expect(b.prop.a).toEqual(100);
    });


    it('should create properties that link to each other when they are defined on the prototype', function () {
      var A = function () {};

      Properties.defineMutableProperty(A.prototype, 'prop', {
        a: 1
      });

      var a = new A();
      var b = new A();

      b.prop.a = 100;

      expect(a.prop.a).toEqual(100);
      expect(b.prop.a).toEqual(100);
    });
  });

});