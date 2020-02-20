type FocusTrapProps = {
  getDocument?: () => Document;
  isOpen?: boolean;
  isEnabled?: boolean;
  isAutoFocus?: boolean;
  isEnforceFocus?: boolean;
  isRestoreFocus?: boolean;
};

export const FocusTrap: React.FC<FocusTrapProps>;
