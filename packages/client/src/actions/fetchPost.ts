import type { AnyPost, PostQueryVariables } from '@lens-social/graphql';
import { PostQuery } from '@lens-social/graphql';
import type { ResultAsync } from '@lens-social/types';

import type { AnyClient } from '../client';
import type { UnexpectedError } from '../errors';

/**
 * Fetch a post.
 *
 * Using a {@link SessionClient} will yield {@link Post#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await getPost(client, { request: { postId: postId('0x01') } });
 * ```
 *
 * @param client - Any Lens client.
 * @returns The Post or `null` if it does not exist.
 */
export function fetchPost(
  client: AnyClient,
  { request }: PostQueryVariables,
): ResultAsync<AnyPost | null, UnexpectedError> {
  return client.query(PostQuery, { request });
}