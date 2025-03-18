import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

describe('Tabs Component', () => {
  const renderBasicTabs = () => {
    return render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
  };

  test('renders the Tabs component with all sub-components', () => {
    renderBasicTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument(); // Initially hidden
  });

  test('switches tabs when clicking on a tab trigger', async () => {
    renderBasicTabs();

    // Initial state
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click on the second tab
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    act(() => {
      fireEvent.click(secondTab);
    });

    // Content should switch
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('renders the correct ARIA attributes', () => {
    renderBasicTabs();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    const tabpanel = screen.getByRole('tabpanel');

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab1).toHaveAttribute('id');
    expect(tab2).toHaveAttribute('id');
    expect(tabpanel).toHaveAttribute('aria-labelledby');
  });

  test('renders tabs with different variants', () => {
    const { rerender } = render(
      <Tabs data-testid="tabs" defaultValue="tab1" variant="default">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    // Default variant
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).not.toHaveClass('tabs-underline');

    // Underline variant
    rerender(
      <Tabs data-testid="tabs" defaultValue="tab1" variant="underline">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-underline');

    // Card variant
    rerender(
      <Tabs data-testid="tabs" defaultValue="tab1" variant="card">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-card');

    // Bordered variant
    rerender(
      <Tabs data-testid="tabs" defaultValue="tab1" variant="bordered">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-bordered');
  });

  test('renders tabs with different sizes', () => {
    const { rerender } = render(
      <Tabs data-testid="tabs" defaultValue="tab1" size="default">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    // Default size
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).not.toHaveClass('tabs-sm');
    expect(screen.getByTestId('tabs')).not.toHaveClass('tabs-lg');

    // Small size
    rerender(
      <Tabs data-testid="tabs" defaultValue="tab1" size="sm">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-sm');

    // Large size
    rerender(
      <Tabs data-testid="tabs" defaultValue="tab1" size="lg">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-lg');
  });

  test('renders tabs with vertical orientation', () => {
    render(
      <Tabs data-testid="tabs" defaultValue="tab1" orientation="vertical">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    expect(screen.getByTestId('tabs')).toHaveClass('tabs');
    expect(screen.getByTestId('tabs')).toHaveClass('tabs-vertical');
    expect(screen.getByTestId('tabs')).toHaveAttribute('orientation', 'vertical');
  });

  test('disabled tab cannot be clicked', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled data-testid="disabled-tab">
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    // Initial state
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Try to click the disabled tab
    const disabledTab = screen.getByTestId('disabled-tab');
    expect(disabledTab).toBeDisabled();

    act(() => {
      fireEvent.click(disabledTab);
    });

    // Content should not change
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  test('controlled tabs work with external state', () => {
    const TestControlledTabs = () => {
      const [value, setValue] = React.useState('tab1');

      return (
        <div>
          <button data-testid="switch-button" onClick={() => setValue('tab2')}>
            Switch to Tab 2
          </button>

          <Tabs value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
            <TabsContent value="tab2">Content 2</TabsContent>
          </Tabs>
        </div>
      );
    };

    render(<TestControlledTabs />);

    // Initial state
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    // Click the external button
    const switchButton = screen.getByTestId('switch-button');

    act(() => {
      fireEvent.click(switchButton);
    });

    // Content should change based on external state
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  test('className prop is properly passed to all components', () => {
    render(
      <Tabs className="custom-tabs" defaultValue="tab1">
        <TabsList className="custom-tabs-list" data-testid="tabs-list">
          <TabsTrigger className="custom-trigger" data-testid="tab-trigger" value="tab1">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent className="custom-content" data-testid="tab-content" value="tab1">
          Content 1
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('custom-tabs-list');
    expect(screen.getByTestId('tab-trigger')).toHaveClass('custom-trigger');
    expect(screen.getByTestId('tab-content')).toHaveClass('custom-content');
  });

  test('forceMount prop renders inactive tab content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2" forceMount>
          Content 2
        </TabsContent>
      </Tabs>
    );

    // Both contents should be in the document due to forceMount
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    // But only the first tab content should be visible (not have hidden attribute)
    const tabpanels = screen.getAllByRole('tabpanel');
    expect(tabpanels[0]).not.toHaveAttribute('hidden');
    expect(tabpanels[1]).toHaveAttribute('hidden');
  });
});
