import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser, useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const personalSchema = z.object({
  phone: z.string(),
  address: z
    .string()
    .max(255, {
      message: "Address must be at most 255 characters",
    })
    .min(5, {
      message: "Address must be at least 5 characters",
    }),
});

type PersonalFormValues = z.infer<typeof personalSchema>;

interface PersonalTabProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function PersonalTab({ onValidationChange }: PersonalTabProps) {
  const { data: session } = useSession();

  const user = session?.user as Record<string, unknown>;

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      phone: (user?.phone as string) || "",
      address: (user?.address as string) || "",
    },
  });

  // Report validation state whenever it changes
  useEffect(() => {
    onValidationChange?.(form.formState.isValid);
  }, [form.formState.isValid, onValidationChange]);

  const onSubmit = async (values: PersonalFormValues) => {
    try {
      await updateUser({
        phone: values.phone || undefined,
        address: values.address || undefined,
      });
      toast.success("Personal information updated!");
    } catch {
      toast.error("Failed to update personal information");
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, State 12345"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Save Contact Information
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
