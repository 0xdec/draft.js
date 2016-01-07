// Pad a number with zeroes until the number of digits is equal to length
function zeroPad(number, length) {
  var str = '' + number;
  while (str.length < length) {
      str = '0' + str;
  }

  return str;
}

// Get the type of an element
function elementType(element) {
  for (var e in Draft) {
    if (element.constructor == Draft[e]) {
      return e.toLowerCase();
    }
  }
}

// Get a unique ID based on the number of instances of a type of element
function elementID(element) {
  return element.doc.elements[elementType(element)].length;
}

function updateDOM(element) {
  if (element.dom && element.dom.treeView) {
    var event = new CustomEvent('update', {
      detail: {
        element: element
      }
    });

    element.dom.treeView.dispatchEvent(event);
  }
  if (element.parent) {
    updateDOM(element.parent);
  }
}
