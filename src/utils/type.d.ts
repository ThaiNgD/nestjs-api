export type CreatedUserType = {
  username: string;
  password: string;
  email: string;
};

export interface ReturnHttpMessage {
  statusCode: number;
  message: string;
  isSuccess: boolean;
}
