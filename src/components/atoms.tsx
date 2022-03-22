import { atom, selector } from "recoil";

// type 사용하면 개별로 사용못함
// export type categories = "TODO" | "DOING" | "DONE";

// typeScript에서 사용가능 아무것도 할당하지 않으면 숫자 값 설정
export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories; // 명시적 값 일때
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const todoStoreKey = "Todo";
      const savedValue = localStorage.getItem(todoStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(todoStoreKey)
          : localStorage.setItem(
              todoStoreKey,
              JSON.stringify(newValue)
            );
      });
    },
  ],
});

// selector는 state를 가공 할 수 있다.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get으로 atom(다른 state)을 받을수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(
      (toDo) => toDo.category === category
    );
  },
});
