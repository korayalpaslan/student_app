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
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import { Target } from "lucide-react";
import Picture from "@/public/images/bg2.jpg";
import Image from "next/image";

const registerSchema = z.object({
  name: z.string().min(1, {
    message: "You must enter your name and surname",
  }),
  email: z.string().email({
    message: "You must enter your email",
  }),
  password: z.string().min(6, {
    message: "You must enter your password with minimum 6 digits",
  }),
  password2: z.string().min(6, {
    message: "You must enter your password with minimum 6 digits",
  }),
});

const LoginForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setError(false);
    if (data.password !== data.password2) {
      setError(true);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "user", isVerified: false }),
      });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Tebrikler",
          description:
            "Kaydınız başarılı ile oluşturuldu. En kısa sürede giriş onayı mail adresinize gönderilecektir.",
        });
        form.reset({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } else {
        // We can customize error message according to res.status code
        setError(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="hidden lg:block relative max-h-screen h-screen lg:w-1/2 bg-gray-950">
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
      <div className="w-full lg:w-1/2 h-auto lg:h-screen flex flex-col justify-center overflow-hidden p-4">
        <div className="font-bold text-4xl px-12 py-4 mx-auto flex items-center">
          <Target size={32} /> <span className="ml-2 mb-2">stapp</span>
        </div>
        <Card className="mx-auto lg:w-[450px] max-w-lg">
          {/* <Image
            src={logo}
            width={120}
            alt="TCI Logo"
            className="mx-auto mt-8"
          /> */}
          <CardHeader>
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Your will receive a confirmation within 24 hours of your
              submission.
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name & Surname</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="example@info.com" {...field} />
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
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input placeholder="Create a password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verify password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Verfiy your password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLoading ? <p>Please wait</p> : <p>Submit</p>}
                </Button>
              </form>
            </Form>
            {error && (
              <div className="mt-4 text-center text-sm text-red-600">
                Something went wrong. Please try again.
              </div>
            )}
          </CardContent>
        </Card>
        <div className="mx-auto mt-4">
          <BackButton text="Back to Log in page" link="/" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
