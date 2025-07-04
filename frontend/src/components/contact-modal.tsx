import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (e: React.FormEvent) => void;
  onLogin: (e: React.FormEvent) => void;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  };
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, onRegister, onLogin, form, errors, handleChange }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(e);
    } else {
      onRegister(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center">{isLoginView ? "Login" : "Contact Information"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            {isLoginView ? "Login" : "Confirm Registration"}
          </Button>
          <Button type="button" variant="link" onClick={() => setIsLoginView(!isLoginView)} className="w-full">
            {isLoginView ? "Don't have an account? Register" : "Already have an account? Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal; 