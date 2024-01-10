import { taskRepo } from '$/domain/repository/taskRepo';
import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await taskRepo.findAll(prismaClient, query?.limit),
  }),
}));
