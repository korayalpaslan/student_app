"use client";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  { name: "January", id: 0 },
  { name: "February", id: 1 },
  { name: "March", id: 2 },
  { name: "April", id: 3 },
  { name: "May", id: 4 },
  { name: "June", id: 5 },
  { name: "July", id: 6 },
  { name: "August", id: 7 },
  { name: "September", id: 8 },
  { name: "October", id: 9 },
  { name: "November", id: 10 },
  { name: "December", id: 11 },
];

const formSchema = z.object({
  student: z.string().min(1, {
    message: "Öğrenci Adı Girmelisiniz",
  }),
  // month: z.string().min(1, {
  //   message: "Ay Seçimi Yapmalısınız",
  // }),
  start_date: z.date({
    required_error: "Başlangıç Tarihi girmelisiniz.",
  }),
  end_date: z.date({
    required_error: "Bitiş Tarihi girmelisiniz.",
  }),
});

const StepOne = ({
  students,
  setCurrentStep,
  setStartDate,
  setEndDate,
  setSelectedStudentId,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });
  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    setSelectedStudentId(data.student);
    setStartDate(data.start_date);
    setEndDate(data.end_date);
    setCurrentStep(1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid gap-4 w-full mx-auto"
      >
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="grid gap-4 col-span-2 lg:col-span-2">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name & Surname</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.data.map((item: any) => {
                          return (
                            <SelectItem key={item._id} value={item._id}>
                              {item.fullname}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-4 col-span-2 lg:col-span-1">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-1.5">
                    <FormLabel className="mb-1">Report Start Date</FormLabel>

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
          <div className="grid gap-4 col-span-2 lg:col-span-1">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-1.5">
                    <FormLabel className="mb-1">Report End Date</FormLabel>

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
        <Button type="submit" className="lg:w-1/4 mx-auto mt-10">
          Next
        </Button>
      </form>
    </Form>
  );
};

export default StepOne;
