import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Apollo
import * as apolloProvider from "./graphql/apollo.provider";

const app = createApp(App);

app.use(apolloProvider.apolloProvider).use(store).mount("#app");
