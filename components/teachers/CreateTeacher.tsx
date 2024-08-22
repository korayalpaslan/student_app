"use client";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: "İsim Soyisim Girmelisiniz",
  }),
  title: z.string().min(1, {
    message: "Ünvan Girmelisiniz",
  }),
  email: z.string().email({
    message: "E-posta girmeniz gereklidir",
  }),
});

const CreateTeacher = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      title: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}/api/teachers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Tebrikler",
          description: "Yeni öğretmen kaydınız başarılı ile oluşturuldu.",
        });
        form.reset({
          fullname: "",
          email: "",
          title: "",
        });
        setIsLoading(false);
      } else {
        // We can customize error message according to res.status code
        serError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 lg:w-1/2">
      <div className="pb-4 border-b border-b-gray-200 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Yeni Öğretmen Kaydı
        </h4>
        <p className="text-sm text-muted-foreground">
          Yeni kayıt edeceğiniz öğretmenin bilgilerini giriniz
        </p>
      </div>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İsim Soyisim</FormLabel>
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ünvan</FormLabel>
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
          <Button type="submit" className="lg:w-1/2 mt-4">
            {isLoading ? <p>Kayıt Yapılıyor...</p> : <p>Oluştur</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeacher;
