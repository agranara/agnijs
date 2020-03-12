/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, useImperativeHandle, useCallback, useState, Fragment } from 'react';
import cn from 'classnames';
import useUpload from '../useUpload';
import { FileList } from '../../FileInfo';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { PseudoBox } from '../../PseudoBox';
import { InputInitialPreview } from './InputInitialPreview';
import { InputDropable } from './InputDropable';

const defaultListSize = {
  sm: 24,
  md: 12,
  lg: 12,
  xl: 6
};

const defaultKeyGetter = (_, index) => index;
const defaultNameGetter = item => item.name;
const defaultSizeGetter = item => item.size;

/**
 * Input Upload for multiple files
 */
const InputUploadMulti = forwardRef(
  (
    {
      className,
      accept,
      disabled = false,
      readOnly = false,
      height = 150,
      maxSize = Infinity,
      minSize = 0,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      onDialogCancel,
      isDocumentDroppable = false,
      isBubblingDisabled = false,
      onChange,
      initialFiles,
      keepInsertedFile = true,
      listColSize = defaultListSize,
      onClearItem,
      onClickItem,
      getInitialFileKey = defaultKeyGetter,
      getInitialFileName = defaultNameGetter,
      getInitialFileSize = defaultSizeGetter
    },
    forwardedRef
  ) => {
    useImperativeHandle(forwardedRef, () => ({ promptDialog }), [promptDialog]);

    const [keepFiles, setKeepFiles] = useState({
      acceptedFiles: [],
      rejectedFiles: []
    });

    const handleDrop = useCallback(
      (dropProps, ev) => {
        let allResult;
        setKeepFiles(oldKeeps => {
          const res = {
            ...oldKeeps,
            acceptedFiles: [...oldKeeps.acceptedFiles, ...dropProps.acceptedFiles],
            rejectedFiles: [...oldKeeps.rejectedFiles, ...dropProps.rejectedFiles]
          };

          allResult = res;

          if (keepInsertedFile) {
            return res;
          }
          return dropProps.acceptedFiles;
        });

        if (onDrop) {
          onDrop(allResult, ev);
        }

        if (onChange) {
          onChange(allResult, ev);
        }
      },
      [keepInsertedFile, onDrop, onChange]
    );

    const { getInputProps, getRootProps, isInteractive, state, promptDialog } = useUpload({
      isDocumentDroppable,
      isBubblingDisabled,
      multiple: true,
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

    const handleClearItem = (item, index) => {
      let result;
      setKeepFiles(oldFiles => {
        result = {
          ...oldFiles,
          acceptedFiles: oldFiles.acceptedFiles.filter((__, i) => i !== index)
        };

        return result;
      });

      if (onChange) onChange(result);
      if (onClearItem) onClearItem(item, index);
    };

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
          <InputInitialPreview isDragged={state.isDragged} />
        </InputDropable>
        {keepFiles.acceptedFiles.length > 0 && (
          <Fragment>
            <Text my={2} fontWeight="semibold">
              Files to upload
            </Text>
            <FileList
              files={keepFiles.acceptedFiles}
              iconSize="36px"
              colSmSize={listColSize.sm}
              colMdSize={listColSize.md}
              colLgSize={listColSize.lg}
              colXlSize={listColSize.xl}
              getFileKey={item => item._uid}
              getFileName={item => item.file.name}
              getFileSize={item => item.file.size}
              onClick={onClickItem}
            >
              {(_, index) => {
                return (
                  <PseudoBox lineHeight="none" mb={1}>
                    <Button
                      variant="link"
                      variantColor="danger"
                      size="xs"
                      onClick={ev => handleClearItem(ev, index)}
                      title="Delete your file"
                    >
                      Remove
                    </Button>
                  </PseudoBox>
                );
              }}
            </FileList>
          </Fragment>
        )}
        {Array.isArray(initialFiles) && initialFiles.length > 0 && (
          <Fragment>
            <Text my={2} fontWeight="semibold">
              Files already uploaded
            </Text>
            <FileList
              files={initialFiles}
              iconSize="36px"
              colSmSize={listColSize.sm}
              colMdSize={listColSize.md}
              colLgSize={listColSize.lg}
              colXlSize={listColSize.xl}
              getFileKey={getInitialFileKey}
              getFileName={getInitialFileName}
              getFileSize={getInitialFileSize}
              onClick={onClickItem}
            >
              {(_, index) => {
                return (
                  <PseudoBox lineHeight="none" mb={1}>
                    <Button
                      variant="link"
                      variantColor="danger"
                      size="xs"
                      onClick={ev => handleClearItem(ev, index)}
                      title="Delete your file"
                    >
                      Remove
                    </Button>
                  </PseudoBox>
                );
              }}
            </FileList>
          </Fragment>
        )}
      </div>
    );
  }
);

InputUploadMulti.displayName = 'InputUploadMulti';

export { InputUploadMulti };
