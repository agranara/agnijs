/**
 * Thanks to 'dom-helpers' team
 *
 * Original Source: https://github.com/react-bootstrap/dom-helpers/blob/master/src/scrollbarSize.ts
 */

import { canUseDOM } from 'exenv';

let scrollbarSize = 17;

function getScrollbarSize(recalc) {
  if ((!scrollbarSize && scrollbarSize !== 0) || recalc) {
    if (canUseDOM) {
      const scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return scrollbarSize;
}

export { getScrollbarSize };
