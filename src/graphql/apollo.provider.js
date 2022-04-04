import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";
import { provideApolloClient } from "@vue/apollo-composable";

const httpLink = new HttpLink({
   uri: "https://graphqlzero.almansi.me/api",
});

const apolloClient = new ApolloClient({
   link: httpLink,
   cache: new InMemoryCache(),
   connectToDevTools: true,
});

provideApolloClient(apolloClient);

export const apolloProvider = createApolloProvider({
   defaultClient: apolloClient,
});
