import { UserRoles } from "@shared/enums/user-roles";

export type User = {
  id: number;
  name: string;
  email: string;
  roles: `${UserRoles}`[];
};