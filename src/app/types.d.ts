// Types For Services
type ColorSchemeType = 'auto' | 'light' | 'dark';

type AuthType = {
  email: string;
  password: string;
  token: string;
};

type AlertSeverityType = 'success' | 'error'

type NotificationType = {
  id: string;
  label: string;
  message: string;
  send_at: string;
  severity: 'warning' | 'info';
  is_read: boolean;
};

type NotificationsPaneType = 'unread' | 'all';

// Types for Components
type RouteType = {
    routerLink: string
    title: string
} 

type DynamicRouteType = RouteType | (() => RouteType)

type FeatureDetailsType = {
    title: string
    body: string
    circleBgClx: string
}

type EmailVerificationAndLoginStageType = 'VERIFY_EMAIL' | 'LOGIN_STAGE'


// MODAL TYPES
type InputsType = Record<string, unknown> | undefined;
type ModalValueType = { template: Type<any>; inputs: InputsType; modalIcon?: string};
type ImageModalValueType = { template: Type<any>; imageUrl: string };

// Confirmation Modal
type ConfirmModalPropsType = {
  matIconName: string;
  title: string;
  message: string;
  severity?: 'error' | 'warning';
  ok: () => void;
};