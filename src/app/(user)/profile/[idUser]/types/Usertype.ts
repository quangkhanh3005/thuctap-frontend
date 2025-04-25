export interface UserProfile {
  id: number;
  username: string;
  email: string|null;
  roles: string[]|null;
  countFollowers: number;
  countFollowing: number;
}
