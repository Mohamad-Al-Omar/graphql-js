import db from "./_db.js";
const typeDefs = `#graphql
    type User {
        id: Int
        name: String
    }

    type Post {
        title: String
        content: String
        user_id: Int
    }
    type Query {
        users: [User]
        posts: [Post]
    }
    
    input PostInput {
        title: String
        content: String
        user_id: Int
    }
    input UserInput {
        name: String
    }
    type Mutation {
        createPost(input: PostInput): Post
        createUser(input: UserInput): User
        deletePost(id: Int): Post
        deleteUser(id: Int): User
        updatePost(id: Int, input: PostInput): Post
        updateUser(id: Int, input: UserInput): User
    }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    posts: () => db.posts,
  },
  Mutation: {
    createPost: (parent, args) => {
      const newPost = {
        id: db.posts.length + 1,
        ...args.input,
      };
      db.posts.push(newPost);
      return newPost;
    },
    createUser: (parent, args) => {
      console.log("🚀 ~ args:", args);
      const newUser = {
        id: db.users.length + 1,
        ...args.input,
      };
      console.log("🚀 ~ newUser:", newUser);
      db.users.push(newUser);
      return newUser;
    },

    deletePost: (parent, args) => {
      const post = db.posts.find((post) => post.id === args.id);
      if (!post) {
        throw new Error("Post not found");
      }
      db.posts = db.posts.filter((post) => post.id !== args.id);
      return post;
    },
    deleteUser: (parent, args) => {
      const user = db.users.find((user) => user.id === args.id);
      if (!user) {
        throw new Error("User not found");
      }
      db.users = db.users.filter((user) => user.id !== args.id);
      return user;
    },
    updatePost: (parent, args) => {
      const post = db.posts.find((post) => post.id === args.id);
      if (!post) {
        throw new Error("Post not found");
      }
      post.title = args.input.title;
      post.content = args.input.content;
      return post;
    },
    updateUser: (parent, args) => {
      const user = db.users.find((user) => user.id === args.id);
      if (!user) {
        throw new Error("User not found");
      }
      user.name = args.input.name;
      return user;
    },
  },
};

export { typeDefs, resolvers };
