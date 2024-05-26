export interface EmailDataSignupInterface {
  to: string;
  data: { hash: string };
}
export interface EmailDataForgotPasswordInterface {
  to: string;
  data: { hash: string };
}
