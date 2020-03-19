import { PseudoBoxProps } from '../PseudoBox';

type ListChildrenProps<T> = {
  item?: T;
  index?: number;
};

interface IListProps<T> {
  className?: string;
  /**
   * Provided data to be rendered using `children` component
   */
  data?: T[];
  /**
   * When list is loading, show loading spinner
   */
  isLoading?: boolean;
  /**
   * Empty state for list. Default: 'Empty data'
   */
  empty?: React.ReactNode;
  /**
   * Key getter. Default: (item, index) => index;
   */
  itemKey?: (item: T, index: number) => string | number;
  /**
   * Item renderer for list
   *
   * @example
   * ```javascript
   *    <List>
   *      {({ item, index}) => (
   *        <ListItem>
   *          <ListItemIcon isDot />
   *          <ListItemContent>
   *            <ListItemTitle>{item.title}</ListItemTitle>
   *          </ListItemContent>
   *        </ListItem>
   *      )}
   *    </List>
   * ```
   *
   * or
   *
   * @example
   * ```javascript
   *    <List>
   *      {YourOwnListRenderer}
   *    </List>
   * ```
   */
  children?: React.ReactElement<ListChildrenProps<T>>;
}

type ListProps<T> = IListProps<T> & PseudoBoxProps;

export function List<T = any>(props: ListProps<T>): React.ReactElement | null;

//////////////////////////////////////////////////////

export const ListItem: React.FC<PseudoBoxProps>;

//////////////////////////////////////////////////////

interface IListItemIconProps {
  isDot?: boolean;
}

type ListItemIconProps = IListItemIconProps & PseudoBoxProps;

export const ListItemIcon: React.FC<ListItemIconProps>;

//////////////////////////////////////////////////////

export const ListItemContent: React.FC<PseudoBoxProps>;

//////////////////////////////////////////////////////

export const ListItemTitle: React.FC<PseudoBoxProps>;

//////////////////////////////////////////////////////

export const ListItemHelp: React.FC<PseudoBoxProps>;
