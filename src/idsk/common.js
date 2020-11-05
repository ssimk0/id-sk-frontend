/**
* Toggle class
* @param {object} node element
* @param {string} className to toggle
*/
export function toggleClass(node, className) {
    if (node.className.indexOf(className) > 0) {
        node.className = node.className.replace(' ' + className, '');
    } else {
        node.className += ' ' + className;
    }
}