import { User } from "./User";

export interface ApiResponse {
  items: User[];
  total_count: number;
}
