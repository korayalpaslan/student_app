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
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const moment = require("moment");

const formSchema = z.object({
  student: z.string().min(1, {
    message: "Öğrenci Adı Girmelisiniz",
  }),
  birth_date: z.date({
    required_error: "Doğum Tarihi girmelisiniz.",
  }),
  criteria_one: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
  criteria_two: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
  criteria_three: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
  criteria_four: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
  criteria_five: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),

  comment: z.string(),
});

const CreateReview = ({ students, teacher_id }: any) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const [level, setLevel] = useState("");
  const [error, serError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: "",
      birth_date: new Date(),
      criteria_one: "1",
      criteria_two: "1",
      criteria_three: "1",
      criteria_four: "1",
      criteria_five: "1",

      comment: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    const lesson_date = moment(data.birth_date).add(3, "hour");
    setIsLoading(true);
    const studentLevel = students.data.find(
      (student: any) => student._id === data.student
    );

    try {
      const res = await fetch(`${process.env.API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          criterias: [
            Number(data.criteria_one),
            Number(data.criteria_two),
            Number(data.criteria_three),
            Number(data.criteria_four),
            Number(data.criteria_five),
          ],
          teacher: teacher_id,
          level: studentLevel.level,
          lesson_date,
          isAttended: isChecked,
        }),
      });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Congrats 🎉",
          description: "You have created a new review",
        });
        form.reset({
          student: "",
          birth_date: new Date(),
          criteria_one: "1",
          criteria_two: "1",
          criteria_three: "1",
          criteria_four: "1",
          criteria_five: "1",
          comment: "",
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
    <div className="mt-8 max-w-[1000px]">
      <div className="pb-4 border-b border-b-gray-200 mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Create a review
        </h4>
        <p className="text-sm text-muted-foreground lg:w-1/2">
          You are requested to complete the form provided after each class
          session for every student. Your input is valued as our Education
          Coaches will utilize this information during their discussions with
          the students.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="grid gap-4"
        >
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="grid gap-4 col-span-2 lg:col-span-1">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name & Surname</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.data.map((item: any) => {
                            return (
                              <SelectItem
                                key={item._id}
                                value={item._id}
                                // value={item._id}
                              >
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
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel className="mb-1">Lesson Date</FormLabel>

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
            <div className="col-span-2 w-full lg:w-1/2">
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mr-2">
                <div>
                  <FormLabel className="text-sm">Attendance</FormLabel>
                  <FormDescription>
                    Switch the button in case the student has not attended.
                  </FormDescription>
                </div>
                <div>
                  <FormControl>
                    <Switch
                      checked={isChecked}
                      onCheckedChange={() =>
                        setChecked((prevState: any) => !prevState)
                      }
                    />
                  </FormControl>
                </div>
              </FormItem>
            </div>
            {isChecked && (
              <>
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_one"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>PARTICIPATION & ENGAGEMENT </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Hardly contributes; avoids speaking
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Sometimes contributes when asked
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Contributes most of the time
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Very active and eager to participate
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_two"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>FLUENCY</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speech is very limited with long pauses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speaks in short phrases with frequent pauses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speaks in simple sentences with minor pauses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speaks smoothly with confidence
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_three"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>PRONUNCIATION & CLARITY </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speech is often difficult to understand
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Some words are unclear but meaning is usually
                                  understood
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Pronunciation is mostly clear
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Speech is clear and easy to understand
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_four"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>VOCABULARY USE</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Uses very limited vocabulary
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Uses basic words; struggles to expand answers
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Uses appropriate vocabulary for the topic
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Uses a wide range of words accurately
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_five"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>LISTENING & COMPREHENSION </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Has difficulty understanding instructions
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Understands simple instructions with support
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Understands instructions and questions well
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Understands easily and responds appropriately
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="criteria_six"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>CONTRIBUTES TO LESSON</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="1"
                                    checked={field.value === "1"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Did not contribute
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="2"
                                    checked={field.value === "2"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Needs to be encouraged
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="3"
                                    checked={field.value === "3"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Good
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    value="4"
                                    checked={field.value === "4"}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Very Good
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div> */}
                <div className="grid gap-4 mb-4 col-span-2 lg:col-span-1">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Comment</FormLabel>
                          <FormControl>
                            <Textarea
                              className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                              placeholder="Anything to highlight"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <Button type="submit" className="lg:w-1/4">
            {isLoading ? <p>Please Wait</p> : <p>Submit</p>}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateReview;
