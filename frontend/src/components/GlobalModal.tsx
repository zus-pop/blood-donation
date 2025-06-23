import ContactModal from "./contact-modal";
import { useAuth } from "@/context/AuthContext";

const GlobalModal = () => {
  const { isModalOpen, closeModal, form, errors, handleChange, handleRegister, handleLogin } = useAuth();

  return (
    <ContactModal
      open={isModalOpen}
      onClose={closeModal}
      onRegister={handleRegister}
      onLogin={handleLogin}
      form={form}
      errors={errors}
      handleChange={handleChange}
    />
  );
};

export default GlobalModal; 