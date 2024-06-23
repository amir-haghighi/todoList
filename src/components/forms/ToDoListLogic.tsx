import { useState } from 'react';

export interface ToDo {
  disabled: boolean;
  value: string;
}

export const useToDoList = () => {
  // Initialize from localStorage or default value
  const initialToDos: ToDo[] = [
    ...JSON.parse(localStorage.getItem("toDos") || "null"),
    { disabled: false, value: "" },
  ];

  const [toDos, setToDos] = useState<ToDo[]>(initialToDos);

  const addToDo = (toDo: ToDo) => {
    if (toDos.length === 0) {
      return;
    }

    const newToDo = [...toDos];
    newToDo.pop();
    const updatedToDo: ToDo[] = [
      ...newToDo,
      { disabled: true, value: toDo?.value },
      { disabled: false, value: "" },
    ];
    const whatShouldStore = updatedToDo.slice(0, -1);
    setToDos(updatedToDo);
    localStorage.setItem("toDos", JSON.stringify(whatShouldStore));
  };

  const deleteToDo = (indexToDelete: number) => {
    const newArray = toDos.filter((_, index) => index !== indexToDelete);
    setToDos(newArray);
    const whatShouldStore = newArray.slice(0, -1);

    localStorage.setItem("toDos", JSON.stringify(whatShouldStore));
  };

  const editToDo = (indexToEdit: number) => {
    const updatedToDos = toDos.map((item, idx) =>
      idx === indexToEdit ? { ...item, disabled: false } : item
    );
    setToDos(updatedToDos);
  };

  const saveEditToDo = (indexToEdit: number) => {
    const updatedToDos = toDos.map((item, idx) =>
      idx === indexToEdit ? { ...item, disabled: true } : item
    );
    setToDos(updatedToDos);
    const whatShouldStore = updatedToDos.slice(0, -1);
    localStorage.setItem("toDos", JSON.stringify(whatShouldStore));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedToDos = toDos.map((item, idx) =>
      idx === index ? { ...item, value: e.target.value } : item
    );
    setToDos(updatedToDos);
  };

  return { toDos, addToDo, deleteToDo, editToDo, saveEditToDo, changeHandler };
};
