import type { UserModel } from '$/api/@types/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    resBody: UserModel;
  };
}>;
