import ReactDOM from 'react-dom';
import { ReactNode } from 'react';
import styled from '@emotion/styled';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

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
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<ModalContainer>
			<ModalBody>
				{children}
				<button onClick={onClose}>Close</button>
			</ModalBody>
		</ModalContainer>,
		modalRoot
	);
}

export default Modal;
