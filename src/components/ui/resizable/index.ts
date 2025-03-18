/**
 * Resizable Components
 * 
 * A set of components that allow users to resize panels within a layout.
 * Built on top of react-resizable-panels for reliable resizing functionality.
 * 
 * Features:
 * - Horizontal and vertical resizing
 * - Customizable min and max sizes
 * - Optional visual grip handles
 * - Keyboard accessible resize controls
 * - Responsive design support
 * 
 * @example Basic horizontal layout
 * ```tsx
 * import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
 * 
 * export function ResizableLayout() {
 *   return (
 *     <ResizablePanelGroup direction="horizontal" className="min-h-screen">
 *       <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
 *         <div className="p-4">Sidebar</div>
 *       </ResizablePanel>
 *       <ResizableHandle withHandle />
 *       <ResizablePanel defaultSize={75}>
 *         <div className="p-4">Content</div>
 *       </ResizablePanel>
 *     </ResizablePanelGroup>
 *   );
 * }
 * ```
 * 
 * @example Nested layouts
 * ```tsx
 * import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
 * 
 * export function CodeEditorLayout() {
 *   return (
 *     <ResizablePanelGroup direction="horizontal" className="min-h-screen">
 *       <ResizablePanel defaultSize={20}>
 *         <div className="p-2">File Explorer</div>
 *       </ResizablePanel>
 *       <ResizableHandle />
 *       <ResizablePanel defaultSize={55}>
 *         <div className="h-full">
 *           <ResizablePanelGroup direction="vertical">
 *             <ResizablePanel defaultSize={70}>
 *               <div className="p-2">Code Editor</div>
 *             </ResizablePanel>
 *             <ResizableHandle />
 *             <ResizablePanel defaultSize={30}>
 *               <div className="p-2">Terminal</div>
 *             </ResizablePanel>
 *           </ResizablePanelGroup>
 *         </div>
 *       </ResizablePanel>
 *       <ResizableHandle />
 *       <ResizablePanel defaultSize={25}>
 *         <div className="p-2">Preview</div>
 *       </ResizablePanel>
 *     </ResizablePanelGroup>
 *   );
 * }
 * ```
 */

export * from './resizable';
export * from './resizable.types';

// For backwards compatibility
import { ResizableHandle } from './resizable';
export default ResizableHandle;
