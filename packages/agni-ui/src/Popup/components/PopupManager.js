/* eslint-disable no-param-reassign */
/**
 * Thanks to 'material-ui' team
 *
 * Original Source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Modal/ModalManager.js
 */

import { hasVerticalScroll } from '../../_utils/hasVerticalScroll';
import { getScrollbarSize } from '../../_utils/getScrollbarSize';
import { ownerDocument } from '../../_utils/ownerDocument';

function ariaHidden(node, show) {
  if (!node) return;

  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(node) {
  return parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;
}

function ariaHiddenSiblings(container, mountNode, currentNode, nodesToExclude = [], show) {
  const blacklist = [mountNode, currentNode, ...nodesToExclude];
  const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];

  [].forEach.call(container.children, node => {
    if (
      node.nodeType === 1 &&
      blacklist.indexOf(node) === -1 &&
      blacklistTagNames.indexOf(node.tagName) === -1
    ) {
      ariaHidden(node, show);
    }
  });
}

function findIndexOf(containerInfo, callback) {
  let idx = -1;
  containerInfo.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}

function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const restorePaddings = [];
  const { container } = containerInfo;
  let fixedNodes;

  if (!props.isScrollLockDisabled) {
    if (hasVerticalScroll(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize();

      restoreStyle.push({
        value: container.style.paddingRight,
        key: 'padding-right',
        el: container
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      container.style['padding-right'] = `${getPaddingRight(container) + scrollbarSize}px`;

      // .mui-fixed is a global helper.
      fixedNodes = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedNodes, node => {
        restorePaddings.push(node.style.paddingRight);
        node.style.paddingRight = `${getPaddingRight(node) + scrollbarSize}px`;
      });
    }

    // Improve Gatsby support
    // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
    const parent = container.parentElement;
    const scrollContainer =
      parent.nodeName === 'HTML' && window.getComputedStyle(parent)['overflow-y'] === 'scroll'
        ? parent
        : container;

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      key: 'overflow',
      el: scrollContainer
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, (node, i) => {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    restoreStyle.forEach(({ value, el, key }) => {
      if (value) {
        el.style.setProperty(key, value);
      } else {
        el.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, node => {
    if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(node);
    }
  });
  return hiddenSiblings;
}

/////////////////////////////////////////

class PopupManager {
  constructor() {
    this.popups = [];

    this.containers = [];
  }

  add(popup, container) {
    let popupIndex = this.popups.indexOf(popup);
    if (popupIndex !== -1) {
      return popupIndex;
    }

    popupIndex = this.popups.length;
    this.popups.push(popup);

    // If the popup we are adding is already in the DOM.
    if (popup.popupRef) {
      ariaHidden(popup.popupRef, false);
    }

    const hiddenSiblingNodes = getHiddenSiblings(container);
    ariaHiddenSiblings(container, popup.mountNode, popup.popupRef, hiddenSiblingNodes, true);

    const containerIndex = findIndexOf(this.containers, item => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].popups.push(popup);
      return popupIndex;
    }

    this.containers.push({
      popups: [popup],
      container,
      restore: null,
      hiddenSiblingNodes
    });

    return popupIndex;
  }

  mount(popup, props) {
    const containerIndex = findIndexOf(this.containers, item => item.popups.indexOf(popup) !== -1);
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(popup) {
    const popupIndex = this.popups.indexOf(popup);

    if (popupIndex === -1) {
      return popupIndex;
    }

    const containerIndex = findIndexOf(this.containers, item => item.popups.indexOf(popup) !== -1);
    const containerInfo = this.containers[containerIndex];

    containerInfo.popups.splice(containerInfo.popups.indexOf(popup), 1);
    this.popups.splice(popupIndex, 1);

    // If that was the last popup in a container, clean up the container.
    if (containerInfo.popups.length === 0) {
      // The popup might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (popup.popupRef) {
        // In case the popup wasn't in the DOM yet.
        ariaHidden(popup.popupRef, true);
      }

      ariaHiddenSiblings(
        containerInfo.container,
        popup.mountNode,
        popup.popupRef,
        containerInfo.hiddenSiblingNodes,
        false
      );
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top popup is visible to a screen reader.
      const nextTop = containerInfo.popups[containerInfo.popups.length - 1];
      // as soon as a popup is adding its popupRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when popup was unmounted before popupRef gets null
      if (nextTop.popupRef) {
        ariaHidden(nextTop.popupRef, false);
      }
    }

    return popupIndex;
  }

  isTopPopup(popup) {
    return this.popups.length > 0 && this.popups[this.popups.length - 1] === popup;
  }
}

export { PopupManager, ariaHidden };
