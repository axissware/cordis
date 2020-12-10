import { RoutingServer, RpcClient } from '@cordis/brokers';
import { RequestBuilderOptions } from '@cordis/rest';
import { RedisCache, Events, PatchedAPIClientUser } from '@cordis/util';

export type Handler<T> = (
  data: T,
  service: RoutingServer<keyof Events, Events>,
  cache: RedisCache,
  rest: RpcClient<any, Partial<RequestBuilderOptions> & { path: string }>,
  user: PatchedAPIClientUser
) => any;
