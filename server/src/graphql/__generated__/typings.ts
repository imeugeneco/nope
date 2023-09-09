/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUserEntity } from '~/entity/user.entity';
import { GraphqlContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  nickname: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserOutput = CreateUserOutput_Result | Error;

export type CreateUserOutput_Result = {
  __typename?: 'CreateUserOutput_Result';
  result: CreateUserOutput_ResultPayload;
};

export type CreateUserOutput_ResultPayload = {
  __typename?: 'CreateUserOutput_ResultPayload';
  user: User;
};

export type Error = {
  __typename?: 'Error';
  error: ErrorPayload;
};

export type ErrorPayload = {
  __typename?: 'ErrorPayload';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 유저 생성 */
  createUser: CreateUserOutput;
  /** 유저 정보 수정 */
  updateUser: UpdateUserOutput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  userByOriginalId?: Maybe<User>;
};


export type QueryUserByOriginalIdArgs = {
  originalId: Scalars['String']['input'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  originalUserId: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = Error | UpdateUserOutput_Result;

export type UpdateUserOutput_Result = {
  __typename?: 'UpdateUserOutput_Result';
  result: UpdateUserOutput_ResultPayload;
};

export type UpdateUserOutput_ResultPayload = {
  __typename?: 'UpdateUserOutput_ResultPayload';
  user: User;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  originalId: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  CreateUserOutput: ( Omit<CreateUserOutput_Result, 'result'> & { result: RefType['CreateUserOutput_ResultPayload'] } ) | ( Error );
  UpdateUserOutput: ( Error ) | ( Omit<UpdateUserOutput_Result, 'result'> & { result: RefType['UpdateUserOutput_ResultPayload'] } );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: CreateUserInput;
  CreateUserOutput: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['CreateUserOutput']>;
  CreateUserOutput_Result: ResolverTypeWrapper<Omit<CreateUserOutput_Result, 'result'> & { result: ResolversTypes['CreateUserOutput_ResultPayload'] }>;
  CreateUserOutput_ResultPayload: ResolverTypeWrapper<Omit<CreateUserOutput_ResultPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Error: ResolverTypeWrapper<Error>;
  ErrorPayload: ResolverTypeWrapper<ErrorPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateUserInput: UpdateUserInput;
  UpdateUserOutput: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateUserOutput']>;
  UpdateUserOutput_Result: ResolverTypeWrapper<Omit<UpdateUserOutput_Result, 'result'> & { result: ResolversTypes['UpdateUserOutput_ResultPayload'] }>;
  UpdateUserOutput_ResultPayload: ResolverTypeWrapper<Omit<UpdateUserOutput_ResultPayload, 'user'> & { user: ResolversTypes['User'] }>;
  User: ResolverTypeWrapper<IUserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  CreateUserOutput: ResolversUnionTypes<ResolversParentTypes>['CreateUserOutput'];
  CreateUserOutput_Result: Omit<CreateUserOutput_Result, 'result'> & { result: ResolversParentTypes['CreateUserOutput_ResultPayload'] };
  CreateUserOutput_ResultPayload: Omit<CreateUserOutput_ResultPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Error: Error;
  ErrorPayload: ErrorPayload;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserOutput: ResolversUnionTypes<ResolversParentTypes>['UpdateUserOutput'];
  UpdateUserOutput_Result: Omit<UpdateUserOutput_Result, 'result'> & { result: ResolversParentTypes['UpdateUserOutput_ResultPayload'] };
  UpdateUserOutput_ResultPayload: Omit<UpdateUserOutput_ResultPayload, 'user'> & { user: ResolversParentTypes['User'] };
  User: IUserEntity;
};

export type CreateUserOutputResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateUserOutput'] = ResolversParentTypes['CreateUserOutput']> = {
  __resolveType: TypeResolveFn<'CreateUserOutput_Result' | 'Error', ParentType, ContextType>;
};

export type CreateUserOutput_ResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateUserOutput_Result'] = ResolversParentTypes['CreateUserOutput_Result']> = {
  result?: Resolver<ResolversTypes['CreateUserOutput_ResultPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserOutput_ResultPayloadResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CreateUserOutput_ResultPayload'] = ResolversParentTypes['CreateUserOutput_ResultPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ErrorResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  error?: Resolver<ResolversTypes['ErrorPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorPayloadResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['ErrorPayload'] = ResolversParentTypes['ErrorPayload']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['CreateUserOutput'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserOutput'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  userByOriginalId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByOriginalIdArgs, 'originalId'>>;
};

export type UpdateUserOutputResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateUserOutput'] = ResolversParentTypes['UpdateUserOutput']> = {
  __resolveType: TypeResolveFn<'Error' | 'UpdateUserOutput_Result', ParentType, ContextType>;
};

export type UpdateUserOutput_ResultResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateUserOutput_Result'] = ResolversParentTypes['UpdateUserOutput_Result']> = {
  result?: Resolver<ResolversTypes['UpdateUserOutput_ResultPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserOutput_ResultPayloadResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['UpdateUserOutput_ResultPayload'] = ResolversParentTypes['UpdateUserOutput_ResultPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlContext> = {
  CreateUserOutput?: CreateUserOutputResolvers<ContextType>;
  CreateUserOutput_Result?: CreateUserOutput_ResultResolvers<ContextType>;
  CreateUserOutput_ResultPayload?: CreateUserOutput_ResultPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Error?: ErrorResolvers<ContextType>;
  ErrorPayload?: ErrorPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateUserOutput?: UpdateUserOutputResolvers<ContextType>;
  UpdateUserOutput_Result?: UpdateUserOutput_ResultResolvers<ContextType>;
  UpdateUserOutput_ResultPayload?: UpdateUserOutput_ResultPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

