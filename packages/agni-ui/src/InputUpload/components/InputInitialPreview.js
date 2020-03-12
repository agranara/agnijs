/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FiFilePlus, FiUploadCloud } from 'react-icons/fi';
import { centerPreviewCss, centerIconCss } from '../style';

/////////////////////////////////////////////////////////////////////

const InputInitialPreview = ({ isDragged }) => {
  return (
    <div css={centerPreviewCss}>
      <div css={centerIconCss}>
        {isDragged ? <FiFilePlus strokeWidth="1" /> : <FiUploadCloud strokeWidth="1" />}
      </div>
      <p css={{ paddingTop: 8, paddingBottom: 8 }}>
        {isDragged ? 'Drop here' : 'Drag or click to upload pictures'}
      </p>
    </div>
  );
};

InputInitialPreview.displayName = 'InputInitialPreview';

export { InputInitialPreview };
