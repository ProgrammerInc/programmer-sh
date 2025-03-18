# Table Component Guide

This guide provides best practices, accessibility information, and implementation details for the Table component.

## Best Practices

### Semantic Structure

- Use proper table semantics (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<caption>`) for screen reader compatibility.
- Include a `<caption>` to provide context about the table's content.
- Use `<thead>`, `<tbody>`, and `<tfoot>` to organize your table logically.
- Use `<th>` for header cells and `<td>` for data cells.

### Data Organization

- Group related data in columns.
- Present data in a logical order.
- For numerical data, align numbers to the right for easier comparison.
- For large datasets, implement pagination or virtualization to improve performance.

### Styling & Variants

- Use appropriate variants for different use cases:
  - `default`: General purpose tables
  - `bordered`: When cell boundaries need emphasis
  - `zebra`: For tables with many rows to improve readability
  - `compact`: For dense information displays with limited space

### Responsive Design

- Consider mobile views by either:
  - Implementing horizontal scrolling for tables
  - Reorganizing data into card layouts on small screens
  - Using a responsive approach that adapts the display based on screen size

### Performance

- Memoize components to prevent unnecessary re-renders.
- For large datasets, implement virtualization or pagination.
- Use appropriate key values when rendering dynamic table rows.

## Accessibility Guidelines

### Keyboard Navigation

- Ensure table elements are keyboard navigable.
- Add proper focus states for interactive elements within tables.
- For sortable columns, ensure they are keyboard accessible.

### Screen Readers

- Use proper ARIA attributes:
  - `aria-sort` for sortable columns
  - `aria-label` or `aria-labelledby` for tables without captions
  - `aria-rowcount` and `aria-rowindex` for large tables
  - `scope="col"` or `scope="row"` for header cells

### Other Accessibility Considerations

- Maintain sufficient color contrast for all text in the table.
- Don't rely solely on color to convey information.
- Provide text alternatives for any icons or visual indicators.
- For sortable tables, use both visual indicators and aria attributes.

## Implementation Details

### Component Structure

The Table component consists of several sub-components working together:

- `Table`: The main container component
- `TableHeader`: Contains header rows
- `TableBody`: Contains data rows
- `TableFooter`: Contains footer rows
- `TableHead`: Header cells (th)
- `TableRow`: Table rows (tr)
- `TableCell`: Data cells (td)
- `TableCaption`: Table caption

### Features

#### Variants

The Table component supports multiple variants:

- `default`: Clean, minimal styling
- `bordered`: Adds borders to all cells
- `zebra`: Alternating row colors for better readability
- `compact`: Reduced padding for dense information display

#### Sortable Columns

Implement sortable columns using:

```tsx
<TableHead 
  sortable 
  sortDirection="asc" // or "desc" or undefined
  onClick={handleSort}
>
  Column Name
</TableHead>
```

#### Row Selection

Implement row selection using:

```tsx
<TableRow selected={isSelected}>
  {/* Row content */}
</TableRow>
```

#### Truncated Cells

Implement truncated cells using:

```tsx
<TableCell truncate title="Full text for tooltip">
  Long text that will be truncated
</TableCell>
```

## CSS Module Structure

The `table.module.css` file organizes styling with these key classes:

- `.table-container`: Provides a responsive wrapper for tables
- `.table`: Base table styling
- `.table-header`: Header styling
- `.table-body`: Body styling
- `.table-footer`: Footer styling
- `.table-row`: Row styling with hover effects
- `.table-head`: Header cell styling with sort capabilities
- `.table-cell`: Data cell styling with truncation support
- `.table-caption`: Caption styling

Variant-specific classes:
- `.table-bordered`: Adds borders to cells
- `.table-zebra`: Adds alternating row background colors
- `.table-compact`: Reduces padding for dense display

## Common Patterns

### Data Table with Pagination

For large datasets, combine the Table component with pagination controls:

```tsx
<Table>
  {/* Table content */}
  <TableFooter>
    <TableRow>
      <TableCell colSpan={columns.length}>
        {/* Pagination controls */}
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Filterable Tables

Combine with filter controls above the table:

```tsx
<div>
  <div className="filter-controls mb-4">
    <input 
      type="text" 
      placeholder="Search..." 
      onChange={(e) => handleFilter(e.target.value)}
    />
  </div>
  <Table>
    {/* Filtered table content */}
  </Table>
</div>
```

### Data Export

Add export controls for table data:

```tsx
<div>
  <div className="export-controls mb-4">
    <Button onClick={() => exportToCsv(data)}>Export to CSV</Button>
    <Button onClick={() => exportToPdf(data)}>Export to PDF</Button>
  </div>
  <Table>
    {/* Table content */}
  </Table>
</div>
```

### Column Visibility Toggle

Let users control which columns are visible:

```tsx
<div>
  <div className="column-visibility mb-4">
    {columns.map(column => (
      <label key={column.id} className="mr-4">
        <input 
          type="checkbox" 
          checked={column.visible} 
          onChange={() => toggleColumnVisibility(column.id)} 
        />
        {column.title}
      </label>
    ))}
  </div>
  <Table>
    {/* Table with visible columns */}
  </Table>
</div>
```

## Troubleshooting

### Common Issues

1. **Table overflows container**
   - The `table-container` class provides responsive support, but you may need to adjust the width settings.

2. **Misaligned columns**
   - Use consistent width specifications for columns or use table-layout: fixed.

3. **Poor performance with large datasets**
   - Implement pagination, virtualization, or lazy loading for large datasets.

4. **Inconsistent styling across browsers**
   - The CSS module handles most cross-browser issues, but test in multiple browsers.

5. **Accessibility issues**
   - Ensure proper use of semantic table elements and ARIA attributes.

### Advanced Customization

For advanced customization beyond the provided variants:

1. **Custom column widths**:
   ```tsx
   <TableHead className="w-1/4">Column Name</TableHead>
   ```

2. **Custom cell alignment**:
   ```tsx
   <TableCell className="text-right">123.45</TableCell>
   ```

3. **Custom colors**:
   ```tsx
   <TableRow className="bg-red-50">{/* Row content */}</TableRow>
   ```

4. **Compound components**:
   ```tsx
   <TableCell>
     <div className="flex items-center space-x-2">
       <Avatar src="/avatar.png" />
       <span>User Name</span>
     </div>
   </TableCell>
   ```
