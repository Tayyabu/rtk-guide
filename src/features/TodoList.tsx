import { FormEvent, useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [newTodo, setNewTodo] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addTodo({ title: newTodo, completed: false });
    setNewTodo("");
  }

  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTodosQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map(
      (todo: { id: number; title: string; completed: boolean }) => {
        return (
          <section
            className="flex shadow-lg p-10 m-4 rounded-md gap-5
        "
            key={todo.id}
          >
            <div className="flex gap-2 justify-between">
              <input
                type="checkbox"
                onChange={() => {
                  updateTodo({ ...todo, completed: !todo.completed });
                }}
                defaultChecked={todo.completed}
              />
              <h1 className="font-bold text-2xl">{todo.title}</h1>
            </div>
            <button
              className="bg-red-600 text-white px-2 rounded-sm"
              onClick={() => {
                deleteTodo({ id: todo.id });
              }}
            >
              Delete
            </button>
          </section>
        );
      }
    );
  } else if (isError) {
    content = <p>{error as string}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter Todo "
          className="rounded-md mr-2 border-spacing-28 text-center"
        />
        <button className="bg-green-600  text-white px-2 rounded-sm">
          Add Todo
        </button>
      </form>
      {content}
    </main>
  );
};

export default TodoList;
