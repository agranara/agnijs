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
      keepInsertedFile = true,
      colSmSize = 1,
      colMdSize = 2,
      colLgSize = 3,
      colXlSize = 4,
      initialFiles,
      getInitialFileKey = defaultKeyGetter,
      getInitialFileName = defaultNameGetter,
      getInitialFileSize = defaultSizeGetter,
      placeholder = 'Drag or click to upload files',
      dragPlaceholder = 'Drop here',
      onClickItem,
      onClearItem,
      onClearInitial,
      ...restProps
    },
    forwardedRef
  ) => {
    const [keepFiles, setKeepFiles] = useState({
      acceptedFiles: [],
      rejectedFiles: []
    });

    const handleDrop = useCallback(
      (dropProps, ev) => {
        const result = keepInsertedFile
          ? {
              ...keepFiles,
              acceptedFiles: [...keepFiles.acceptedFiles, ...dropProps.acceptedFiles],
              rejectedFiles: [...keepFiles.rejectedFiles, ...dropProps.rejectedFiles]
            }
          : dropProps;

        setKeepFiles(result);

        if (onDrop) {
          onDrop(result, ev);
        }

        if (onChange) {
          onChange(
            result.acceptedFiles.map(item => item.file),
            ev
          );
        }
      },
      [keepInsertedFile, onDrop, onChange, keepFiles]
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

    useImperativeHandle(forwardedRef, () => ({ promptDialog }), [promptDialog]);

    const handleClearItem = useCallback(
      (item, index) => {
        const result = {
          ...keepFiles,
          acceptedFiles: keepFiles.acceptedFiles.filter((__, i) => i !== index)
        };

        setKeepFiles(result);

        if (onChange) onChange(result.acceptedFiles.map(item => item.file));
        if (onClearItem) onClearItem(item, index);
      },
      [keepFiles, onChange, onClearItem]
    );

    const handleClearAll = useCallback(() => {
      const result = {
        ...keepFiles,
        acceptedFiles: [],
        rejectedFiles: []
      };

      setKeepFiles(result);
      if (onChange) onChange(result.acceptedFiles);
    }, [keepFiles, onChange]);

    const handleClearInitial = useCallback(
      (item, index) => {
        if (onClearInitial) onClearInitial(item, index);
      },
      [onClearInitial]
    );

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
          <InputInitialPreview
            isDragged={state.isDragged}
            dragPlaceholder={dragPlaceholder}
            placeholder={placeholder}
            {...restProps}
          />
        </InputDropable>
        <PseudoBox d="flex" flexDir="row" mt={1} mb={2} alignItems="center">
          <Text fontWeight="semibold" lineHeight="normal">
            Files to upload
          </Text>
          {keepFiles.acceptedFiles.length > 0 && (
            <PseudoBox
              ml={2}
              pl={2}
              borderLeftWidth="1px"
              d="flex"
              flexDir="row"
              alignItems="center"
            >
              <Button
                variant="link"
                variantColor="danger"
                onClick={handleClearAll}
                title="Remove all files from uploader"
              >
                Remove All
              </Button>
            </PseudoBox>
          )}
        </PseudoBox>
        <FileList
          files={keepFiles.acceptedFiles}
          iconSize="36px"
          colSmSize={colSmSize}
          colMdSize={colMdSize}
          colLgSize={colLgSize}
          colXlSize={colXlSize}
          getFileKey={item => item._uid}
          getFileName={item => item.file.name}
          getFileSize={item => item.file.size}
          onClick={onClickItem}
        >
          {(item, index) => {
            return (
              <PseudoBox lineHeight="none" mb={1}>
                <Button
                  variant="link"
                  variantColor="danger"
                  size="xs"
                  onClick={() => handleClearItem(item, index)}
                  title="Remove file from uploader"
                >
                  Remove
                </Button>
              </PseudoBox>
            );
          }}
        </FileList>
        {Array.isArray(initialFiles) && initialFiles.length > 0 && (
          <Fragment>
            <Text mt={1} mb={2} fontWeight="semibold">
              Files already uploaded
            </Text>
            <FileList
              files={initialFiles}
              iconSize="36px"
              colSmSize={colSmSize}
              colMdSize={colMdSize}
              colLgSize={colLgSize}
              colXlSize={colXlSize}
              getFileKey={getInitialFileKey}
              getFileName={getInitialFileName}
              getFileSize={getInitialFileSize}
              onClick={onClickItem}
            >
              {(item, index) => {
                return (
                  <PseudoBox lineHeight="none" mb={1}>
                    <Button
                      variant="link"
                      variantColor="danger"
                      size="xs"
                      onClick={() => handleClearInitial(item, index)}
                      title="Delete uploaded file"
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
