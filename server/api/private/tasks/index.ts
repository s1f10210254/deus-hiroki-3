import type { TaskModel } from '$/api/@types/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqFormat: FormData;
    reqBody: {
      label: string;
      image?: Blob;
    };
    resBody: TaskModel;
  };

  patch: {
    reqBody: {
      taskId: string;
      done: boolean;
      label: string;
    };
    status: 204;
    resBody: TaskModel;
  };

  delete: {
    reqBody: {
      taskId: string;
    };
    status: 204;
  };
}>;
