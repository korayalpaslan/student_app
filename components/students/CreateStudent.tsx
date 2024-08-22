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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const moment = require("moment");

const formSchema = z.object({
  fullname: z.string().min(1, {
    message: "İsim Soyisim Girmelisiniz",
  }),
  level: z.string().min(1, {
    message: "Düzey Girmelisiniz",
  }),
  class: z.string().min(1, {
    message: "Sınıf Girmelisiniz",
  }),
  birth_date: z.date({
    required_error: "Doğum Tarihi girmelisiniz.",
  }),
});

const CreateStudent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      class: "",
      level: "",
      birth_date: new Date(),
    },
  });

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    const birth = moment(data.birth_date).add(1, "day").format();

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          birth_date: birth,
        }),
      });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Tebrikler",
          description: "Yeni öğrenci kaydınız başarılı ile oluşturuldu.",
        });
        form.reset({
          fullname: "",
          class: "",
          level: "",
          birth_date: new Date(),
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
    <div className="mt-8">
      <div className="pb-4 border-b border-b-gray-200 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Yeni Öğrenci Kaydı
        </h4>
        <p className="text-sm text-muted-foreground">
          Yeni kayıt edeceğiniz öğrencinin bilgilerini eksiksiz giriniz
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="grid gap-4"
        >
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="grid gap-2">
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
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sınıfı</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İngilizce Düzeyi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Öğrencinin eğitim alacağı ingilizce düzeyi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A1">A1</SelectItem>
                          <SelectItem value="A1+">A1+</SelectItem>
                          <SelectItem value="B1">B1</SelectItem>
                          <SelectItem value="B1+">B1+</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel className="mb-1">Doğum Tarihi</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Tarih seçiniz</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="lg:w-1/4">
            {isLoading ? <p>Kayıt Yapılıyor...</p> : <p>Oluştur</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateStudent;
