import { findDOMNode } from 'react-dom';

function getContainer(container) {
  const usedContainer = typeof container === 'function' ? container() : container;
  // eslint-disable-next-line react/no-find-dom-node
  return findDOMNode(usedContainer);
}

export { getContainer };
