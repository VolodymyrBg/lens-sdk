import type {
  Account,
  AccountAvailable,
  AccountBlocked,
  AccountFeedsStats,
  AccountFeedsStatsRequest,
  AccountGraphsFollowStats,
  AccountGraphsStatsRequest,
  AccountRequest,
  AccountStats,
  AccountStatsRequest,
  AccountsAvailableRequest,
  AccountsBlockedRequest,
  CreateAccountWithUsernameRequest,
  CreateAccountWithUsernameResult,
  EnableSignlessResult,
  MuteRequest,
  RemoveSignlessResult,
  SearchAccountsRequest,
  SetAccountMetadataRequest,
  SetAccountMetadataResult,
  UnmuteRequest,
} from '@lens-protocol/graphql';
import {
  AccountFeedsStatsQuery,
  AccountGraphsStatsQuery,
  AccountQuery,
  AccountStatsQuery,
  AccountsAvailableQuery,
  AccountsBlockedQuery,
  CreateAccountWithUsernameMutation,
  EnableSignlessMutation,
  MuteAccountMutation,
  RemoveSignlessMutation,
  SearchAccountsQuery,
  SetAccountMetadataMutation,
  UnmuteAccountMutation,
} from '@lens-protocol/graphql';
import type { ResultAsync } from '@lens-protocol/types';

import type { AnyClient, SessionClient } from '../clients';
import type { UnauthenticatedError, UnexpectedError } from '../errors';
import type { Paginated } from '../types';

/**
 * Fetch an Account.
 *
 * Using a {@link SessionClient} will yield {@link Account#operations} specific to the authenticated Account.
 *
 * ```ts
 * const result = await fetchAccount(anyClient, {
 *   address?: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The Account query request.
 * @returns The Account or `null` if it does not exist.
 */
export function fetchAccount(
  client: AnyClient,
  request: AccountRequest,
): ResultAsync<Account | null, UnexpectedError> {
  return client.query(AccountQuery, { request });
}

/**
 * Fetch an Account Stats.
 *
 * ```ts
 * const result = await fetchAccountStats(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The stats for the account or `null` if it does not exist.
 */
export function fetchAccountStats(
  client: AnyClient,
  request: AccountStatsRequest,
): ResultAsync<AccountStats | null, UnexpectedError> {
  return client.query(AccountStatsQuery, { request });
}

/**
 * Fetch an Account Feed Stats.
 *
 * ```ts
 * const result = await fetchAccountFeedStats(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The feed stats for the account or `null` if it does not exist.
 */
export function fetchAccountFeedStats(
  client: AnyClient,
  request: AccountFeedsStatsRequest,
): ResultAsync<AccountFeedsStats | null, UnexpectedError> {
  return client.query(AccountFeedsStatsQuery, { request });
}

/**
 * Fetch an Account Graph Stats.
 *
 * ```ts
 * const result = await fetchAccountGraphStats(anyClient, {
 *   account: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The follow stats for the account or `null` if it does not exist.
 */
export function fetchAccountGraphStats(
  client: AnyClient,
  request: AccountGraphsStatsRequest,
): ResultAsync<AccountGraphsFollowStats | null, UnexpectedError> {
  return client.query(AccountGraphsStatsQuery, { request });
}

/**
 * Fetch Accounts Available.
 *
 * ```ts
 * const result = await fetchAccountsAvailable(anyClient, {
 *   managedBy: evmAddress('0xe2f2a5C287993345a840db3B0845fbc70f5935a5'),
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The query request.
 * @returns The list of available accounts.
 */
export function fetchAccountsAvailable(
  client: AnyClient,
  request: AccountsAvailableRequest,
): ResultAsync<Paginated<AccountAvailable> | null, UnexpectedError> {
  return client.query(AccountsAvailableQuery, { request });
}

/**
 * Fetch Blocked Accounts.
 *
 * ```ts
 * const result = await fetchAccountsBlocked(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The query request.
 * @returns The list of blocked accounts.
 */
export function fetchAccountsBlocked(
  client: SessionClient,
  request: AccountsBlockedRequest,
): ResultAsync<Paginated<AccountBlocked> | null, UnexpectedError> {
  return client.query(AccountsBlockedQuery, { request });
}

/**
 * Search accounts.
 *
 * ```ts
 * const result = await searchAccounts(anyClient, {
 *   localName: 'wagmi',
 * });
 * ```
 *
 * @param client - Any Lens client.
 * @param request - The SearchAccounts query request.
 * @returns The list of Account or empty list if it does not find anything.
 */
export function searchAccounts(
  client: AnyClient,
  request: SearchAccountsRequest,
): ResultAsync<Paginated<Account> | null, UnexpectedError> {
  return client.query(SearchAccountsQuery, { request });
}

/**
 * Set Account metadata for the authenticated Account.
 *
 * ```ts
 * const result = await setAccountMetadata(sessionClient, {
 *   metadataURI: uri('ar://abc123def456gh…'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function setAccountMetadata(
  client: SessionClient,
  request: SetAccountMetadataRequest,
): ResultAsync<SetAccountMetadataResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(SetAccountMetadataMutation, { request });
}

/**
 * Create an account with a given username.
 *
 * ```ts
 * const result = await createAccountWithUsername(sessionClient, {
 *   username: {
 *      localname: 'wagmi'
 *   },
 *   metadataUri: uri('lens://bafybxiky5jf…'),
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function createAccountWithUsername(
  client: SessionClient,
  request: CreateAccountWithUsernameRequest,
): ResultAsync<CreateAccountWithUsernameResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(CreateAccountWithUsernameMutation, { request });
}

/**
 * Get transaction to enable signless.
 *
 * ```ts
 * const result = await enableSignless(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function enableSignless(
  client: SessionClient,
): ResultAsync<EnableSignlessResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(EnableSignlessMutation, {});
}

/**
 * Get transaction to remove signless.
 *
 * ```ts
 * const result = await removeSignless(sessionClient);
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns Tiered transaction result.
 */
export function removeSignless(
  client: SessionClient,
): ResultAsync<RemoveSignlessResult, UnexpectedError | UnauthenticatedError> {
  return client.mutation(RemoveSignlessMutation, {});
}

/**
 * Mute an account.
 *
 * ```ts
 * const result = await muteAccount(sessionClient, {
 *   account: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns void.
 */
export function muteAccount(
  client: SessionClient,
  request: MuteRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(MuteAccountMutation, { request });
}

/**
 * Unmute an account.
 *
 * ```ts
 * const result = await unmuteAccount(sessionClient, {
 *   account: evmAddress("0xe5439696f4057aF073c0FB2dc6e5e755392922e1");
 * });
 * ```
 *
 * @param client - The session client for the authenticated Account.
 * @param request - The mutation request.
 * @returns void.
 */
export function unmuteAccount(
  client: SessionClient,
  request: UnmuteRequest,
): ResultAsync<void, UnexpectedError | UnauthenticatedError> {
  return client.mutation(UnmuteAccountMutation, { request });
}
