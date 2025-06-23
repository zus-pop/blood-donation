import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { createUser, loginUser, getProfile } from "@/apis/user.api";
import { useProfileStore } from "@/store/profileStore";
import type { UserProps } from "@/apis/user.api";

// Validation functions
function validate(form: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\d{8,15}$/.test(form.phone)) errors.phone = "Phone must be 8-15 digits";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email format";
  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 6) errors.password = "Password must be at least 6 characters";
  return errors;
}

function validateLogin(form: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Invalid email format";
  if (!form.password) errors.password = "Password is required";
  return errors;
}

interface AuthContextType {
  user: UserProps | null;
  isAuthenticated: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { setProfile, clearProfile } = useProfileStore();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const profile = await getProfile();
          setUser(profile);
          setIsAuthenticated(true);
          setProfile(profile); // Lưu profile vào zustand
        } catch (error) {
          localStorage.removeItem("accessToken");
          setUser(null);
          setIsAuthenticated(false);
          clearProfile(); // Xóa profile khỏi zustand nếu lỗi
        }
      } else {
        clearProfile();
      }
    };
    checkUser();
  }, [setProfile, clearProfile]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ firstName: "", lastName: "", email: "", phone: "", password: "" });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "MEMBER",
      });
      toast.success("Registration successful! Please log in.");
      closeModal();
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLogin(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem("accessToken", res.access_token);
      const profile = await getProfile();
      setUser(profile);
      setIsAuthenticated(true);
      setProfile(profile); // Lưu profile vào zustand khi đăng nhập
      toast.success("Login successful!");
      closeModal();
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    clearProfile(); // Xóa profile khỏi zustand khi logout
    toast.info("You have been logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isModalOpen, openModal, closeModal, form, errors, handleChange, handleRegister, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};