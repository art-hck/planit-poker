import { Uuid } from "./uuid";
import { Role } from "./role";

export interface User {
  id: Uuid;
  name: string;
  iat?: number;
  exp?: number;
  su: boolean;
  role: Role;
}
