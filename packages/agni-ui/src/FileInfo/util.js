/**
 * Simple map file size converter
 *
 * @param {number} fileSize
 * @return {string} Humanize file size
 */
export function fileSizeConvert(fileSize) {
  if (typeof fileSize === 'undefined' || fileSize === null || Number.isNaN(fileSize)) {
    return fileSize || '';
  }

  const str = fileSize.toFixed(0);

  if (str.length < 3) {
    return fileSize.toFixed(2) + ' B';
  } else if (str.length < 6) {
    return (fileSize / 1e3).toFixed(2) + ' KB';
  } else if (str.length < 9) {
    return (fileSize / 1e6).toFixed(2) + ' MB';
  } else if (str.length < 12) {
    return (fileSize / 1e9).toFixed(2) + ' GB';
  } else if (str.length < 15) {
    return (fileSize / 1e12).toFixed(2) + ' TB';
  }
  return fileSize.toFixed(2) + ' B';
}
