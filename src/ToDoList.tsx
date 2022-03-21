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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    // 기본값설정
    defaultValues: {
      email: "@naver.com",
    },
  });

  // input 내의 모든 vaildation 통과 후 불린다
  const onValid = (data: IForm) => {
    // 커스텀 에러 설정

    // firstName에 "Nico" 가 포함되면 안되요
    // if (data.firstName.toLowerCase().indexOf("nico") > -1) {
    //   setError(
    //     "firstName",
    //     { message: "nico is allowed" },
    //     { shouldFocus: true }
    //   );
    // }
    if (data.password !== data.password1) {
      setError(
        "password1",
        {
          message: "Password are not the same.",
        },
        { shouldFocus: true } // 포커스
      );
    }
    //setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 500,
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[A-Za-z0-9._%+=]+@naver.com$/,
              message: "Only naver.com emails allowed!",
            },
          })}
          placeholder="Email"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.email?.message}
        </span>
        <input
          {...register("firstName", {
            required: "FirstName is required!",
            validate: {
              noNico: (value) =>
                value.toLowerCase().includes("nico")
                  ? "니코는 안돼!"
                  : true, // "nico"가 포함되면 안되요,
              noLas: (value) =>
                value.toLowerCase().includes("las")
                  ? "라스는 안돼!"
                  : true, // "las"가 포함되면 안되요
            },
          })}
          placeholder="FirstName"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.firstName?.message}
        </span>
        <input
          {...register("lastName", {
            required: "LastName is required!",
          })}
          placeholder="LastName"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.lastName?.message}
        </span>
        <input
          {...register("userName", {
            required: "UserName is required!",
          })}
          placeholder="UserName"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.userName?.message}
        </span>
        <input
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.password?.message}
        </span>
        <input
          {...register("password1", {
            required: "Password Confirm is required!",
            minLength: {
              value: 5,
              message:
                "Your password Confirm is too short.",
            },
          })}
          placeholder="Password Confirm"
        />
        <span style={{ color: "white", margin: 5 }}>
          {errors?.password1?.message}
        </span>
        <button>Add</button>
        <span style={{ color: "green", margin: 5 }}>
          {errors?.extraError?.message}
        </span>
      </form>
    </div>
  );
}

export default ToDoList;
