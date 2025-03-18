/**
 * Form Component System
 *
 * A comprehensive form component system built on top of react-hook-form and Radix UI primitives.
 * This system provides accessible, type-safe, and customizable form components.
 *
 * Components:
 * - Form: The main form context provider (wraps react-hook-form's FormProvider)
 * - FormField: Connects a form field to the form context
 * - FormItem: Container for grouping a field with its label, description, and error message
 * - FormLabel: Label for the form field
 * - FormControl: Wrapper for the actual input element
 * - FormDescription: Additional help text for the field
 * - FormMessage: Displays validation errors
 *
 * @example
 * ```tsx
 * const form = useForm<FormValues>({ ... });
 *
 * return (
 *   <Form {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       <FormField
 *         control={form.control}
 *         name="email"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>Email</FormLabel>
 *             <FormControl>
 *               <Input {...field} />
 *             </FormControl>
 *             <FormDescription>Enter your email address</FormDescription>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <Button type="submit">Submit</Button>
 *     </form>
 *   </Form>
 * );
 * ```
 *
 * @module
 */

// Export form components and types
export * from './form';
export * from './form.context';
export * from './form.hooks';
export * from './form.types';

// For backwards compatibility
import Form from './form';
export default Form;
