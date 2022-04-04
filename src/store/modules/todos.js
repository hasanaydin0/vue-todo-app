import { GET_TODOS, DELETE_TODO, UPDATE_TODO, ADD_TODO } from "@/graphql/graphql";

// Stata
const state = {
   todos: [],
   loading: false,
};

// Getters
const getters = {};

// Mutations
const mutations = {
   SET_LOADING(state, payload) {
      state.loading = payload;
   },

   GET_TODOS(state, payload) {
      state.todos = payload;
   },

   DELETE_TODO(state, payload) {
      let todos = state.todos;
      state.todos = todos.slice(0, payload).concat(todos.slice(payload + 1));
   },

   UPDATE_TODO(state, payload) {
      const todos = JSON.parse(JSON.stringify(state.todos));
      state.todos = todos.map((todo) => {
         if (todo.id === payload.id) {
            todo.title = payload.title;
            return payload;
         }
         return todo;
      });
   },

   ADD_TODO(state, payload) {
      const todos = [...state.todos];
      console.log("payload", payload);
      console.log("state", state.todos);
      todos.push(payload);
      todos.map((item) => {
         console.log("item", item.id, item.title);
      });
      console.log("todos", todos);
      state.todos = todos;
      console.log("state", state.todos);
   },
};

// Actions
const actions = {
   // GET TODOS
   getTodos({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
         const apollo = payload.apollo;
         commit("SET_LOADING", true);
         apollo
            .query({
               query: GET_TODOS,
            })
            .then((res) => {
               commit("GET_TODOS", res.data.todos.data);
               commit("SET_LOADING", false);
               resolve(res.data.todos.data);
            })
            .catch((err) => {
               commit("SET_LOADING", false);
               reject(err);
            });
      });
   },

   // DELETE TODO
   deleteTodo({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
         const apollo = payload.apollo;
         commit("SET_LOADING", true);
         apollo
            .mutate({
               mutation: DELETE_TODO,
               variables: {
                  id: payload.id,
               },
            })
            .then((res) => {
               commit("SET_LOADING", false);
               commit("DELETE_TODO", payload.index);
               resolve(res.data.deleteTodo);
            })
            .catch((err) => {
               commit("SET_LOADING", false);
               reject(err);
            });
      });
   },

   // UPDATE TODO
   updateTodo({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
         const apollo = payload.apollo;
         commit("SET_LOADING", true);
         apollo
            .mutate({
               mutation: UPDATE_TODO,
               variables: {
                  id: payload.id,
                  input: { title: payload.value },
               },
            })
            .then((res) => {
               commit("UPDATE_TODO", res.data.updateTodo);
               commit("SET_LOADING", false);
               resolve(res.data.updateTodo);
            })
            .catch((err) => {
               commit("SET_LOADING", false);
               reject(err);
            });
      });
   },

   // ADD TODO
   addTodo({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
         const apollo = payload.apollo;
         commit("SET_LOADING", true);
         apollo
            .mutate({
               mutation: ADD_TODO,
               variables: {
                  input: {
                     title: state.title,
                     completed: true,
                  },
               },
            })
            .then((res) => {
               commit("ADD_TODO", res.data.createTodo);
               console.log("eee");
               commit("SET_LOADING", false);
               resolve(res.data.createTodo);
            })
            .catch((err) => {
               console.log("sadasdsd");
               commit("SET_LOADING", false);
               reject(err);
            });
      });
   },
};

export default { namespaced: true, state, getters, mutations, actions };
