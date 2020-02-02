import { PseudoBoxProps } from '../PseudoBox';

type TabOrientationType = 'vertical' | 'horizontal';

type TabVariantType = 'boxed' | 'line';

interface ITabProps {
  className?: string;
  activeIndex?: number;
  onTabChange?: (index: number) => void;

  // Not implemented yet
  orientation?: TabOrientationType;
  variant?: TabVariantType;
  closeable?: boolean;
  onTabClose?: (index: number) => void;
}

type TabProps = ITabProps & PseudoBoxProps;

export const Tabs: React.ForwardRefExoticComponent<TabProps>;

/////////////////////////////////////////////////////////////

export const TabPanels: React.ForwardRefExoticComponent<PseudoBoxProps>;

/////////////////////////////////////////////////////////////

interface ITabPanelProps {
  index?: number;
}

type TabPanelProps = ITabPanelProps & PseudoBoxProps;

export const TabPanel: React.ForwardRefExoticComponent<TabPanelProps>;

/////////////////////////////////////////////////////////////

export const TabButtons: React.ForwardRefExoticComponent<PseudoBoxProps>;

/////////////////////////////////////////////////////////////

interface ITabButtonProps {
  index?: number;
}

type TabButtonProps = ITabButtonProps & PseudoBoxProps;

export const TabButton: React.ForwardRefExoticComponent<TabButtonProps>;
