/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import ReactDOM from 'react-dom';
import { UiProvider } from '../UiProvider';
import { uiTheme } from '../UiProvider/uiTheme';
import { ToastContainer } from './components/ToastContainer';

const CONTAINER_ID = 'toast__container';
let toastCount = 0;

const increaseCount = () => {
  ++toastCount;
  return `toast-${toastCount}`;
};

const defaultOption = {
  duration: 5,
  placement: 'top-center'
};

const toast = (description, options) => {
  const containerId = options?.containerId || CONTAINER_ID;
  let rootToast;
  let existingElement = document.getElementById(containerId);

  if (existingElement) {
    rootToast = existingElement;
  } else {
    const el = document.createElement('div');
    el.id = CONTAINER_ID;

    if (document.body !== null) {
      document.body.appendChild(el);
    }

    rootToast = el;
  }

  const counter = increaseCount();

  const toast = { id: counter, description, ...defaultOption, ...options };

  ReactDOM.render(
    <UiProvider theme={options && options.theme ? options.theme : uiTheme.getTheme()}>
      <Global
        styles={css`
          #${containerId} {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      />
      <ToastContainer toast={toast} />
    </UiProvider>,
    rootToast
  );
};

toast.primary = (description, options) => toast(description, { ...options, variant: 'primary' });
toast.info = (description, options) => toast(description, { ...options, variant: 'info' });
toast.success = (description, options) => toast(description, { ...options, variant: 'success' });
toast.warning = (description, options) => toast(description, { ...options, variant: 'warning' });
toast.danger = (description, options) => toast(description, { ...options, variant: 'danger' });
toast.loading = (description, options) => toast(description, { ...options, variant: 'loading' });

export { toast };
