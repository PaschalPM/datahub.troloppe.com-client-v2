// Types For Services
type ColorSchemeType = 'auto' | 'light' | 'dark';

type AuthType = {
  email: string;
  password: string;
  token: string;
};


// Types for Components
type RouteType = {
    routerLink: string
    title: string
} 

type FeatureDetailsType = {
    title: string
    body: string
    circleBgClx: string
}

type EmailVerificationAndLoginStageType = 'VERIFY_EMAIL' | 'LOGIN_STAGE'