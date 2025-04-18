
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  purpose: z.enum(["booking", "event"], {
    required_error: "Please select a purpose",
  }),
});

export function WhatsAppForm({ 
  open, 
  onOpenChange 
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      purpose: "booking",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const text = values.purpose === "booking" 
      ? "I'd like to book a room at Kolol Riverside Resort"
      : "I'd like to book an event at Kolol Riverside Resort";
    
    const whatsappUrl = `https://wa.me/254712840300?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us on WhatsApp</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your WhatsApp number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="booking" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Book a Room
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="event" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Book an Event
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Continue to WhatsApp</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
