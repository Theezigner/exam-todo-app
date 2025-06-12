import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export function CreateTodoModal({ onAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const onSubmit = (data) => {
    const newTodo = {
      id: Date.now(),
      title: data.title,
      completed: false,
    };

    onAdd(newTodo);
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
        className="btn btn-primary btn-sm shadow-none"
        onClick={() => setIsOpen(true)}
      >
        <span aria-hidden="true">
          <AiOutlinePlus className="text-lg" />
        </span>

        <span className="hidden md:inline ml-1">New Task</span>
      </button>

      {isOpen && (
        <dialog
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <article className="modal-box"  tabIndex={-1} ref={modalRef} onKeyDown={handleKeyDown}>
            <header>
              <h3 id="modal-title" className="font-bold text-lg mb-2">
                Add a new task
              </h3>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <input
                className="input input-bordered input-sm"
                placeholder="Task title"
                {...register("title", { required: true })}
                autoFocus
              />
              {errors.title && (
                <p className="text-red-500 text-xs">Title is required.</p>
              )}

              <footer className="modal-action">
                <button type="submit" className="btn btn-primary btn-sm shadow-none">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
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
