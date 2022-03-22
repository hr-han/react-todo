import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDo = useSetRecoilState(toDoState);
  // todo 상태 변경
  // any : typescript 체크 안함
  const updateToDo = (category: any) => {
    setToDo((oldToDos) => {
      const targetIndex = oldToDos.findIndex(
        (todo) => todo.id === id
      );
      const newToDo = { id, text, category };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  // todo 삭제
  const deleteToDo = () => {
    setToDo((oldToDos) => {
      const newToDos = oldToDos.filter(
        (todo) => todo.id !== id
      );
      return newToDos;
    });
  };

  const onClick = (
    //newCategory: "TODO" | "DOING" | "DONE"
    //newCategory: IToDo["category"]
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    // delete 일경우
    if (name === Categories.DELETE) {
      return deleteToDo();
    }
    updateToDo(name);
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name={Categories.DELETE} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
