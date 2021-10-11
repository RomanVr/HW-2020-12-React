import { authorizedOnlyHoc } from "@/HOC/authorizedOnlyHoc";
import { User } from "@/modules/User/User";

export const UserScreen = authorizedOnlyHoc(User, "/login");
