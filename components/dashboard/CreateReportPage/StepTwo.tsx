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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Yorum Girmelisiniz",
  }),
});
const StepTwo = ({ setComment, setCurrentStep, prev, commentData }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: commentData,
    },
  });
  const submitHandler = async (data: z.infer<typeof formSchema>) => {
    setComment(data.comment);
    setCurrentStep(2);
  };
  return (
    <div className=" w-full lg:w-3/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="w-full mx-auto"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teacher Comment in{" "}
                  <span className="font-semibold">Turkish</span>{" "}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    placeholder="Lütfen yorumunuzu Türkçe olarak yazın / Please insert your comment in Turkish"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 items-center justify-between">
            <Button
              type="button"
              className="lg:w-1/3 mt-10"
              onClick={() => prev()}
            >
              Prev
            </Button>
            <Button type="submit" className="lg:w-1/3  mt-10">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepTwo;
