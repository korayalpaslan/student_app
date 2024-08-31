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
  month: z.string().min(1, {
    message: "Ay Seçimi Yapmalısınız",
  }),
});

const StepOne = ({
  students,
  setCurrentStep,
  setSelectedMonth,
  setSelectedStudentId,
}: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: "",
      month: "",
    },
  });
  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    const value: any = months.map((item) => item.name).indexOf(data.month);
    setSelectedStudentId(data.student);
    setSelectedMonth(value);
    setCurrentStep(1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid gap-4 w-full lg:w-3/4 mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="grid gap-4 col-span-2 lg:col-span-1">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Student Name & Surname</FormLabel> */}
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
                name="month"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Student Name & Surname</FormLabel> */}
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((item: any) => {
                          return (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
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
        </div>
        <Button type="submit" className="lg:w-1/4 mx-auto mt-10">
          Next
        </Button>
      </form>
    </Form>
  );
};

export default StepOne;
