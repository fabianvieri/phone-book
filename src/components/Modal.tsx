import ReactDOM from "react-dom";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 15px;
  position: absolute;
  top: 15px;
  right: 15px;

  &:hover {
    opacity: 0.8;
  }
`;

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <ModalBody>
        {children}
        <Button onClick={onClose}>Close</Button>
      </ModalBody>
    </ModalContainer>,
    modalRoot
  );
}

export default Modal;
