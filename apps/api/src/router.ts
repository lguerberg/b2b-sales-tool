import { TrpcRouter } from './infrastructure/trpc/trpc.router'

export type ApiRouter = TrpcRouter[`appRouter`]
