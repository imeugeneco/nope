const typeDefs = `

schema {
  query: Query
  mutation: Mutation
}

input CreateUserInput {
  email: String
  nickname: String!
  phoneNumber: String
}

union CreateUserOutput = CreateUserOutput_Result | Error

type CreateUserOutput_Result {
  result: CreateUserOutput_ResultPayload!
}

type CreateUserOutput_ResultPayload {
  user: User!
}

scalar Date

scalar DateTime

type Error {
  error: ErrorPayload!
}

type ErrorPayload {
  message: String!
}

type Mutation {
  """유저 생성"""
  createUser(input: CreateUserInput!): CreateUserOutput!
  """유저 정보 수정"""
  updateUser(input: UpdateUserInput!): UpdateUserOutput!
}

interface Node {
  """
  Globally unique across all types.
  Represents both the type and the original ID of the object.
  """
  id: ID!
}

type Query {
  node(id: ID!): Node
  userByOriginalId(originalId: String!): User
  wordByOriginalId(originalId: String!): Word
}

input UpdateUserInput {
  bio: String
  email: String
  nickname: String
  originalUserId: String!
  phoneNumber: String
}

union UpdateUserOutput = Error | UpdateUserOutput_Result

type UpdateUserOutput_Result {
  result: UpdateUserOutput_ResultPayload!
}

type UpdateUserOutput_ResultPayload {
  user: User!
}

type User implements Node {
  bio: String
  createdAt: DateTime!
  email: String
  id: ID!
  nickname: String!
  originalId: String!
  phoneNumber: String
}

"""오늘의 단어"""
type Word implements Node {
  date: Date
  id: ID!
  originalId: String!
  word: String!
}
`

export default typeDefs
