import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="activity-list">
      {items.map((item) => {
        const { id, act, date } = item;
        return (
          <article key={id} className="activity-item">
            <p className="activity-text">{date}</p>
            <p className="activity-text">{act}</p> 
            <div className="btn-list">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
