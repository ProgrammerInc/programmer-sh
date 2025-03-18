/**
 * Pagination Component
 * 
 * A set of components for building pagination UI with page navigation.
 * 
 * Provides a flexible API for creating pagination interfaces for content that spans 
 * multiple pages. The styling is handled via CSS modules for consistency and maintainability.
 * 
 * @example
 * ```tsx
 * import { 
 *   Pagination, 
 *   PaginationContent, 
 *   PaginationEllipsis, 
 *   PaginationItem, 
 *   PaginationLink, 
 *   PaginationNext, 
 *   PaginationPrevious 
 * } from '@/components/ui/pagination';
 * 
 * export function PaginationDemo() {
 *   return (
 *     <Pagination>
 *       <PaginationContent>
 *         <PaginationItem>
 *           <PaginationPrevious href="#" />
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#">1</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#" isActive>2</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#">3</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationEllipsis />
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationNext href="#" />
 *         </PaginationItem>
 *       </PaginationContent>
 *     </Pagination>
 *   );
 * }
 * ```
 */

// Export pagination components and types
export * from './pagination';
export * from './pagination.types';

// For backwards compatibility
import Pagination from './pagination';
export default Pagination;
