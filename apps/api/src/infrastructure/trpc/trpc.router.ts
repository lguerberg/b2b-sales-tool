import { INestApplication, Injectable } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'

import { HelloSchema } from '../schemas/hello.schema'
import { TrpcService } from './trpc.service'

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure.input(HelloSchema).query(({ input }) => {
      const { name } = input
      return {
        greeting: `Hello ${name ? name : `Bilbo`}`,
      }
    }),
  })

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/api',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    )
  }
}
