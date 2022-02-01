import React from "react";
import reactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  border: "1px solid black",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, .3)",
  zIndex: 1000,
};

const BUTTON_STYLES = {
  padding: "2px 4px",
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  cursor: "pointer",
  color: "inherit",
  outline: "inherit",
};

export default function Modal({
  open,
  closeModal,
  toggleCart,
  resetCart,
  products,
}) {
  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <h2>Thank you for your purchase!</h2>
        <button
          id="close-modal-button"
          onClick={() => {
            closeModal();
            toggleCart();
            resetCart(products);
          }}
          style={BUTTON_STYLES}
          type="button"
        >
          x
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
