/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { forwardRef, useImperativeHandle, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import useUpload from '../useUpload';
import { isImage } from '../util';
import { centerPreviewCss, backgroundImageCss } from '../style';
import { FileItem } from '../../FileInfo/components/FileItem';
import { InputInitialPreview } from './InputInitialPreview';
import { InputDropable } from './InputDropable';

const InputFilePreview = ({ file, fileUrl, showImagePreview, height, maxViewWidth }) => {
  if (!file || file === null) {
    return null;
  }

  const isUseBackground = fileUrl && showImagePreview && isImage(file.type);

  return (
    <div className="input-upload__preview" css={centerPreviewCss}>
      <FileItem
        fileName={file.name}
        fileSize={file.size}
        direction="column"
        infoDirection="row"
        iconSize="50px"
        icon={
          isUseBackground ? (
            <div
              aria-label={file.name}
              css={css([backgroundImageCss, { height: height - 28, maxWidth: maxViewWidth }])}
              style={{ backgroundImage: `url(${fileUrl})` }}
            />
          ) : (
            undefined
          )
        }
      />
    </div>
  );
};
InputFilePreview.displayName = 'InputFilePreview';

/////////////////////////////////////////////

/**
 * Input Upload
 */
const InputUploadSingle = forwardRef(
  (
    {
      className,
      accept,
      disabled = false,
      readOnly = false,
      height = 150,
      minSize = 0,
      maxSize = Infinity,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      onDialogCancel,
      isDocumentDroppable = false,
      isBubblingDisabled = false,
      onChange,
      initialFile,
      initialFileUrl,
      showImagePreview = true,
      maxViewWidth = 320
    },
    forwardedRef
  ) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const fileReader = useRef(new FileReader());

    const readFile = item => {
      return new Promise((resolve, reject) => {
        fileReader.current.onload = e => {
          resolve(e.target.result);
        };

        fileReader.current.onerror = () => {
          fileReader.current.abort();
          reject('Error while reading file');
        };

        fileReader.current.readAsDataURL(item.file);
      });
    };

    const handleDrop = useCallback(
      (dropProps, ev) => {
        const { acceptedFiles } = dropProps;

        const onlyImagesPreview = acceptedFiles.filter(item => isImage(item.file.type));

        Promise.all(onlyImagesPreview.map(readFile)).then(files => {
          // Only set last files as preview file in upload single file
          let dataUrl = undefined;
          if (showImagePreview) {
            dataUrl = files.length > 0 ? files[files.length - 1] : undefined;
            setPreviewUrl(dataUrl);
          }

          if (onDrop) {
            onDrop(dropProps, ev);
          }

          if (onChange) {
            onChange(
              {
                ...dropProps,
                dataUrl
              },
              ev
            );
          }
        });
      },
      [onDrop, onChange, showImagePreview]
    );

    const { getInputProps, getRootProps, isInteractive, state, promptDialog } = useUpload({
      isDocumentDroppable,
      isBubblingDisabled,
      multiple: false,
      minSize,
      maxSize,
      accept,
      disabled,
      readOnly,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop: handleDrop,
      onDialogCancel
    });

    useImperativeHandle(forwardedRef, () => ({ promptDialog }), [promptDialog]);

    const item = state.acceptedFiles[0] ? state.acceptedFiles[0].file : initialFile;
    const fileUrl = previewUrl || initialFileUrl;

    return (
      <div className={cn(['input-upload', className])} css={{ position: 'relative' }}>
        <InputDropable
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          height={height}
          isInteractive={isInteractive}
          isDragged={state.isDragged}
          isFocused={state.isFocused}
        >
          {item ? (
            <InputFilePreview
              file={item}
              fileUrl={fileUrl}
              isDragged={state.isDragged}
              showImagePreview={showImagePreview}
              height={height}
              maxViewWidth={maxViewWidth}
            />
          ) : (
            <InputInitialPreview isDragged={state.isDragged} />
          )}
        </InputDropable>
      </div>
    );
  }
);

InputUploadSingle.displayName = 'InputUploadSingle';

export { InputUploadSingle };
