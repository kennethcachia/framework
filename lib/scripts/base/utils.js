
define(function () {

  // TODO: Improve.

  /**
   * Utils
   */
  var Utils = {
    clone: function (object) {
      var output = {};

      for (var key in object) {

        if (object.hasOwnProperty(key)) {
          if (object[key] && !object[key].isBaseObject && object[key].constructor.name === 'Object') {
            output[key] = this.clone(object[key]);
          } else {
            output[key] = object[key]
          }
        }

      }

      return output;
    },


    mergeArrays: function (a, b) {
      var concat = a.concat(b);

      // Dedupe
      for (var i = 0; i < concat.length; i++) {
        for (var j = i + 1; j < concat.length; j++) {
          if (concat[i] === concat[j]) {
            concat.splice(j--, 1);
          }
        }
      }

      return concat;
    },


    mergeObjects: function (a, b) {
      var na = this.clone(a);
      var nb = this.clone(b);

      var merged = nb;

      for (var key in na) {

        if (na.hasOwnProperty(key)) {
          if (na[key] && !na[key].isBaseObject && na[key].constructor.name === 'Object') {
            merged[key] = this.mergeObjects(na[key], merged[key]);
          } else {

            if (Array.isArray(merged[key]) && Array.isArray(na[key])) {
              merged[key] = this.mergeArrays(merged[key], na[key]);
            } else {
              merged[key] = na[key];
            }
          }
        }

      }

      return merged;
    },


    extend: function (src, dest, initializers, destructors) {
      for (var s in src) {
        if (s === 'initializer') {
          initializers.push(src[s]);
        } else if (s === 'destructor') {
          destructors.unshift(src[s]);
        } else if (src.hasOwnProperty(s)) {

          if (dest[s]) {
            //console.log('using from dest -- ' + s);
          } else {
            dest[s] = src[s];
          }
        }
      }
    }
  };


  return Utils;
  
});
