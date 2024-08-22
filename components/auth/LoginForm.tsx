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
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      <div className="hidden lg:block h-screen lg:w-1/2 bg-gray-950"></div>
      <div className="w-full lg:w-1/2 h-screen flex-center">
        <Card className="mx-auto lg:w-[450px] max-w-lg">
          <Image
            src={logo}
            width={120}
            alt="TCI Logo"
            className="mx-auto mt-8"
          />
          <CardHeader>
            <CardTitle className="text-xl">Giriş</CardTitle>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input placeholder="E-postanızı giriniz" {...field} />
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
                          <Input
                            type="password"
                            placeholder="Şifrenizi giriniz"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLoading ? <p>Giriş Yapılıyor...</p> : <p>Oturum Aç</p>}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Henüz bir hesabınız yok mu?{" "}
              <Link href="/register" className="underline">
                Üye Ol
              </Link>
            </div>
            {/*
            <div className="mt-4 text-center text-sm">
              <Link href="#" className="underline">
                Şifremi Unuttum
              </Link>
            </div> */}
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
