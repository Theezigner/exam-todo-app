import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";

export function EditTodoModal({ todo, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: todo.title,
      completed: todo.completed ? "true" : "false",
    },
  });

  const onSubmit = (updated) => {
    const updatedTodo = {
      ...todo,
      title: updated.title,
      completed: updated.completed === "true",
    };
    onUpdate(updatedTodo);
    setIsOpen(false);
    reset();
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
        className="btn btn-xs py-0"
        onClick={() => setIsOpen(true)}
        aria-label="Edit task"
      >
        <FiEdit2 />
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
                Edit task
              </h3>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <input
                className="input input-bordered input-sm"
                {...register("title", { required: true })}
                autoFocus
              />
              {errors.title && (
                <p className="text-red-500 text-xs">Title is required.</p>
              )}

              <select
                className="select select-bordered select-sm"
                {...register("completed")}
              >
                <option value="false">Not done</option>
                <option value="true">Done</option>
              </select>

              <footer className="modal-action">
                <button type="submit" className="btn btn-primary btn-sm shadow-none">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </footer>
            </form>
          </article>
        </dialog>
      )}
    </>
  );
}
