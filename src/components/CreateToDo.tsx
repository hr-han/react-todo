import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  // 값취득과 설정
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } =
    useForm<IForm>();

  // 데이터가 유효할때 실행될 fn
  const handleValid = ({ toDo }: IForm) => {
    // todo data 제어
    setToDos((oldToDos) => {
      return [
        {
          id: Date.now(),
          text: toDo,
          category,
        },
        ...oldToDos,
      ];
    });
    //submit 후 value 값 초기화
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "write here!!",
        })}
        placeholder="Write a to do!"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
