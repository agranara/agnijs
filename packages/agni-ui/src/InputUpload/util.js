import accepts from 'attr-accept';

function isIe(userAgent) {
  return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf('Edge/') !== -1;
}

export function isIeOrEdge(userAgent = window.navigator.userAgent) {
  return isIe(userAgent) || isEdge(userAgent);
}

export function stopPropagation(isBubblingDisabled) {
  return ev => {
    if (isBubblingDisabled) {
      ev.stopPropagation();
    }
  };
}

export function isEventContainFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
  return Array.prototype.some.call(
    event.dataTransfer.types,
    type => type === 'Files' || type === 'application/x-moz-file'
  );
}

export function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === 'function') {
    return event.isPropagationStopped();
  }
  return false;
}

function isNotEmpty(variable) {
  return variable && variable !== null;
}

export function isFileAccepted(file, accept) {
  if (!isNotEmpty(file)) return true;

  return file.type === 'application/x-moz-file' || accepts(file, accept);
}

export function isFileInRangeSize(file, min, max) {
  if (isNotEmpty(file) && isNotEmpty(file.size)) {
    if (isNotEmpty(min) && isNotEmpty(max)) {
      return file.size >= min && file.size <= max;
    }
    if (isNotEmpty(min)) {
      return file.size >= min;
    }
    if (isNotEmpty(max)) {
      return file.size <= max;
    }
  }
  return true;
}

export function isImage(fileName, fileType) {
  if (fileType) {
    return (
      ['image/jpg', 'image/jpeg', 'image/svg+xml', 'image/gif', 'image/png'].indexOf(fileType) > -1
    );
  }

  if (fileName) {
    const splitFilename = fileName.split('.');
    if (splitFilename.length > 1) {
      const ext = splitFilename[splitFilename.length - 1];
      return ['jpg', 'jpeg', 'svg', 'gif', 'png'].indexOf(ext) > -1;
    }
  }

  return false;
}
