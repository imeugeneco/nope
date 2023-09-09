import { Resolvers } from '~/graphql/__generated__';

export const UserMutation: Resolvers['Mutation'] = {
  createUser: async (parent, args, context) => {
    const createdUser = await context.services.user.createUser({
      nickname: args.input.nickname,
      phoneNumber: args.input.phoneNumber ?? undefined,
      email: args.input.email ?? undefined,
    });

    return {
      __typename: 'CreateUserOutput_Result',
      result: { user: createdUser },
    };
  },

  updateUser: async (parent, args, context) => {
    const updatedUser = await context.services.user.updateUser({
      id: args.input.originalUserId,
      nickname: args.input.nickname ?? undefined,
      phoneNumber: args.input.phoneNumber ?? undefined,
      email: args.input.email ?? undefined,
      bio: args.input.bio ?? undefined,
    });
    return {
      __typename: 'UpdateUserOutput_Result',
      result: { user: updatedUser },
    };
  },
};
