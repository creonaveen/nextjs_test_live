'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Form validation schema
const formSchema = z.object({
  search: z.string().optional(),
  searchRight: z.string().optional(),
  framework: z.string({
    required_error: 'Please select a framework.',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  bio: z.string().max(160, {
    message: 'Bio must not be longer than 160 characters.',
  }),
  role: z.string({
    required_error: 'Please select a role.',
  }),
  notifications: z.boolean({
    required_error: 'Please set notifications preference.',
  }),
  marketing: z.boolean({
    required_error: 'Please set marketing preference.',
  }),
  subscription: z.enum(['free', 'pro', 'enterprise'], {
    required_error: 'Please select a subscription plan.',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export function FormExample() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver<FormValues, unknown, FormValues>(formSchema),
    defaultValues: {
      search: '',
      searchRight: '',
      framework: '',
      username: '',
      email: '',
      password: '',
      bio: '',
      notifications: false,
      marketing: false,
      terms: false,
    },
  });

  function onSubmit() {
    // Handle form submission
    toast({
      title: 'Form submitted successfully',
      description: 'Your information has been saved.',
    });
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                    <Input placeholder="Search..." className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormDescription>Search for anything you need.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="searchRight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search (Right Icon)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Search with right icon..." className="pr-8" {...field} />
                    <Search className="text-muted-foreground absolute top-2.5 right-2 h-4 w-4" />
                  </div>
                </FormControl>
                <FormDescription>Search with icon on the right side.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="framework"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Framework</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? frameworks.find((framework) => framework.value === field.value)?.label
                          : 'Select framework'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            value={framework.label}
                            key={framework.value}
                            onSelect={() => {
                              form.setValue('framework', framework.value);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === framework.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the framework that will be used for your project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormDescription>We'll never share your email with anyone else.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormDescription>Must be at least 8 characters long.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Brief description for your profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your role in the organization.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="free" />
                      </FormControl>
                      <FormLabel className="font-normal">Free</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="pro" />
                      </FormControl>
                      <FormLabel className="font-normal">Pro</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="enterprise" />
                      </FormControl>
                      <FormLabel className="font-normal">Enterprise</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Marketing Emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export const formExampleCode = `import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  notifications: z.boolean({
    required_error: "Please set notifications preference.",
  }),
  marketing: z.boolean({
    required_error: "Please set marketing preference.",
  }),
  subscription: z.enum(["free", "pro", "enterprise"], {
    required_error: "Please select a subscription plan.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function FormExample() {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      notifications: false,
      marketing: false,
      terms: false,
    },
  })

  function onSubmit() {
    toast({
      title: "Form submitted successfully",
      description: "Your information has been saved.",
    })
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormDescription>We'll never share your email with anyone else.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormDescription>Must be at least 8 characters long.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Brief description for your profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your role in the organization.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="free" />
                      </FormControl>
                      <FormLabel className="font-normal">Free</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="pro" />
                      </FormControl>
                      <FormLabel className="font-normal">Pro</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="enterprise" />
                      </FormControl>
                      <FormLabel className="font-normal">Enterprise</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Marketing Emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}`;
