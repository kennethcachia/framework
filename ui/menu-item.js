
/*
 * Menu Item
 */
var MenuItem = Create({

  _attrs: {
    label: null,
    container: '<div class="menu-item"></div>',
    template: '<div class="menu-item-title">{{label}}</div>',
    mergeData: ['label']
  }

}, View);
