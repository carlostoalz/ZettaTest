export interface User {
  Id: number;
  UserName: string;
  Password: string;
  CreatedAt: Date;
  LastLogin?: Date;
}
