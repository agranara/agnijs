import { ownerDocument } from './ownerDocument';
import { ownerWindow } from './ownerWindow';

function hasHorizontalScroll(container) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(doc).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollWidth > container.clientWidth;
}

export { hasHorizontalScroll };
