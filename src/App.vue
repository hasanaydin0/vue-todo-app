<script>
export default {
   name: "App",
   data() {
      return {
         selectedInput: -1,
         selectedValue: "",
      };
   },
   mounted() {
      this.$store.dispatch("todos/getTodos", { apollo: this.$apollo });
   },
   methods: {
      // DELETE
      handleDelete(id, index) {
         console.log(id, index);
         this.$store.dispatch("todos/deleteTodo", { id: id, index: index, apollo: this.$apollo });
      },

      // UPDATE
      selectInput(index, val) {
         this.selectedInput = index;
         this.selectedValue = val;
      },
      handleUpdate(id, index) {
         this.$store
            .dispatch("todos/updateTodo", { apollo: this.$apollo, id: id, ind: index, value: this.selectedValue })
            .then((res) => {
               this.selectedValue = res.title;
               this.selectedInput = -1;
               console.log("res", res);
            })
            .catch((err) => {
               console.log("err", err);
            });
      },

      // ADD
      handleAdd() {
         this.$store
            .dispatch("todos/addTodo", {
               apollo: this.$apollo,
            })
            .then((res) => {
               console.log("res", res);
            })
            .catch((err) => {
               console.log("er", err);
            });
      },
   },
};
</script>

<template>
   <div class="bg-light">
      <div class="container p-5">
         <div class="row text-center">
            <div class="col">
               <h4 class="text-decoration-underline">TODO LIST</h4>
               <div class="d-flex justify-content-between align-items-center mt-4">
                  <label class="fs-5">Total: {{ $store.state.todos.todos.length }}</label>
                  <div class="d-flex justify-content-between align-items-center">
                     <input v-model="$store.state.todos.title" />
                     <button @click="handleAdd()" class="border-0 bg-success text-white rounded fs-5 ms-2">
                        <i class="fa-solid fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div
            v-for="(todo, index) in $store.state.todos.todos"
            :key="todo.id"
            class="row mt-3 border border-4 rounded d-flex align-items-center"
         >
            <div class="col-10 p-2">
               <label v-if="index !== selectedInput" class="border-0 bg-transparent">
                  <i v-if="todo.completed" class="fa-solid fa-circle-check me-1 text-success fs-5 me-2"></i>
                  <i v-else class="fa-solid fa-circle-xmark me-1 text-danger fs-5 me-2"></i>
                  {{ todo.id }} - {{ todo.title }}
               </label>
               <input v-model="selectedValue" v-if="index === selectedInput" type="text" />
            </div>
            <div class="col-2">
               <div class="row">
                  <div class="col">
                     <button @click="selectInput(index, todo.title)" class="border-0 bg-transparent fs-5">
                        <i class="fa-solid fa-pencil fs-4"></i>
                     </button>
                  </div>
                  <div class="col">
                     <button
                        v-if="index !== selectedInput"
                        @click="handleDelete(todo.id, index)"
                        class="border-0 bg-transparent fs-5"
                     >
                        <i class="fa-solid fa-trash-can fs-4 text-danger"></i>
                     </button>
                     <button
                        v-else
                        @click="handleUpdate(todo.id, index)"
                        class="border-0 bg-transparent fs-4 text-success"
                     >
                        <i class="fa-solid fa-check"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
