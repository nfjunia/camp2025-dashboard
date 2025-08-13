"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import sideImage from "@/public/images/ch1.jpeg";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
    } catch (error) {}
  }
  return (
    <div className="flex h-screen  bg-neutral-50 items-center px-5 w-full justify-center">
      <div className=" flex md:w-[70%] bg-white md:h-[600px] rounded-md">
        <div className="md:w-[50%] px-8 pt-6">
          <div className="w-full flex justify-center">
            <button className="bg-[#0fa2f7]/15  p-2 rounded-full text-[#0fa2f7]">
              <Lock />
            </button>
          </div>
          <div className="py-8">
            <h1 className="font-bold text-center mt-1 text-[25px]">
              Want to Reset your Password
            </h1>
            <p className="font-semibold text-[13px] text-center text-neutral-600">
              Enter your email and password and we'll send you a link to reset
              your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="pastordavid@gmail.com"
                        className="border h-12 rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-white h-12 flex itemscenter relative rounded-md hover:bg-[#0fa2f7] bg-[#0fa2f7] cursor-pointer"
              >
                {isLoading ? <span className="loader"></span> : "Send Link"}
              </Button>

              <div>
                <h1 className="text-center text-sm">
                  Forgot your Email?{" "}
                  <Link href={""} className="text-[#0fa2f7]">
                    Click here
                  </Link>
                </h1>
              </div>
            </form>
          </Form>
        </div>
        <div className="h-full rounded-e-md relative w-[50%]">
          <Image
            src={sideImage}
            alt="side_image"
            className="object-cover h-full rounded-e-md w-full"
          />
          <div className="w-full h-full absolute rounded-e-md inset-0 imagecover" />
          <div className="w-full text-white p-8 h-full absolute rounded-e-md inset-0">
            <h1 className="text-4xl leading-[50px] text-center font-bold">
              Gathering Of The Heralds Camp 2025 Meeting
            </h1>
            <p className="text-center text-neutral-400 text-sm">
              25th-28th Dec.2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
