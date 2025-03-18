/**
 * Radio Group Component
 * 
 * A set of checkable buttons—known as radio buttons—where only one can be checked at a time.
 * This component is built on top of Radix UI's RadioGroup primitive for maximum
 * accessibility and customization.
 * 
 * Features:
 * - Keyboard navigation (arrow keys, space to select)
 * - Screen reader announcements
 * - Focus management with custom focus styles
 * - Automatic ARIA attributes
 * - Customizable appearance
 * - Disabled state support
 * 
 * @example Basic usage
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
 * import { Label } from '@/components/ui/label';
 * 
 * export function RadioGroupExample() {
 *   return (
 *     <RadioGroup defaultValue="option-one">
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupItem value="option-one" id="option-one" />
 *         <Label htmlFor="option-one">Option One</Label>
 *       </div>
 *       <div className="flex items-center space-x-2">
 *         <RadioGroupItem value="option-two" id="option-two" />
 *         <Label htmlFor="option-two">Option Two</Label>
 *       </div>
 *     </RadioGroup>
 *   );
 * }
 * ```
 * 
 * @example With form submission
 * ```tsx
 * import { useState } from 'react';
 * import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
 * 
 * export function RadioGroupForm() {
 *   const [value, setValue] = useState("default");
 *   
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     console.log('Selected option:', value);
 *   };
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <RadioGroup value={value} onValueChange={setValue}>
 *         <div className="space-y-2">
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="default" id="default" />
 *             <Label htmlFor="default">Default</Label>
 *           </div>
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="comfortable" id="comfortable" />
 *             <Label htmlFor="comfortable">Comfortable</Label>
 *           </div>
 *           <div className="flex items-center space-x-2">
 *             <RadioGroupItem value="compact" id="compact" />
 *             <Label htmlFor="compact">Compact</Label>
 *           </div>
 *         </div>
 *       </RadioGroup>
 *       <button type="submit" className="mt-4">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */

// Export radio-group components
export * from './radio-group';
export * from './radio-group.types';

// For backwards compatibility
import { RadioGroup } from './radio-group';
export default RadioGroup;
