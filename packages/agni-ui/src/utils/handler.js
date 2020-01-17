export const wrapEvent = (theirHandler, ourHandler) => event => {
  if (theirHandler) {
    theirHandler(event);
  }

  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
};

/**
 * Short code for DOM add event listener
 */
export const addEvent = (obj, ...args) => obj.addEventListener(...args);

/**
 * Short code for DOM remove event listener
 */
export const removeEvent = (obj, ...args) => obj.removeEventListener(...args);
