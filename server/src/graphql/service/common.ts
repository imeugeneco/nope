import { decode, encode } from 'bs58';
import {
  ResolverTypeWrapper,
  Resolvers,
  ResolversTypes,
} from '../__generated__';
import { GraphQLError } from 'graphql';
import { GraphqlContext } from '../context';
import { getServices } from '~/service/services';

type ResolverUnWrapper<T> = T extends ResolverTypeWrapper<infer R> ? R : never;

const entityTypeMap: Record<
  ResolverUnWrapper<ResolversTypes['Node']>['$typename'],
  keyof Resolvers
> = {
  UserEntity: 'User',
};

export const getTypeName = (
  parent: ResolverUnWrapper<ResolversTypes['Node']>,
): any => {
  if ('$typename' in parent) {
    return entityTypeMap[parent.$typename];
  }
  new Error('Cannot find type $typename');
};

export const globalIdResolver = (entity: any) => {
  return toGlobalId(getTypeName(entity), entity.id);
};

export const toGlobalId = (type: keyof Resolvers, id: string) => {
  return encode(Buffer.from([type, id].join(':'), 'utf-8'));
};

const textDecoder = new TextDecoder();

export const globalIdToOriginalId = (
  globalId: string,
  validType?: keyof Resolvers,
) => {
  try {
    const [type, id] = textDecoder.decode(decode(globalId)).split(':');

    if (validType && validType !== type) {
      throw new GraphQLError(
        `Wrong id, expected ${validType} id, but got ${type}`,
      );
    }

    return {
      type,
      id,
    };
  } catch (err) {
    if (err instanceof GraphQLError) throw err;

    throw new Error(`Invalid globalId`);
  }
};

export const getNodeFromGlobalId = async (
  globalId: string,
  { services }: GraphqlContext,
) => {
  const { type, id } = globalIdToOriginalId(globalId);

  switch (type) {
    case 'User':
      return await getServices().user.getUserById(id);

    default:
      return await Promise.resolve(null);
  }
};
