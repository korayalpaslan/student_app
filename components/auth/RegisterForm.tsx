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
import Image from "next/image";
import logo from "@/public/images/tci-logo.png";

const registerSchema = z.object({
  name: z.string().min(1, {
    message: "İsim Girmelisiniz",
  }),
  email: z.string().email({
    message: "E-posta girmeniz gereklidir",
  }),
  password: z.string().min(6, {
    message: "En az 6 haneli şifrenizi girmeniz gereklidir",
  }),
  password2: z.string().min(6, {
    message: "En az 6 haneli şifrenizi girmeniz gereklidir",
  }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);
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
    if (data.password !== data.password2) {
      serError(true);
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "user" }),
      });
      if (res.ok) {
        form.reset({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } else {
        // We can customize error message according to res.status code
        serError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="hidden lg:block h-screen lg:w-1/2 bg-red-300"></div>
      <div className="w-full lg:w-1/2 h-screen flex-center">
        <Card className="mx-auto lg:w-[450px] max-w-lg">
          <Image
            src={logo}
            width={120}
            alt="TCI Logo"
            className="mx-auto mt-8"
          />
          <CardHeader>
            <CardTitle className="text-xl">Kayıt</CardTitle>
            <CardDescription>
              TCI Öğrenci Değerlendirme Uygulaması
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
                        <FormLabel>İsim & Soyisim</FormLabel>
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
                        <FormLabel>E-posta</FormLabel>
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
                          <Input placeholder="Şifrenizi giriniz" {...field} />
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
                        <FormLabel>Şifre Teyidi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Şifrenizi tekrar giriniz"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLoading ? <p>Kayıt Yapılıyor...</p> : <p>Kayıt Ol</p>}
                </Button>
              </form>
            </Form>
            {error && (
              <div className="mt-4 text-center text-sm text-red-600">
                Hatalı veya E-posta girişi. Tekrar deneyin.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
