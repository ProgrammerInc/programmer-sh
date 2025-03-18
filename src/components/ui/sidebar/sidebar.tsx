'use client';

import * as React from 'react';
import { memo, useCallback, useState, useMemo } from 'react';
import { cn } from '@/utils/app.utils';
import { useIsMobile } from '@/hooks/use-is-mobile.hook';
import { Sheet, SheetContent } from '@/components/ui/sheet/sheet';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip/tooltip';
import { PanelLeft } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

import {
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_KEYBOARD_SHORTCUT
} from './sidebar.constants';
import { SidebarContextProvider } from './sidebar.context';
import { SidebarContextType } from './sidebar.context-def';
import { useSidebar } from './sidebar.hooks';
import styles from './sidebar.module.css';
import type {
  SidebarProviderProps,
  SidebarProps,
  SidebarTriggerProps,
  SidebarRailProps,
  SidebarContentProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  SidebarGroupProps,
  SidebarGroupActionProps,
  SidebarMenuProps,
  SidebarMenuActionProps,
  SidebarSearchProps
} from './sidebar.types';

/**
 * Sidebar Provider Component
 * 
 * Provides sidebar context and manages sidebar state for all sidebar components.
 * This component handles state management, keyboard shortcuts, and responsive behavior.
 * 
 * Features:
 * - Manages open/closed state of the sidebar
 * - Provides responsive behavior for desktop and mobile views
 * - Supports keyboard shortcuts for toggling sidebar
 * - Persists sidebar state in cookies
 * 
 * @example
 * <SidebarProvider>
 *   <Sidebar>
 *     Sidebar content
 *   </Sidebar>
 *   <main>Main content</main>
 * </SidebarProvider>
 */
const SidebarProvider = memo(
  React.forwardRef<HTMLDivElement, SidebarProviderProps>((
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobileCheck = useIsMobile();
    const [open, setOpen] = useState(defaultOpen);
    const [openMobile, setOpenMobile] = useState(false);
    const [state, setState] = useState<'expanded' | 'collapsed'>(
      defaultOpen ? 'expanded' : 'collapsed'
    );

    // If this is uncontrolled, we'll use the internal state.
    // If it is controlled, we'll use the provided state.
    const isOpen = openProp ?? open;
    const setIsOpen = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        if (typeof value === 'function') {
          setOpen((prev) => value(prev));
        } else {
          setOpen(value);
        }
        if (setOpenProp) {
          if (typeof value === 'function') {
            setOpenProp(value(isOpen));
          } else {
            setOpenProp(value);
          }
        }
      },
      [setOpen, setOpenProp, isOpen]
    );

    const toggleSidebar = useCallback(() => {
      setIsOpen(prev => !prev);
      setState(prev => (prev === 'expanded' ? 'collapsed' : 'expanded'));
    }, [setIsOpen, setState]);

    // Update cookie when sidebar state changes
    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${state}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [state]);

    // Add keyboard shortcut for sidebar toggle
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === SIDEBAR_KEYBOARD_SHORTCUT) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSidebar]);

    const contextValue = useMemo(
      () => ({
        state,
        open: isOpen,
        setIsOpen,
        openMobile,
        setOpenMobile,
        isMobile: isMobileCheck,
        toggleSidebar,
      }),
      [state, isOpen, setIsOpen, openMobile, setOpenMobile, isMobileCheck, toggleSidebar]
    );

    const wrapperClassNames = useMemo(() => {
      return cn(styles.wrapper, className);
    }, [className]);

    return (
      <SidebarContextProvider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            data-sidebar="provider"
            ref={ref}
            className={wrapperClassNames}
            style={{
              ...style,
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON
            } as React.CSSProperties}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContextProvider>
    );
  })
);

SidebarProvider.displayName = 'SidebarProvider';

/**
 * Main Sidebar Component
 * 
 * A versatile sidebar component with multiple variants and configurations.
 * 
 * Features:
 * - Multiple position options (left/right)
 * - Multiple variants (sidebar/floating/inset)
 * - Multiple collapse behaviors (offcanvas/icon/none)
 * - Responsive design with mobile support
 * - Smooth animations and transitions
 * 
 * @example
 * // Basic sidebar
 * <Sidebar>
 *   <SidebarContent>Content here</SidebarContent>
 * </Sidebar>
 * 
 * // Floating variant with right position
 * <Sidebar variant="floating" side="right">
 *   <SidebarContent>Content here</SidebarContent>
 * </Sidebar>
 * 
 * // Icon-based collapsible sidebar
 * <Sidebar collapsible="icon">
 *   <SidebarContent>Content here</SidebarContent>
 * </Sidebar>
 */
const Sidebar = memo(
  React.forwardRef<HTMLDivElement, SidebarProps>((
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    const sidebarGapClasses = useMemo(() => {
      return cn(styles.sidebarGap);
    }, []);

    const sidebarInnerClasses = useMemo(() => {
      return cn(styles.sidebarInner, className);
    }, [className]);

    const sidebarInnerContentClasses = useMemo(() => {
      return cn(styles.sidebarInnerContent);
    }, []);

    React.useEffect(() => {
      if (isMobile) {
        // Set the mobile sidebar width via CSS variable
        const sidebarElement = document.querySelector(
          '[data-sidebar="sidebar"][data-mobile="true"]'
        );
        if (sidebarElement) {
          (sidebarElement as HTMLElement).style.width = SIDEBAR_WIDTH_MOBILE;
        }
      }
    }, [isMobile]);

    if (!side) {
      return null;
    }

    if (collapsible === 'none') {
      return (
        <div
          data-sidebar="sidebar"
          className={cn(styles.sidebar, className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className={styles.mobileSidebar}
            side={side}
          >
            <div className={styles.sidebarContent}>{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(styles.sidebarWrapper)}
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div className={sidebarGapClasses} />
        <div className={sidebarInnerClasses} {...props}>
          <div data-sidebar="sidebar" className={sidebarInnerContentClasses}>
            {children}
          </div>
        </div>
      </div>
    );
  })
);

Sidebar.displayName = 'Sidebar';

/**
 * Sidebar Trigger Component
 * 
 * A button to toggle the sidebar visibility.
 * 
 * Features:
 * - Accessible button with proper aria labels
 * - Icon indicator for sidebar toggle action
 * - Customizable appearance through className
 * 
 * @example
 * <SidebarTrigger />
 * 
 * // With custom styling
 * <SidebarTrigger className="absolute top-4 left-4" />
 */
const SidebarTrigger = memo(
  React.forwardRef<React.ElementRef<typeof Button>, SidebarTriggerProps>((
    { className, onClick, ...props },
    ref
  ) => {
    const { toggleSidebar } = useSidebar();

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        toggleSidebar();
      },
      [onClick, toggleSidebar]
    );

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn(styles.trigger, className)}
        onClick={handleClick}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  })
);

SidebarTrigger.displayName = 'SidebarTrigger';

/**
 * Sidebar Rail Component
 * 
 * A draggable rail for resizing or toggling the sidebar.
 * 
 * Features:
 * - Visual indicator for sidebar edge
 * - Click interaction to toggle sidebar state
 * - Hover effect to highlight actionable area
 * 
 * @example
 * <Sidebar>
 *   <SidebarContent>
 *     Content here
 *     <SidebarRail />
 *   </SidebarContent>
 * </Sidebar>
 */
const SidebarRail = memo(
  React.forwardRef<HTMLButtonElement, SidebarRailProps>((
    { className, ...props },
    ref
  ) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(styles.rail, className)}
        {...props}
      />
    );
  })
);

SidebarRail.displayName = 'SidebarRail';

/**
 * Sidebar Content Component
 * 
 * The main container for sidebar content.
 * 
 * Features:
 * - Properly structured layout container for sidebar content
 * - Scrollable area for overflow content
 * - Flexible sizing and spacing
 * 
 * @example
 * <Sidebar>
 *   <SidebarContent>
 *     <SidebarHeader>Header</SidebarHeader>
 *     <SidebarGroup>Group content</SidebarGroup>
 *     <SidebarFooter>Footer</SidebarFooter>
 *   </SidebarContent>
 * </Sidebar>
 */
const SidebarContent = memo(
  React.forwardRef<HTMLDivElement, SidebarContentProps>((
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(styles.content, className)}
        {...props}
      />
    );
  })
);

SidebarContent.displayName = 'SidebarContent';

/**
 * Sidebar Header Component
 * 
 * Container for the top section of the sidebar.
 * 
 * Features:
 * - Distinct styling for header separation
 * - Proper spacing and layout for header content
 * 
 * @example
 * <SidebarHeader>
 *   <h2 className="text-lg font-semibold">Dashboard</h2>
 * </SidebarHeader>
 */
const SidebarHeader = memo(
  React.forwardRef<HTMLDivElement, SidebarHeaderProps>((
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn(styles.header, className)}
        {...props}
      />
    );
  })
);

SidebarHeader.displayName = 'SidebarHeader';

/**
 * Sidebar Footer Component
 * 
 * Container for the bottom section of the sidebar.
 * 
 * Features:
 * - Distinct styling for footer separation
 * - Proper spacing and layout for footer content
 * 
 * @example
 * <SidebarFooter>
 *   <SidebarSearch />
 * </SidebarFooter>
 */
const SidebarFooter = memo(
  React.forwardRef<HTMLDivElement, SidebarFooterProps>((
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn(styles.footer, className)}
        {...props}
      />
    );
  })
);

SidebarFooter.displayName = 'SidebarFooter';

/**
 * Sidebar Search Component
 * 
 * A search input component for the sidebar.
 * 
 * Features:
 * - Styled search input with proper focus states
 * - Support for form submission with onSubmit callback
 * - Controlled and uncontrolled usage options
 * - Custom placeholder text
 * 
 * @example
 * // Basic usage
 * <SidebarSearch placeholder="Search..." />
 * 
 * // With submit handler
 * <SidebarSearch 
 *   placeholder="Find pages..." 
 *   onSubmit={(value) => console.log(`Searching for ${value}`)} 
 * />
 * 
 * // Controlled component
 * const [value, setValue] = useState("");
 * <SidebarSearch 
 *   value={value} 
 *   onChange={(e) => setValue(e.target.value)} 
 * />
 */
const SidebarSearch = memo(
  React.forwardRef<HTMLDivElement, SidebarSearchProps>((
    { className, placeholder, onChange, defaultValue, value, onSubmit, ...props },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState(defaultValue || '');
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e);
        } else {
          setSearchValue(e.target.value);
        }
      },
      [onChange]
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(value || searchValue);
      },
      [onSubmit, value, searchValue]
    );

    return (
      <div
        ref={ref}
        data-sidebar="search"
        className={cn(styles.search, className)}
        {...props}
      >
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <Input
            placeholder={placeholder || 'Search...'}
            onChange={handleChange}
            value={value || searchValue}
            className={styles.searchInput}
          />
        </form>
      </div>
    );
  })
);

SidebarSearch.displayName = 'SidebarSearch';

/**
 * Sidebar Group Component
 * 
 * A grouping component for sidebar items.
 * 
 * Features:
 * - Optional collapsible content based on defaultOpen
 * - Optional title with show/hide toggle
 * - Support for custom title rendering
 * - Controlled and uncontrolled open states
 * 
 * @example
 * // Basic usage
 * <SidebarGroup title="Files">
 *   File content items
 * </SidebarGroup>
 * 
 * // With custom title rendering
 * <SidebarGroup
 *   renderTitle={() => (
 *     "Custom Header with Icon"
 *   )}
 * >
 *   Group content
 * </SidebarGroup>
 * 
 * // With collapsible content
 * <SidebarGroup 
 *   title="Settings" 
 *   defaultOpen={false}
 * >
 *   Group content
 * </SidebarGroup>
 */
const SidebarGroup = memo(
  React.forwardRef<HTMLDivElement, SidebarGroupProps>((
    { className, title, renderTitle, showTitle = true, children, ...props },
    ref
  ) => {
    const { state } = useSidebar();

    const hasTitle = (renderTitle || title) && showTitle;

    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn(styles.group, className)}
        {...props}
      >
        {hasTitle && (
          <div className={styles.groupTitle}>
            <div className={styles.groupTitleInner}>
              {renderTitle?.() || (
                <span data-sidebar="group-title">
                  {title}
                  {state === 'collapsed' && <span className={styles.groupTitleIcon}>·</span>}
                </span>
              )}
            </div>
            <div data-sidebar="group-actions" className={styles.groupActions}>
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement(child) &&
                  child.props['data-sidebar'] === 'group-action'
                ) {
                  return child;
                }
                return null;
              })}
            </div>
          </div>
        )}
        <div data-sidebar="group-content" className={styles.groupContent}>
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              child.props['data-sidebar'] !== 'group-action'
            ) {
              return child;
            }
            return null;
          })}
        </div>
      </div>
    );
  })
);

SidebarGroup.displayName = 'SidebarGroup';

/**
 * Sidebar Group Action Component
 * 
 * A button component for sidebar group actions.
 * 
 * Features:
 * - Optional asChild prop for custom rendering
 * - Proper styling for action buttons
 * - Consistent positioning within group headers
 * 
 * @example
 * <SidebarGroup title="Files">
 *   <SidebarGroupAction onClick={handleClick}>
 *     <PlusIcon className="h-4 w-4" />
 *   </SidebarGroupAction>
 *   Group content
 * </SidebarGroup>
 * 
 * // With asChild for custom element
 * <SidebarGroup title="Settings">
 *   <SidebarGroupAction asChild>
 *     <Link href="/settings">
 *       <CogIcon className="h-4 w-4" />
 *     </Link>
 *   </SidebarGroupAction>
 * </SidebarGroup>
 */
const SidebarGroupAction = memo(
  React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>((
    { className, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(styles.groupAction, className)}
        {...props}
      />
    );
  })
);

SidebarGroupAction.displayName = 'SidebarGroupAction';

/**
 * Sidebar Menu Component
 * 
 * A collapsible menu component for the sidebar.
 * 
 * Features:
 * - Collapsible content with animation
 * - Optional title with show/hide toggle
 * - Support for custom title rendering
 * - Controlled and uncontrolled open states
 * 
 * @example
 * // Basic usage
 * <SidebarMenu title="Dashboard">
 *   <SidebarMenuAction>Overview</SidebarMenuAction>
 *   <SidebarMenuAction>Analytics</SidebarMenuAction>
 * </SidebarMenu>
 * 
 * // With custom title rendering
 * <SidebarMenu 
 *   renderTitle={() => (
 *     "Custom title with icon"
 *   )}
 * >
 *   Menu items
 * </SidebarMenu>
 * 
 * // Controlled component
 * const [open, setOpen] = useState(false);
 * <SidebarMenu 
 *   title="Settings" 
 *   open={open} 
 *   onOpenChange={setOpen}
 * >
 *   Menu items
 * </SidebarMenu>
 */
const SidebarMenu = memo(
  React.forwardRef<HTMLDivElement, SidebarMenuProps>((
    {
      className,
      title,
      renderTitle,
      showTitle = true,
      defaultOpen = false,
      open: openProp,
      onOpenChange: setOpenProp,
      children,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar();
    const [open, setOpen] = useState(defaultOpen);

    // If this is uncontrolled, we'll use the internal state.
    // If it is controlled, we'll use the provided state.
    const isOpen = openProp ?? open;
    const setIsOpen = React.useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        if (typeof value === 'function') {
          setOpen((prev) => value(prev));
        } else {
          setOpen(value);
        }
      },
      [setOpen]
    );

    const toggleOpen = useCallback(() => {
      setIsOpen(prev => !prev);
    }, [setIsOpen]);

    const hasTitle = (renderTitle || title) && showTitle;

    const hasActiveChild = useMemo(() => {
      let hasActive = false;

      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.props['data-sidebar'] === 'menu-action' &&
          child.props.active
        ) {
          hasActive = true;
        }
      });

      return hasActive;
    }, [children]);

    return (
      <div
        ref={ref}
        data-sidebar="menu"
        data-state={isOpen ? 'open' : 'closed'}
        data-active={hasActiveChild ? 'true' : 'false'}
        className={cn(styles.menu, className)}
        {...props}
      >
        {hasTitle && (
          <button
            onClick={toggleOpen}
            className={styles.menuTitle}
            data-sidebar="menu-title"
            title={typeof title === 'string' ? title : undefined}
          >
            <div className={styles.menuTitleInner}>
              {renderTitle?.() || <span>{title}</span>}
            </div>
            <div
              className={styles.menuChevron}
              data-state={isOpen ? 'open' : 'closed'}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        )}
        <div data-state={isOpen ? 'open' : 'closed'} className={styles.menuContent}>
          {children}
        </div>
      </div>
    );
  })
);

SidebarMenu.displayName = 'SidebarMenu';

/**
 * Sidebar Menu Action Component
 * 
 * A button component for sidebar menu actions/items.
 * 
 * Features:
 * - Optional active state for highlighting current selection
 * - Optional indicator for visual cues
 * - Support for asChild prop for custom rendering
 * 
 * @example
 * <SidebarMenu title="Pages">
 *   <SidebarMenuAction>Home</SidebarMenuAction>
 *   <SidebarMenuAction active>Dashboard</SidebarMenuAction>
 *   <SidebarMenuAction indicator>Settings</SidebarMenuAction>
 * </SidebarMenu>
 * 
 * // With asChild for custom element
 * <SidebarMenu title="Navigation">
 *   <SidebarMenuAction asChild>
 *     <Link href="/dashboard">Dashboard</Link>
 *   </SidebarMenuAction>
 * </SidebarMenu>
 */
const SidebarMenuAction = memo(
  React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>((
    { className, asChild = false, active = false, indicator = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            data-sidebar="menu-action"
            data-active={active ? 'true' : 'false'}
            data-indicator={indicator ? 'true' : 'false'}
            className={cn(styles.menuButton, className)}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className={styles.menuSubButton}
          onClick={(e) => e.preventDefault()}
        >
          {props.children}
          {active && (
            <div className={styles.menuActions}>
              {React.Children.map(props.children, (child) => {
                if (
                  React.isValidElement(child) &&
                  child.props['data-sidebar'] === 'menu-action-icon'
                ) {
                  return child;
                }
                return null;
              })}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    );
  })
);

SidebarMenuAction.displayName = 'SidebarMenuAction';

/**
 * SidebarMenu Context Type
 * @private
 */
interface SidebarMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarProvider,
  SidebarRail,
  SidebarSearch,
  SidebarTrigger
};

export default Sidebar;
