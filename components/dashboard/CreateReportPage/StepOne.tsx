"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
const moment = require("moment");
import { startOfYesterday } from "date-fns";

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
      start_date: startOfYesterday(),
      end_date: startOfYesterday(),
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
        className="flex flex-col items-center"
      >
        <div className="grid lg:grid-cols-3 gap-4 place-content-center w-full">
          <div className="lg:col-span-1">
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
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full">
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
                          toDate={startOfYesterday()}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
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
                          toDate={startOfYesterday()}
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
