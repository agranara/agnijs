import { useEffect, useCallback, useState, useRef } from 'react';
import { fromEvent } from 'file-selector';
import { isKeyboardKey } from '../keyboard';
import {
  stopPropagation,
  isEventContainFiles,
  isPropagationStopped,
  isIeOrEdge,
  isFileAccepted,
  isFileInRangeSize
} from './util';

let fileCount = 0;
const increaseCount = () => {
  ++fileCount;
  return `upload_file_${fileCount}`;
};

function useUpload({
  isDocumentDroppable,
  isBubblingDisabled,
  multiple,
  minSize,
  maxSize,
  accept,
  disabled,
  readOnly,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onDialogCancel
  // onChange
}) {
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  const rootRef = useRef(null);
  const dragTargetsRef = useRef([]);

  const [state, dispatch] = useState(() => ({
    isFocused: false,
    isDialogOpened: false,
    isDragged: false,
    draggedFiles: [],
    acceptedFiles: [],
    rejectedFiles: []
  }));

  // Programmatically open dialog
  const promptDialog = useCallback(() => {
    if (inputRef.current) {
      dispatch(oldState => ({
        ...oldState,
        isDialogOpened: true
      }));
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, []);

  // On mount, listen to window focus
  // On unmount, remove event listener
  useEffect(() => {
    const onWindowFocus = () => {
      if (state.isDialogOpened) {
        timeoutRef.current = setTimeout(() => {
          if (inputRef.current) {
            const { files } = inputRef.current;

            if (!files.length) {
              dispatch(oldState => ({
                ...oldState,
                isDialogOpened: false
              }));

              if (typeof onDialogCancel === 'function') {
                onDialogCancel();
              }
            }
          }
        }, 300);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', onWindowFocus, false);
      return () => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        window.removeEventListener('focus', onWindowFocus, false);
      };
    }
  }, [onDialogCancel, state.isDialogOpened]);

  // On mount, register document event listener drop and dragover
  // On unmount, remove event listener
  useEffect(() => {
    const handleDocumentDragOver = ev => {
      ev.preventDefault();
    };

    const handleDocumentDrop = ev => {
      if (rootRef.current && rootRef.current.contains(ev.target)) {
        return;
      }
      ev.preventDefault();
      dragTargetsRef.current = [];
    };

    if (!isDocumentDroppable) {
      document.addEventListener('dragover', handleDocumentDragOver, false);
      document.addEventListener('drop', handleDocumentDrop, false);
    }

    return () => {
      if (!isDocumentDroppable) {
        document.removeEventListener('dragover', handleDocumentDragOver);
        document.removeEventListener('drop', handleDocumentDrop);
      }
    };
  }, [isDocumentDroppable]);

  // Handle input container keyboard press
  const handleContainerKeyDown = useCallback(
    ev => {
      if (!rootRef.current || !rootRef.current.isEqualNode(ev.target)) {
        return;
      }

      if (isKeyboardKey(ev, 'Enter') || isKeyboardKey(ev, 'Space')) {
        ev.preventDefault();
        promptDialog();
      }

      if (isKeyboardKey(ev, 'Escape')) {
        dispatch(oldState => ({
          ...oldState,
          isFocused: false
        }));
      }
    },
    [promptDialog]
  );

  // handle input container focus
  const handleContainerFocus = useCallback(() => {
    dispatch(oldState => ({
      ...oldState,
      isFocused: true
    }));
  }, []);

  // Handle input container blur
  const handleContainerBlur = useCallback(() => {
    dispatch(oldState => ({
      ...oldState,
      isFocused: false
    }));
  }, []);

  // Handle click event in input container
  const handleContainerClick = useCallback(() => {
    if (isIeOrEdge()) {
      setTimeout(promptDialog, 0);
    } else {
      promptDialog();
    }
  }, [promptDialog]);

  // Handle dragenter in input container
  const handleContainerDragEnter = useCallback(
    ev => {
      ev.preventDefault();
      ev.persist();
      stopPropagation(isBubblingDisabled)(ev);

      if (dragTargetsRef.current.indexOf(ev.target) === -1) {
        dragTargetsRef.current = [...dragTargetsRef.current, ev.target];
      }

      if (isEventContainFiles(ev)) {
        Promise.resolve(fromEvent(ev)).then(draggedFiles => {
          if (isPropagationStopped(ev) && !isBubblingDisabled) {
            return;
          }

          dispatch(oldState => ({
            ...oldState,
            isDragged: true,
            draggedFiles
          }));

          if (onDragEnter) {
            onDragEnter(ev);
          }
        });
      }
    },
    [isBubblingDisabled, onDragEnter]
  );

  // Handle dragover event in input container
  const handleContainerDragOver = useCallback(
    ev => {
      ev.preventDefault();
      ev.persist();
      stopPropagation(isBubblingDisabled)(ev);

      if (ev.dataTransfer) {
        try {
          ev.dataTransfer.dropEffect = 'copy';
        } catch {}
      }

      if (isEventContainFiles(ev) && onDragOver) {
        onDragOver(ev);
      }

      return false;
    },
    [isBubblingDisabled, onDragOver]
  );

  // Handle dragleave event in input container
  const handleContainerDragLeave = useCallback(
    ev => {
      ev.preventDefault();
      ev.persist();
      stopPropagation(isBubblingDisabled)(ev);

      const targets = dragTargetsRef.current.filter(
        target => target !== ev.target && rootRef.current && rootRef.current.contains(target)
      );
      dragTargetsRef.current = targets;
      if (targets.length > 0) {
        return;
      }

      dispatch(oldState => ({
        ...oldState,
        isFocused: false,
        isDragged: false,
        draggedFiles: []
      }));

      if (isEventContainFiles(ev) && onDragLeave) {
        onDragLeave(ev);
      }
    },
    [isBubblingDisabled, onDragLeave]
  );

  // Handle drop event in input container
  const handleContainerDrop = useCallback(
    ev => {
      ev.preventDefault();
      ev.persist();
      stopPropagation(isBubblingDisabled)(ev);

      dragTargetsRef.current = [];
      dispatch(oldState => ({
        ...oldState,
        isDialogOpened: false,
        isDragged: false,
        draggedFiles: []
      }));

      if (isEventContainFiles(ev)) {
        Promise.resolve(fromEvent(ev)).then(files => {
          if (isPropagationStopped(ev) && !isBubblingDisabled) {
            return;
          }

          const acceptedFiles = [];
          const rejectedFiles = [];

          files.forEach(file => {
            if (isFileAccepted(file, accept) && isFileInRangeSize(file, minSize, maxSize)) {
              acceptedFiles.push({ file, _uid: increaseCount() });
            } else {
              rejectedFiles.push({ file, _uid: increaseCount() });
            }
          });

          if (!multiple && acceptedFiles.length > 1) {
            rejectedFiles.push(...acceptedFiles.splice(0));
          }

          dispatch(oldState => ({
            ...oldState,
            acceptedFiles,
            rejectedFiles
          }));

          if (onDrop) {
            onDrop({ acceptedFiles, rejectedFiles }, ev);
          }
        });
      }
    },
    [accept, isBubblingDisabled, maxSize, minSize, multiple, onDrop]
  );

  const isInteractive = !disabled && !readOnly;

  // Handle input type file click
  const handleInputClick = useCallback(ev => {
    ev.stopPropagation();
  }, []);

  const getRootProps = useCallback(() => {
    return {
      ref: rootRef,
      onDrop: handleContainerDrop,
      onDragEnter: handleContainerDragEnter,
      onDragOver: handleContainerDragOver,
      onDragLeave: handleContainerDragLeave,
      onFocus: handleContainerFocus,
      onBlur: handleContainerBlur,
      onKeyDown: handleContainerKeyDown,
      onClick: handleContainerClick,
      tabIndex: isInteractive ? 0 : undefined
    };
  }, [
    handleContainerBlur,
    handleContainerClick,
    handleContainerDragEnter,
    handleContainerDragLeave,
    handleContainerDragOver,
    handleContainerDrop,
    handleContainerFocus,
    handleContainerKeyDown,
    isInteractive
  ]);

  const getInputProps = useCallback(() => {
    return {
      accept,
      multiple,
      onClick: handleInputClick,
      onChange: handleContainerDrop,
      tabIndex: -1,
      type: 'file',
      autoComplete: 'off',
      ref: inputRef
    };
  }, [accept, handleContainerDrop, handleInputClick, multiple]);

  return {
    getRootProps,
    getInputProps,
    isInteractive,
    state,
    dispatch,
    promptDialog
  };
}

export default useUpload;
