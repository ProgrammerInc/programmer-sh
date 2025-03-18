'use client';

/**
 * Select Component
 * 
 * A customizable select component based on Radix UI that allows users to
 * select an option from a dropdown list. This component is fully accessible
 * and provides a rich set of features.
 * 
 * Features:
 * - Accessible dropdown selection component
 * - Supports controlled and uncontrolled usage
 * - Supports grouped options
 * - Supports disabled options
 * - Keyboard navigation
 * - Customizable trigger and dropdown styling
 * - Support for placeholder text
 * - Form control integration
 * 
 * @example
 * ```
 * // Basic usage
 * <Select>
 *   <SelectTrigger className="w-[200px]">
 *     <SelectValue placeholder="Select a fruit" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *     <SelectItem value="orange">Orange</SelectItem>
 *   </SelectContent>
 * </Select>
 * 
 * // With grouped options
 * <Select>
 *   <SelectTrigger className="w-[200px]">
 *     <SelectValue placeholder="Select a food" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>Fruits</SelectLabel>
 *       <SelectItem value="apple">Apple</SelectItem>
 *       <SelectItem value="banana">Banana</SelectItem>
 *     </SelectGroup>
 *     <SelectSeparator />
 *     <SelectGroup>
 *       <SelectLabel>Vegetables</SelectLabel>
 *       <SelectItem value="carrot">Carrot</SelectItem>
 *       <SelectItem value="potato">Potato</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 */

// Export select components
export * from './select';
export * from './select.types';

// For backwards compatibility
import Select from './select';
export default Select;
