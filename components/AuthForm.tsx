"use client"

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authFormSchema } from "@/lib/utils"
import { MessagesSquare } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import Link from "next/link";

export default function AuthForm({ type } : { type: string }) {
    
    const formSchema = authFormSchema(type)

    const isSignIn = type === "sign-in"

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        
        console.log(values)
    }

    return (
        <div className="form-border lg:min-w-[500px] w-full">
            <div className="flex flex-col gap-3 justify-center px-6 pb-8 text-center">
                <div className="flex flex-row justify-center items-center gap-2">
                    <MessagesSquare className="size-12 text-orange-400" />
                    <h1 className="text-3xl font-medium">PrepTiq</h1>
                </div>
                <h3 className="text-xl font-medium">Al-Powered Job Interview with AI</h3>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {!isSignIn && (
                          <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="font-light text-normal">Your Name</FormLabel>
                                  <FormControl>
                                      <Input
                                        className="h-10" 
                                        placeholder="Your Name" {...field} />
                                  </FormControl>
                              </FormItem>
                          )}
                      />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-light text-normal">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-10"  
                                        placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-light text-normal">Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        className="h-10" 
                                        placeholder="Password" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {!isSignIn && (
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="font-light text-normal">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            className="h-10" 
                                            placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                      />
                    )}

                    <Button
                        className="w-full h-10 cursor-pointer" 
                        type="submit">Submit
                    </Button>

                    <span className="flex justify-center">
                        {isSignIn ? "Don't have an account?" : "Have an account already?" }
                        <Link 
                            href={isSignIn ? "/sign-up" : "sign-in"}
                            className="inline-block pl-1 font-bold hover:text-orange-400">
                            {isSignIn ? "Sign up" : "Sign In"}
                        </Link>
                    </span>

                    <div className="grid grid-cols-[1fr_min-content_1fr] gap-4 items-center">
                        <div className="h-[1px] bg-[#08090D]"></div>
                        <div className="text-base">OR</div>
                        <div className="h-[1px] bg-[#08090D]"></div>
                    </div>
                    <Button className="flex items-center justify-center h-10 w-full text-base rounded-md cursor-pointer">
                        <Image src="/google-logo.svg" alt="Google Logo" height={14} width={14} />Sign In With Google
                    </Button>
                </form>
            </Form>
        </div>
    )
}