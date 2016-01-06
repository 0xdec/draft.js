// TODO: come up with a better location for methods
var methods = {};

// TODO: let Draft extend Container (get rid of custom push() and units())
var Draft = this.Draft = class Draft {
  constructor(element) {
    this.elements = {};
    this.children = [];

    // TODO: get rid of DOM dependence
    if (element) {
      // Ensure the presence of a DOM element
      this.dom = typeof element === 'string' ?
        document.getElementById(element) :
        element;
    }
  }

  push(parent, child) {
    // Add a reference to the child's parent
    child.parent = parent;

    // Add the child to the end of the children array
    parent.children.push(child);

    // Add the child to its type array
    var type = elementType(child);
    this.elements[type] = this.elements[type] || [];
    this.elements[type].push(child);

    // Set the child's basic properties
    child.prop({
      type: type,
      id: elementID(child)
    });

    return child;
  }

  units() {
    return defaults.units;
  }

  // This function takes an element and copies the supplied methods to it
  static extend(element, source) {
    if (typeof source === 'string') {
      Draft.extend(element, methods[source]);
    } else if (typeof source === 'object') {
      for (let key in source) {
        if (typeof source[key] === 'function') {
          element.prototype[key] = source[key];
        } else {
          Draft.extend(element, source[key]);
        }
      }
    }

    return source;
  }

  // Construct a unique ID from the element's type and ID
  static domID(element) {
    return 'DraftJS_' +
      element.properties.type + '_' +
      zeroPad(element.properties.id, 4);
  }

  // Using standard 96dpi resolution
  // TODO: configurable dpi setting
  // TODO: safety checks
  static px(length) {
    var num = parseFloat(length, 10);
    var units = typeof length === 'string' ? length.slice(-2) : 'px';

    // Remain unchanged if units are already px
    if (units == 'px') {
      return num;
    }
    // Points and picas (pt, pc)
    else if (units == 'pt') {
      return Draft.px(num / 72 + 'in');
    } else if (units == 'pc') {
      return Draft.px(num * 12 + 'pt');
    }
    // Imperial units (in, ft, yd, mi)
    else if (units == 'in') {
      return num * 96;
    } else if (units == 'ft') {
      return Draft.px(num * 12 + 'in');
    } else if (units == 'yd') {
      return Draft.px(num * 3 + 'ft');
    } else if (units == 'mi') {
      return Draft.px(num * 1760 + 'yd');
    }
    // Metric units (mm, cm, m, km)
    else if (units.endsWith('m')) {
      if (units == 'mm') {
        num *= 1;
      } else if (units == 'cm') {
        num *= 10;
      } else if (units == 'km') {
        num *= 1000000;
      }

      return Draft.px(num / 25.4 + 'in');
    }
  }
};
