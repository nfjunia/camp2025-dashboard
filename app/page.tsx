"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";
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

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
const formSchema = z.object({
  phone: z
    .string()
    .regex(/^0\d{9}$|^\+?[1-9]\d{9,14}$/, {
      message: "Invalid phone number format",
    })
    .nonempty({ message: "Please enter your phone number" }),
  password: z
    .string()
    .min(4, { message: "Password must be atleast 4 characters!" })
    .max(8, { message: "This password is too long!" }),
});

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const staticUsers = {
    "0501234567": "campAdmin",
    "0551112223": "leader",
    "0531942973": "superAdmin",
    "0574112229": "pastor",
  } as const;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    let normalizedPhone = values.phone.replace(/[^\d+]/g, "");
    const userRole = staticUsers[normalizedPhone as keyof typeof staticUsers];

    try {
      // Simulate API call delay
      setTimeout(() => {
        if (userRole === "superAdmin") {
          router.push("/web/super-admin");
        } else if (userRole === "pastor") {
          router.push("/web/pastor");
        } else if (userRole === "campAdmin") {
          router.push("/web/camp-admin");
        } else {
          toast.error("Unauthorized phone number", {
            style: { backgroundColor: "#6b0000", color: "white" },
            duration: 4000,
          });
          setIsLoading(false);
          return;
        }

        toast.success("Authentication successful. You're logged in.", {
          style: { backgroundColor: "#093317", color: "white" },
          duration: 3000,
        });

        setIsLoading(false);
      }, 4000);
    } catch (err) {
      toast.error("Authentication failed. Please try again.", {
        style: { backgroundColor: "#6b0000" },
        duration: 3000,
      });
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen  bg-neutral-50 items-center px-5 w-full justify-center">
      <div className=" flex md:w-[70%] w-full bg-white shadow-sm md:h-[600px] rounded-md">
        <div className="md:w-[50%] px-8">
          <div className="py-8">
            <h1 className="font-bold text-center mt-1 text-[25px]">
              Camp 2025 Dashboard Log In
            </h1>
            <p className="text-center font-light mt-1">
              Sign in to access your dashboard
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        className="border h-11 rounded-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          className="border h-11 bg- w-full rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full mt-2 flex justify-end">
                  <Link
                    href={"/reset-password"}
                    className="text-sm hover:underline duration-150 text-[#0fa2f7]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-white h-11 rounded-md hover:bg-[#0fa2f7] bg-[#0fa2f7] cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="loader"></span> <p>Login in</p>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="h-full md:block hidden rounded-e-md relative w-[50%]">
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
