import { findDOMNode } from 'react-dom';

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  return findDOMNode(container);
}

export { getContainer };
