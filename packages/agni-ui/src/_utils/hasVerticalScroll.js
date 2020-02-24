import { ownerDocument } from './ownerDocument';
import { ownerWindow } from './ownerWindow';

function hasVerticalScroll(container) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(doc).innerHeight > doc.documentElement.clientHeight;
  }

  return container.scrollHeight > container.clientHeight;
}

export { hasVerticalScroll };
