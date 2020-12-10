import { CORDIS_AMQP_SYMBOLS, CORDIS_REDIS_SYMBOLS, PatchedAPIMessage, PatchedReaction } from '@cordis/util';
import { GatewayMessageReactionRemoveEmojiDispatch } from 'discord-api-types';
import { Handler } from '../Handler';

const messageReactionRemoveEmoji: Handler<GatewayMessageReactionRemoveEmojiDispatch['d']> = async (data, service, cache) => {
  const message = await cache.get<PatchedAPIMessage>(CORDIS_REDIS_SYMBOLS.cache.messages(data.channel_id), data.message_id);
  const reaction = await cache.get<PatchedReaction>(
    CORDIS_REDIS_SYMBOLS.cache.reactions(data.message_id),
    (data.emoji.id ?? data.emoji.name)!
  );

  if (reaction) {
    service.publish({ reaction, message, messageId: data.message_id }, CORDIS_AMQP_SYMBOLS.gateway.events.messageReactionRemoveEmoji);
  }

  await cache.delete(CORDIS_REDIS_SYMBOLS.cache.reactions(data.message_id), (data.emoji.id ?? data.emoji.name)!);
};

export default messageReactionRemoveEmoji;
