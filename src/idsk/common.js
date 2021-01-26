/**
 * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
 * This seems to fail in IE8, requires more investigation.
 * See: https://github.com/imagitama/nodelist-foreach-polyfill
 */
export function nodeListForEach(nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback);
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes);
  }
}

/**
 * Toggle class
 * @param {object} node element
 * @param {string} className to toggle
 */
export function toggleClass(node, className) {
    if (node === null) {
        return;
    }

    if (node.className.indexOf(className) > 0) {
        node.className = node.className.replace(' ' + className, '');
    } else {
        node.className += ' ' + className;
    }
}