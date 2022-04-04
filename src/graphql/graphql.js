import gql from "graphql-tag";

export const GET_TODOS = gql`
   query {
      todos {
         data {
            id
            title
            completed
         }
      }
   }
`;

export const DELETE_TODO = gql`
   mutation deleteTodo($id: ID!) {
      deleteTodo(id: $id)
   }
`;

export const UPDATE_TODO = gql`
   mutation updateTodo($id: ID!, $input: UpdateTodoInput!) {
      updateTodo(id: $id, input: $input) {
         title
         id
      }
   }
`;

export const ADD_TODO = gql`
   mutation createTODO($input: CreateTodoInput!) {
      createTodo(input: $input) {
         id
         title
         completed
      }
   }
`;
