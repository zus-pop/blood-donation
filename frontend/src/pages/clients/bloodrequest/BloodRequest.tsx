import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createBloodRequest } from '@/apis/bloodrequest.api';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '@/components/loading';
import { useProfileStore } from '@/store/profileStore';

import { z } from "zod";
import Footer from '@/components/footer';
import { toast } from 'sonner';

export const clientBloodRequestSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required").regex(/^\+?[0-9]{9,11}$/, "Phone number must be valid (9-11 digits)"),
    bloodType: z.string().min(1, "Blood type is required"),
    bloodComponent: z.string().min(1, "Blood component is required"),
    quantity: z.number().min(100, "Quantity must be at least 100ml"),
    address: z.string().trim().min(1, "Address is required"),
    requestedBy: z.string().min(1, "User Request ID is required"),
});

export type ClientBloodRequestSchema = z.infer<typeof clientBloodRequestSchema>;
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BLOOD_COMPONENTS = [
    "WHOLE_BLOOD",
    "PLASMA",
    "PLATELETS",
    "RED_CELLS",
    "WHITE_CELLS"
];



export default function BloodRequest() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmInfo, setConfirmInfo] = useState(false);
    const { profile } = useProfileStore();

    const form = useForm({
        resolver: zodResolver(clientBloodRequestSchema),
        defaultValues: {
            name: "",
            phone: "",
            bloodType: "",
            bloodComponent: "",
            quantity: 100,
            address: "",
            requestedBy: profile?._id || "",
        },
        mode: "onChange",
    });


    // Auto-fill form when profile is available
    useEffect(() => {
        if (profile) {
            const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
            form.setValue('name', fullName || profile.email || '');
            form.setValue('phone', profile.phone || '');
            form.setValue('requestedBy', profile._id);
        }
    }, [profile, form]);

    const { mutate } = useMutation({
        mutationFn: createBloodRequest,
        onSuccess: () => {
            setIsSubmitting(false);
            const fullName = profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : '';
            form.reset({
                name: fullName || profile?.email || '',
                phone: profile?.phone || '',
                bloodType: "",
                bloodComponent: "",
                quantity: 100,
                address: "",
                requestedBy: profile?._id || "",
            });
            setConfirmInfo(false);
            toast.success("Blood request submitted successfully!");
        },
        onError: () => {
            setIsSubmitting(false);
            toast.error("Failed to submit blood request. Please try again.");
        }
    });

    function onSubmit(data: ClientBloodRequestSchema) {
        // Check if user is logged in
        if (!profile || !profile._id) {
            toast.error("Please log in to submit a blood request. Click the 'Login Now' button above.");
            return;
        }

        // Check if information is confirmed
        if (!confirmInfo) {
            toast.error("Please confirm that the information provided is accurate.");
            return;
        }

        setIsSubmitting(true);
        console.log(data);
        mutate(data);
    }

    return (
        <div className='bg-muted/50'>
            <div className="container mx-auto py-12 px-4 max-w-3xl ">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Request Blood</h1>
                    <p className="text-muted-foreground mt-2">
                        Fill out the form below with your blood needs and location details
                    </p>
                </div>

                {/* Profile Info Display */}
                {profile && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Profile Information</h3>
                        <div className=" gap-4 text-sm">
                            <div className="mb-2">
                                <span className="font-medium text-blue-700">Email: </span>
                                <span className="text-blue-600">{profile.email}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-medium text-blue-700">Name: </span>
                                <span className="text-blue-600">
                                    {`${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.email}
                                </span>
                            </div>
                            <div className="mb-2">
                                <span className="font-medium text-blue-700">Phone: </span>
                                <span className="text-blue-600">{profile.phone || 'Not provided'}</span>
                            </div>

                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                            * This information has been automatically filled in the form below
                        </p>
                    </div>
                )}


                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className={profile ? "bg-blue-50 border-blue-200" : ""}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Enter your phone number"
                                                    className={profile?.phone ? "bg-blue-50 border-blue-200" : ""}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bloodType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Type Needed</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select blood type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {BLOOD_TYPES.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bloodComponent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Component</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select component" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {BLOOD_COMPONENTS.map((comp) => (
                                                            <SelectItem key={comp} value={comp}>
                                                                {comp.replace('_', ' ')}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity (ml)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="50"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
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
                                        <FormLabel>Delivery Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please provide your complete address where the blood is needed..."
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-blue-50 border-blue-200">
                                <Checkbox
                                    checked={confirmInfo}
                                    onCheckedChange={(checked) => setConfirmInfo(checked === true)}
                                />
                                <div className="space-y-1 leading-none">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Confirm Information
                                    </label>
                                    <p className="text-xs text-muted-foreground">
                                        I confirm that all the information provided above is accurate and complete. I understand that providing false information may delay or prevent the blood request process.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto px-8 bg-red-600 hover:bg-red-700"
                                    disabled={isSubmitting || !profile || !confirmInfo}
                                >
                                    {isSubmitting ? <Loading /> : !profile ? "Please Login to Submit" : "Submit Blood Request"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Important Information</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        <li>Your request will be reviewed by our medical team</li>
                        <li>We will contact you to confirm the details</li>
                        <li>Blood availability depends on current inventory and donor matches</li>
                        <li>For emergency requests, please also contact your nearest hospital directly</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );

}
