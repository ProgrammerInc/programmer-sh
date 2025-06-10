'use client';

import { ButtonProps } from '@/components/ui/button/button.types';
import * as React from 'react';

/**
 * Sidebar Provider Props
 *
 * Props for the SidebarProvider component that manages sidebar state
 *
 * @property {boolean} [defaultOpen=true] - The default open state of the sidebar
 * @property {boolean} [open] - Controlled open state
 * @property {(open: boolean) => void} [onOpenChange] - Callback when open state changes
 */
export interface SidebarProviderProps extends React.ComponentPropsWithoutRef<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Sidebar Props
 *
 * Props for the main Sidebar component
 *
 * @property {"left" | "right"} [side="left"] - Which side the sidebar should appear on
 * @property {"sidebar" | "floating" | "inset"} [variant="sidebar"] - Visual style variant of the sidebar
 * @property {"offcanvas" | "icon" | "none"} [collapsible="offcanvas"] - How the sidebar collapses
 */
export interface SidebarProps extends React.ComponentPropsWithoutRef<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

/**
 * Sidebar Trigger Props
 *
 * Props for the SidebarTrigger component that toggles the sidebar
 * This extends ButtonProps without adding additional properties
 */
export type SidebarTriggerProps = ButtonProps;

/**
 * Sidebar Rail Props
 *
 * Props for the SidebarRail component for resizing or toggling the sidebar
 * This extends basic button props without adding additional properties
 */
export type SidebarRailProps = React.ComponentPropsWithoutRef<'button'>;

/**
 * Sidebar Content Props
 *
 * Props for the SidebarContent component for the main sidebar content
 * This extends basic div props without adding additional properties
 */
export type SidebarContentProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Sidebar Header Props
 *
 * Props for the SidebarHeader component for the sidebar header
 * This extends basic div props without adding additional properties
 */
export type SidebarHeaderProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Sidebar Footer Props
 *
 * Props for the SidebarFooter component for the sidebar footer
 * This extends basic div props without adding additional properties
 */
export type SidebarFooterProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Sidebar Group Props
 *
 * Props for the SidebarGroup component for grouping sidebar items
 */
export type SidebarGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string;
  renderTitle?: () => React.ReactNode;
  showTitle?: boolean;
};

/**
 * Sidebar Group Action Props
 *
 * Props for the SidebarGroupAction button component
 */
export type SidebarGroupActionProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

/**
 * Sidebar Menu Props
 *
 * Props for the SidebarMenu component for menu items
 */
export type SidebarMenuProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string;
  renderTitle?: () => React.ReactNode;
  showTitle?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Sidebar Menu Action Props
 *
 * Props for the SidebarMenuAction button component
 */
export type SidebarMenuActionProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  active?: boolean;
  indicator?: boolean;
};

/**
 * Sidebar Search Props
 *
 * Props for the SidebarSearch component for search functionality
 */
export type SidebarSearchProps = React.ComponentPropsWithoutRef<'div'> & {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  value?: string;
  onSubmit?: (value: string) => void;
};
