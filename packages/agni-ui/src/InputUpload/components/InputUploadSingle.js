/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useState,
  Fragment,
  useEffect
} from 'react';
import cn from 'classnames';
import { FiX } from 'react-icons/fi';
import useUpload from '../useUpload';
import { Button } from '../../Button';
import { isImage } from '../util';
import { centerPreviewCss, backgroundImageCss } from '../style';
import { FileItem } from '../../FileInfo/components/FileItem';
import { InputInitialPreview } from './InputInitialPreview';
import { InputDropable } from './InputDropable';

const InputFilePreview = ({
  fileName,
  fileType,
  fileSize,
  fileUrl,
  showImagePreview,
  height,
  maxPreviewWidth
}) => {
  if (!fileName || fileName === null) {
    return null;
  }

  const isUseBackground = fileUrl && showImagePreview && isImage(fileName, fileType);

  return (
    <div className="input-upload__preview" css={centerPreviewCss}>
      <FileItem
        fileName={fileName}
        fileSize={fileSize}
        direction="column"
        infoDirection="row"
        iconSize="50px"
        icon={
          isUseBackground ? (
            <div
              aria-label={fileName}
              css={css([backgroundImageCss, { height: height - 28, maxWidth: maxPreviewWidth }])}
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

const initialFileState = {
  previewUrl: undefined,
  name: undefined,
  size: undefined,
  path: undefined
};

/**
 * Input Upload
 */
const InputUploadSingle = forwardRef(
  (
    {
      className,
      accept,
      disabled = false,
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
      initialFileName,
      initialFileSize,
      initialFilePath,
      showImagePreview = true,
      maxPreviewWidth = 320,
      placeholder = 'Drag or click to upload files',
      dragPlaceholder = 'Drop here',
      ...restProps
    },
    forwardedRef
  ) => {
    const getInitialFile = useCallback(() => {
      const res = { ...initialFileState };

      if (initialFileName) {
        res.name = initialFileName;
      }
      if (initialFileSize) {
        res.size = initialFileSize;
      }
      if (initialFilePath) {
        res.previewUrl = initialFilePath;
        res.path = initialFilePath;
      }
      return res;
    }, [initialFileName, initialFilePath, initialFileSize]);

    const [keepFile, setKeepFile] = useState(() => {
      return getInitialFile();
    });

    const prevFilePath = useRef(initialFilePath);

    const fileReader = useRef(new FileReader());

    const readFile = item => {
      return new Promise((resolve, reject) => {
        if (!item) {
          resolve(undefined);
        } else {
          fileReader.current.onload = e => {
            resolve(e.target.result);
          };

          fileReader.current.onerror = () => {
            fileReader.current.abort();
            reject('Error while reading file');
          };

          fileReader.current.readAsDataURL(item.file);
        }
      });
    };

    const handleDrop = useCallback(
      (dropProps, ev) => {
        const { acceptedFiles } = dropProps;

        const onlyImagesPreviews =
          acceptedFiles.length > 0 ? acceptedFiles.filter(item => isImage(item.file.type)) : [];

        const previewItem = onlyImagesPreviews[Math.min(onlyImagesPreviews.length - 1, 0)];

        if (onDrop) {
          onDrop(dropProps, ev);
        }

        readFile(previewItem)
          .then(previewFile => {
            // Only set last file as preview in upload single file
            const res = {
              previewUrl: undefined,
              name: dropProps.acceptedFiles[0].file.name,
              size: dropProps.acceptedFiles[0].file.size,
              path: dropProps.acceptedFiles[0].file.path
            };
            if (showImagePreview) {
              res.previewUrl = previewFile || undefined;
            }

            setKeepFile(res);

            if (onChange) {
              onChange(dropProps.acceptedFiles[0].file, ev, dropProps);
            }
          })
          .catch();
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
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop: handleDrop,
      onDialogCancel
    });

    useImperativeHandle(forwardedRef, () => ({ promptDialog }), [promptDialog]);

    useEffect(() => {
      if (initialFilePath !== prevFilePath.current) {
        prevFilePath.current = initialFilePath;
        setKeepFile(getInitialFile());
      }
    }, [getInitialFile, initialFilePath]);

    const handleClearItem = useCallback(
      ev => {
        ev.preventDefault();
        ev.stopPropagation();

        prevFilePath.current = initialFileState.path;
        setKeepFile(initialFileState);

        if (onChange) {
          onChange(null, ev, {
            acceptedFiles: [],
            rejectedFiles: []
          });
        }
      },
      [onChange]
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
          {...restProps}
        >
          {keepFile.name ? (
            <Fragment>
              <InputFilePreview
                fileName={keepFile.name}
                fileSize={keepFile.size}
                fileUrl={keepFile.previewUrl}
                isDragged={state.isDragged}
                showImagePreview={showImagePreview}
                height={height}
                maxPreviewWidth={maxPreviewWidth}
              />
              <Button
                pos="absolute"
                top={2}
                right={2}
                p={1}
                size="xs"
                variantColor="danger"
                onClick={handleClearItem}
                title="Click to remove file"
              >
                <FiX />
              </Button>
            </Fragment>
          ) : (
            <InputInitialPreview
              isDragged={state.isDragged}
              dragPlaceholder={dragPlaceholder}
              placeholder={placeholder}
            />
          )}
        </InputDropable>
      </div>
    );
  }
);

InputUploadSingle.displayName = 'InputUploadSingle';

export { InputUploadSingle };
