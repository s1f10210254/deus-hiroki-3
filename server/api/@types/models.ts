export type UserModel = {
  id: string;
  email: string;
  name: string;
  createdTime: number;
};

export type TaskModel = {
  id: string;
  label: string;
  done: boolean;
  createdTime: number;
  image: { url: string; s3Key: string } | undefined;
  author: { userId: string; name: string };
};
