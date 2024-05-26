export interface IEmailDataSignup {
  to: string;
  data: { hash: string };
}
export interface IEmailDataForgotPassword {
  to: string;
  data: { hash: string };
}
