import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { TrpcRouter } from './infrastructure/trpc/trpc.router'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)
  // TODO Port to .env
  await app.listen(4000)
}
bootstrap()
