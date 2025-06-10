import { useState } from 'react';
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
import Loading from '@/components/loading';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { bloodRequestSchema, type BloodRequestSchema } from '@/pages/dashboard/bloodrequest/bloodrequest.schema';

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

    const form = useForm({
        resolver: zodResolver(bloodRequestSchema),
        defaultValues: {
            bloodType: "",
            bloodComponent: "",
            quantity: 100,
            address: "",
        },
        mode: "onChange",
    });

    const { mutate } = useMutation({
        mutationFn: createBloodRequest,
        onSuccess: () => {
            setIsSubmitting(false);
            form.reset({
                bloodType: "",
                bloodComponent: "",
                quantity: 100,
                address: "",
            });
        },
        onError: () => {
            setIsSubmitting(false);
        }
    });

    function onSubmit(data: BloodRequestSchema) {
        setIsSubmitting(true);

        const completeData = {
            ...data,
            user: "6841160d511a3b66920c0a80",
        };
        mutate(completeData);
    }

    return (
        <div className='bg-muted/50'>
            <Header />
            <div className="container mx-auto py-12 px-4 max-w-3xl ">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Request Blood Donation</h1>
                    <p className="text-muted-foreground mt-2">
                        Fill out the form below with your blood needs and location details
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
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
                                        <FormLabel>Quantity (units)</FormLabel>
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

                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto px-8 bg-red-600 hover:bg-red-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <Loading /> : "Submit Blood Request"}
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
