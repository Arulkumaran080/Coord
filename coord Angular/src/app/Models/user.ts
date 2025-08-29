export interface User {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  imageUrl: string;
}