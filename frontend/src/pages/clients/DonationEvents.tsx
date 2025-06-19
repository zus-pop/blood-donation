import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactModal from "../../components/contact-modal";
import { createUser } from "@/apis/user.api";
import { toast } from "sonner";

const events = [
  {
    id: 1,
    title: "Central Community Blood Drive",
    description: "Join us at the Central Community Center for a life-saving event!",
    image: "/src/assets/hero1.png",
    date: "2025-06-20",
    location: "123 Main St, Downtown",
  },
  {
    id: 2,
    title: "Westside Medical Plaza Blood Donation",
    description: "Donate blood and help save lives at Westside Medical Plaza.",
    image: "/src/assets/hero2.png",
    date: "2025-06-25",
    location: "456 Park Ave, Westside",
  },
  {
    id: 3,
    title: "Eastside University Campus Drive",
    description: "Support students and staff by donating at Eastside University.",
    image: "/src/assets/hero1.png",
    date: "2025-07-01",
    location: "789 College Road, Eastside",
  },
  {
    id: 4,
    title: "City Hall Summer Blood Fest",
    description: "A city-wide event with music, food, and life-saving donations!",
    image: "/src/assets/hero2.png",
    date: "2025-07-10",
    location: "1 City Hall Plaza, Downtown",
  },
  {
    id: 5,
    title: "Green Park Community Blood Day",
    description: "Donate in the heart of the city at Green Park.",
    image: "/src/assets/hero1.png",
    date: "2025-07-15",
    location: "Green Park, Central City",
  },
];

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

export default function DonationEvents() {
  const [selected, setSelected] = useState<number | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
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
      toast.success("Thank you for registering to donate blood!");
      setSelected(null);
      setForm({ firstName: "", lastName: "", email: "", phone: "", password: "" });
      setErrors({});
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Donation Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer">
            <div className="overflow-hidden h-56">
              <img src={event.image} alt={event.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors duration-200">{event.title}</h2>
              <p className="mb-2 text-muted-foreground">{event.description}</p>
              <div className="mb-2 text-sm">Date: <span className="font-medium">{event.date}</span></div>
              <div className="mb-4 text-sm">Location: <span className="font-medium">{event.location}</span></div>
              <Button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold shadow-lg px-6 py-2 rounded transition-all duration-200" onClick={() => setSelected(event.id)}>
                Register to Donate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ContactModal
        open={!!selected}
        onClose={() => setSelected(null)}
        onSubmit={handleSubmit}
        form={form}
        errors={errors}
        handleChange={handleChange}
      />
    </div>
  );
} 