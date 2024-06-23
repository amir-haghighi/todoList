import React from "react";

import { ToDo, useToDoList } from "./ToDoListLogic";

const ToDoList: React.FC = () => {
  const { toDos, addToDo, deleteToDo, editToDo, saveEditToDo, changeHandler } =
    useToDoList();

  return (
    <div>
      {toDos.map((toDo: ToDo, index: number) => (
        <div key={index}>
          <input
            required
            type="text"
            disabled={toDo.disabled}
            value={toDo.value}
            onChange={(e) => changeHandler(e, index)}
          />
          {toDos.length - 1 === index ? (
            <button type="button" onClick={() => addToDo(toDo)}>
              Add ToDo
            </button>
          ) : (
            <>
              <button type="button" onClick={() => deleteToDo(index)}>
                Delete
              </button>
              {toDo.disabled ? (
                <button type="button" onClick={() => editToDo(index)}>
                  Edit
                </button>
              ) : (
                <button type="button" onClick={() => saveEditToDo(index)}>
                  Save
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
