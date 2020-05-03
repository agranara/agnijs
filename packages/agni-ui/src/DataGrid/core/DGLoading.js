/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useUiTheme } from '../../UiProvider';
import { fullAbsoluteCss } from '../style';
import { Spinner } from '../../Spinner';

const DGLoading = ({ loadingData, headerHeight }) => {
  const theme = useUiTheme();
  return (
    <div css={css([fullAbsoluteCss, { marginTop: (headerHeight || 0) / 2 }])}>
      <div
        css={{
          backgroundColor: theme.colors.gray['50'],
          opacity: 0.4,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 4
        }}
      />
      <div css={css([fullAbsoluteCss, { zIndex: 5, opacity: 1, textAlign: 'center' }])}>
        {loadingData || (
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Spinner
              variantColor="primary.500"
              size="lg"
              borderWidth="3px !important"
              fontWeight="bold"
            />
          </div>
        )}
      </div>
    </div>
  );
};

DGLoading.displayName = 'DGLoading';

export { DGLoading };
