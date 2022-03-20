import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");

//   const onChange = (
//     event: React.FormEvent<HTMLInputElement>
//   ) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodoError("");
//     setTodo(value);
//   };

//   const onSubmit = (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     if (todo.length < 10) {
//       return setTodoError("todo should be longer!");
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={todo}
//           onChange={onChange}
//           placeholder="Write a to do!"
//         />
//         <button>Add</button>
//         {todoError !== "" ? todoError : ""}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const inValid = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", {
            required: "password is required!",
            minLength: {
              value: 5,
              message: "password is too short!",
            },
          })}
          placeholder="Write a to do!"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
