import { useState, useRef } from "react";
import { FiTrash2 } from "react-icons/fi";

export function DeleteTodoModal({ todo, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleDelete = () => {
    onDelete(todo.id);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      reset();
    }
  };

  return (
    <>
      <button
        className="btn btn-xs py-0 hover:text-red-600 border-none"
        aria-label="Delete Task"
        onClick={() => setIsOpen(true)}
      >
        <span aria-hidden="true">
          <FiTrash2 />
        </span>
      </button>

      {isOpen && (
        <dialog
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <article className="modal-box" tabIndex={-1} ref={modalRef} onKeyDown={handleKeyDown}>
            <header>
              <h3 id="modal-title" className="font-bold text-lg mb-2">
                Delete task
              </h3>
            </header>

            <p>
              Are you sure you want to delete:{" "}
              <span className="font-semibold">"{todo.title}"</span>?
            </p>

            <footer className="modal-action">
              <button
                className="btn btn-sm btn-error bg-red-700 hover:bg-red-800 text-white border-none shadow-none"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </>
  );
}
