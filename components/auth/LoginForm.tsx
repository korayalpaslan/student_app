"use client";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Target } from "lucide-react";
import Picture from "@/public/images/bg.jpg";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email({
    message: "E-posta girmeniz gereklidir",
  }),
  password: z.string().min(6, {
    message: "En az 6 haneli şifrenizi girmeniz gereklidir",
  }),
});

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError(true);
        setIsLoading(false);
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="hidden lg:block relative h-screen lg:w-1/2 bg-gray-950">
        <Image
          src={Picture}
          fill
          alt="Picture"
          placeholder="blur"
          className="absolute top-0 bottom-0 right-0 left-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute z-10 h-full w-full bg-black/30 text-white text-6xl px-6 py-12 flex items-end">
          Track your student performance efficiently
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-4">
        <div className="font-bold text-4xl py-4 mx-auto flex items-center">
          <Target size={32} /> <span className="ml-2 mb-2">stapp</span>
        </div>
        <Card className="mx-auto lg:w-[450px] max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">Welcome Back 👋</CardTitle>
            <CardDescription>
              Student Tracking App for The Canadian Institute Turkiye
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(submitHandler)}
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please insert your e-mail"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Please insert your password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLoading ? <p>Please Wait</p> : <p>Log in</p>}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don't you have an account?{" "}
              <Link href="/register" className="underline font-semibold">
                Sign up
              </Link>
            </div>
            {error && (
              <div className="mt-4 text-center text-sm text-red-600">
                Your e-mail or password was incorrect. Please try again or
                sign-up if your do not have an account.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
