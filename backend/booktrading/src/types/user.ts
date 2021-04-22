type User = {
  uuid: string;
  fullname: string;
  picture: string;
  city?: string;
  country?: string;
  created_at: Date;
  github_id: string;
  type_of_user: "admin" | "standard";
};

export { User };
