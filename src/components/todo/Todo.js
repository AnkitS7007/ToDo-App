import React, { useState, useEffect } from "react";
import "./style.css";

//GET LOCAL STORAGE DATA BACK
const getLocalData = () => {
  const lists = localStorage.getItem("todolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditedItem, setIsEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //ADD ITEMS

  const addItem = () => {
    if (!inputdata) {
      alert("please fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditedItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditedItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  //EDIT ITEMS
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditedItem(index);
    setToggleButton(true);
  };
  //DELETE ITEMS
  const deleteItems = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };
  // REMOVE ALL ELEMENTS
  const removeAll = () => {
    setItems([]);
  };
  //ADDING LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            ></input>
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
            C
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
