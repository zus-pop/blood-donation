import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getProfile, loginUser } from "../../apis/auth.api";
import { loginSchema, type LoginSchema } from "./login.schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { profile, accessToken, setProfile, setAccessToken } =
    useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (
      accessToken &&
      profile &&
      (profile.role === "STAFF" || profile.role === "ADMIN")
    ) {
      setIsPageLoading(true);
      navigate("/dashboard");
    } else {
      setIsPageLoading(false);
    }
  }, [profile, navigate]);

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);

    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });
      setAccessToken(res.access_token);
      const userProfile = await getProfile();
      if (userProfile.role === "MEMBER") {
        toast.error("You are not authorized to access the dashboard.");
        setIsLoading(false);
        setAccessToken(null);
        return;
      }
      setProfile(userProfile);

      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return <Loading message="Redirecting to dashboard..." fullscreen />;
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>{" "}
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>{" "}
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
