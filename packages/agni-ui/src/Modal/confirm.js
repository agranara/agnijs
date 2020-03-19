import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { Text } from '../Text';
import { Button } from '../Button';
import { UiProvider } from '../UiProvider';
import { uiTheme } from '../UiProvider/uiTheme';
import { PseudoBox } from '../PseudoBox';
import { Modal, ModalBody, ModalFooter } from './components';

const Confirmation = forwardRef(
  (
    {
      title,
      icon = <FiAlertCircle />,
      content,
      handleOkay,
      okayProps,
      okayText = 'Yes',
      handleCancel,
      cancelProps,
      cancelText = 'No',
      handleClose,
      destroy
    },
    forwardedRef
  ) => {
    const [isOpen, setOpen] = useState(true);
    const [isLoadingOkay, setLoadingOkay] = useState(false);
    const [isLoadingCancel, setLoadingCancel] = useState(false);
    const prevOpen = useRef(true);

    const timeout = useRef(null);

    useImperativeHandle(
      forwardedRef,
      () => ({
        close: () => {
          setOpen(false);
        },
        toggleLoadingOkay: () => {
          setLoadingOkay(oldLoading => !oldLoading);
        },
        toggleLoadingCancel: () => {
          setLoadingCancel(oldLoading => !oldLoading);
        }
      }),
      []
    );

    useEffect(() => {
      return () => {
        if (timeout.current !== null) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          clearTimeout(timeout.current);
        }
      };
    }, []);

    const handleAnimationStart = () => {
      if (isOpen && prevOpen.current !== isOpen) {
        prevOpen.current = isOpen;
      }
    };

    const handleAnimationComplete = () => {
      if (!isOpen && prevOpen.current !== isOpen) {
        prevOpen.current = isOpen;
        timeout.current = setTimeout(() => {
          destroy();
        }, 50);
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        closeOnBackdropClick={false}
        onClose={handleClose}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
        className="confirmation"
      >
        <ModalBody pb={1} pt={6} px={6}>
          <PseudoBox d="flex" flexDir="row">
            <PseudoBox
              fontSize="32px"
              width="32px"
              height="32px"
              lineHeight="none"
              color="warning.500"
            >
              {icon}
            </PseudoBox>
            <PseudoBox pl={3}>
              <Text fontSize="lg" mb={1} wordBreak="break-word" fontWeight="medium">
                {title}
              </Text>
              <Text wordBreak="break-word">{content}</Text>
            </PseudoBox>
          </PseudoBox>
        </ModalBody>
        <ModalFooter borderTopWidth={0} pt={1} pb={4} px={6} textAlign="right">
          <Button
            variant="solid"
            variantColor="primary"
            mx={1}
            {...okayProps}
            isLoading={isLoadingOkay}
            isDisabled={isLoadingOkay || isLoadingCancel}
            onClick={handleOkay}
          >
            {okayText}
          </Button>
          <Button
            variant="solid"
            variantColor="danger"
            mx={1}
            {...cancelProps}
            isLoading={isLoadingCancel}
            isDisabled={isLoadingOkay || isLoadingCancel}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

Confirmation.displayName = 'Confirmation';

//////////////////////////////////////////////

const confirm = ({ onOkay, onCancel, ...restProps }) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  let nodeRef = null;

  const callbackRef = node => {
    nodeRef = node;
  };

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult) {
      div.parentNode.removeChild(div);
    }
  }

  function handleClose() {
    nodeRef.close();
  }

  async function handleOkay() {
    nodeRef.toggleLoadingOkay();
    if (onOkay) {
      await onOkay();
    }
    nodeRef.toggleLoadingOkay();
    handleClose();
  }

  async function handleCancel() {
    nodeRef.toggleLoadingCancel();
    if (onCancel) {
      await onCancel();
    }
    nodeRef.toggleLoadingCancel();
    handleClose();
  }

  ReactDOM.render(
    <UiProvider theme={uiTheme.getTheme()}>
      <Confirmation
        {...restProps}
        ref={callbackRef}
        handleOkay={handleOkay}
        handleCancel={handleCancel}
        handleClose={handleClose}
        destroy={destroy}
      />
    </UiProvider>,
    div
  );

  return destroy;
};

export { confirm };
