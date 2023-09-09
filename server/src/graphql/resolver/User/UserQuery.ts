import { Resolvers } from '~/graphql/__generated__';
import { UserNotfoundException } from '~/service-exception';
import { getServices } from '~/service/services';

export const UserQuery: Resolvers['Query'] = {
  userByOriginalId: async (parent, args, context) => {
    const user = await getServices().user.getUserById(args.originalId);
    if (!user) {
      throw new UserNotfoundException();
    }
    return user;
  },
};
