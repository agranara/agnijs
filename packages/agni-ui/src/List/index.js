import React from 'react';
import cn from 'classnames';
import { FiCircle } from 'react-icons/fi';
import { PseudoBox } from '../PseudoBox';
import { Spinner } from '../Spinner';

const List = ({
  className,
  data,
  children,
  isLoading,
  empty = 'Empty data',
  itemKey = (item, index) => index,
  ...restProps
}) => {
  const getItems = () => {
    if (!Array.isArray(data)) return null;

    if (data.length === 0)
      return (
        <PseudoBox textAlign="center" p={2}>
          {empty}
        </PseudoBox>
      );

    const results = [];

    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      results.push(React.createElement(children, { index: i, item: el, key: itemKey(el, i) }));
    }

    return results;
  };

  return (
    <PseudoBox
      className={cn(['list', className])}
      d="flex"
      flexDir="column"
      role="list"
      {...restProps}
    >
      {isLoading ? (
        <PseudoBox textAlign="center" p={2}>
          <Spinner size="md" variantColor="primary.500" /> Loading
        </PseudoBox>
      ) : (
        getItems()
      )}
    </PseudoBox>
  );
};

List.displayName = 'List';

///////////////////////////////////////////////////////

const ListItem = ({ className, children, ...restProps }) => {
  return (
    <PseudoBox
      role="listitem"
      className={cn(['list__item', className])}
      d="flex"
      flexDir="row"
      flexWrap="wrap"
      p={2}
      borderBottomWidth={1}
      _last={{
        borderBottomWidth: 0
      }}
      {...restProps}
    >
      {children}
    </PseudoBox>
  );
};

ListItem.displayName = 'ListItem';

///////////////////////////////////////////////////////

const ListItemIcon = ({ className, isDot, children, ...restProps }) => {
  return (
    <PseudoBox
      px={1}
      pt="4px"
      fontSize={isDot ? 'sm' : 'md'}
      lineHeight="none"
      className={cn(['list__item__icon', className])}
      {...restProps}
    >
      {isDot ? <PseudoBox as={FiCircle} fill="primary.500" strokeWidth="0" /> : children}
    </PseudoBox>
  );
};

ListItemIcon.displayName = 'ListItemIcon';

///////////////////////////////////////////////////////

const ListItemContent = ({ className, ...restProps }) => {
  return (
    <PseudoBox
      fontSize="md"
      lineHeight="normal"
      px={1}
      flexGrow={1}
      flexShrink={1}
      className={cn(['list__item__content', className])}
      {...restProps}
    />
  );
};

ListItemContent.displayName = 'ListItemContent';

///////////////////////////////////////////////////////

const ListItemTitle = ({ className, ...restProps }) => {
  return (
    <PseudoBox
      lineHeight="base"
      fontWeight="medium"
      className={cn(['list__item__title', className])}
      {...restProps}
    />
  );
};

ListItemTitle.displayName = 'ListItemTitle';

///////////////////////////////////////////////////////

const ListItemHelp = ({ className, ...restProps }) => {
  return (
    <PseudoBox
      lineHeight="short"
      className={cn(['list__item_help', className])}
      color="gray.500"
      {...restProps}
    />
  );
};

ListItemHelp.displayName = 'ListItemHelp';

///////////////////////////////////////////////////////

export { List, ListItem, ListItemIcon, ListItemContent, ListItemTitle, ListItemHelp };
