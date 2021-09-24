export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
}

export interface UserToken {
  user: User;
  exp: Date;
}
