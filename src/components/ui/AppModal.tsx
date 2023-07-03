import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type PropsType = {
  isOpenModal: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
};
function AppModal({ isOpenModal, onClose, title, children }: PropsType) {
  return (
    <Modal isOpen={isOpenModal} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.100" backdropFilter="blur(2px)" />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AppModal;
