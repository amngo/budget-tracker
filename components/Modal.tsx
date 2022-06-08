import { RootState } from "app/store";
import Input from "components/Input";
import { closeModal } from "features/modal/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Modal() {
  const { open } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="relative modal-box">
        <button
          type="button"
          className="absolute btn btn-sm btn-circle right-2 top-2"
          onClick={() => dispatch(closeModal())}
        >
          ✕
        </button>
        <Input />
      </div>
    </div>
  );
}

export default Modal;
