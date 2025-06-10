import { fireEvent, render, screen } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from './table';

describe('Table Component', () => {
  const renderBasicTable = () => {
    return render(
      <Table>
        <TableCaption>Test Table Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cell 3</TableCell>
            <TableCell>Cell 4</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };

  test('renders the Table component with all sub-components', () => {
    renderBasicTable();

    expect(screen.getByText('Test Table Caption')).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
    expect(screen.getByText('Cell 3')).toBeInTheDocument();
    expect(screen.getByText('Cell 4')).toBeInTheDocument();
    expect(screen.getByText('Footer 1')).toBeInTheDocument();
    expect(screen.getByText('Footer 2')).toBeInTheDocument();
  });

  test('renders the Table with different variants', () => {
    const { rerender } = render(<Table data-testid="table" />);

    // Default variant (implied)
    expect(screen.getByTestId('table')).toHaveClass('table');
    expect(screen.getByTestId('table')).not.toHaveClass('table-bordered');
    expect(screen.getByTestId('table')).not.toHaveClass('table-zebra');
    expect(screen.getByTestId('table')).not.toHaveClass('table-compact');

    // Bordered variant
    rerender(<Table data-testid="table" variant="bordered" />);
    expect(screen.getByTestId('table')).toHaveClass('table');
    expect(screen.getByTestId('table')).toHaveClass('table-bordered');

    // Zebra variant
    rerender(<Table data-testid="table" variant="zebra" />);
    expect(screen.getByTestId('table')).toHaveClass('table');
    expect(screen.getByTestId('table')).toHaveClass('table-zebra');

    // Compact variant
    rerender(<Table data-testid="table" variant="compact" />);
    expect(screen.getByTestId('table')).toHaveClass('table');
    expect(screen.getByTestId('table')).toHaveClass('table-compact');
  });

  test('renders a selected TableRow with the correct data-state', () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="regular-row">Regular Row</TableRow>
          <TableRow data-testid="selected-row" selected>
            Selected Row
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('regular-row')).not.toHaveAttribute('data-state');
    expect(screen.getByTestId('selected-row')).toHaveAttribute('data-state', 'selected');
  });

  test('renders sortable TableHead with correct aria-sort attribute', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="no-sort">No Sort</TableHead>
            <TableHead data-testid="sort-asc" sortable sortDirection="asc">
              Ascending
            </TableHead>
            <TableHead data-testid="sort-desc" sortable sortDirection="desc">
              Descending
            </TableHead>
            <TableHead data-testid="sort-none" sortable>
              Sortable but not sorted
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(screen.getByTestId('no-sort')).not.toHaveAttribute('aria-sort');
    expect(screen.getByTestId('sort-asc')).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getByTestId('sort-desc')).toHaveAttribute('aria-sort', 'descending');
    expect(screen.getByTestId('sort-none')).not.toHaveAttribute('aria-sort');

    expect(screen.getByTestId('sort-asc')).toHaveAttribute('data-sortable', 'true');
    expect(screen.getByTestId('sort-desc')).toHaveAttribute('data-sortable', 'true');
    expect(screen.getByTestId('sort-none')).toHaveAttribute('data-sortable', 'true');
    expect(screen.getByTestId('no-sort')).not.toHaveAttribute('data-sortable');
  });

  test('renders TableCell with truncate prop', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-testid="normal-cell">Normal Cell</TableCell>
            <TableCell data-testid="truncated-cell" truncate>
              Truncated Cell
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('normal-cell')).not.toHaveClass('truncate');
    expect(screen.getByTestId('truncated-cell')).toHaveClass('truncate');
  });

  test('forwards refs to each sub-component', () => {
    const tableRef = jest.fn();
    const headerRef = jest.fn();
    const bodyRef = jest.fn();
    const footerRef = jest.fn();
    const rowRef = jest.fn();
    const headRef = jest.fn();
    const cellRef = jest.fn();
    const captionRef = jest.fn();

    render(
      <Table ref={tableRef}>
        <TableCaption ref={captionRef}>Caption</TableCaption>
        <TableHeader ref={headerRef}>
          <TableRow ref={rowRef}>
            <TableHead ref={headRef}>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={bodyRef}>
          <TableRow>
            <TableCell ref={cellRef}>Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter ref={footerRef}>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(tableRef).toHaveBeenCalled();
    expect(headerRef).toHaveBeenCalled();
    expect(bodyRef).toHaveBeenCalled();
    expect(footerRef).toHaveBeenCalled();
    expect(rowRef).toHaveBeenCalled();
    expect(headRef).toHaveBeenCalled();
    expect(cellRef).toHaveBeenCalled();
    expect(captionRef).toHaveBeenCalled();
  });

  test('TableHead calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable onClick={handleClick} data-testid="sortable-head">
              Sortable Header
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    fireEvent.click(screen.getByTestId('sortable-head'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('propagates className to all components', () => {
    render(
      <Table className="custom-table">
        <TableCaption className="custom-caption" data-testid="caption">
          Caption
        </TableCaption>
        <TableHeader className="custom-header" data-testid="header">
          <TableRow className="custom-row" data-testid="header-row">
            <TableHead className="custom-head" data-testid="head">
              Header
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="custom-body" data-testid="body">
          <TableRow className="custom-row" data-testid="body-row">
            <TableCell className="custom-cell" data-testid="cell">
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer" data-testid="footer">
          <TableRow className="custom-row" data-testid="footer-row">
            <TableCell className="custom-cell" data-testid="footer-cell">
              Footer
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByRole('table')).toHaveClass('custom-table');
    expect(screen.getByTestId('caption')).toHaveClass('custom-caption');
    expect(screen.getByTestId('header')).toHaveClass('custom-header');
    expect(screen.getByTestId('header-row')).toHaveClass('custom-row');
    expect(screen.getByTestId('head')).toHaveClass('custom-head');
    expect(screen.getByTestId('body')).toHaveClass('custom-body');
    expect(screen.getByTestId('body-row')).toHaveClass('custom-row');
    expect(screen.getByTestId('cell')).toHaveClass('custom-cell');
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
    expect(screen.getByTestId('footer-row')).toHaveClass('custom-row');
    expect(screen.getByTestId('footer-cell')).toHaveClass('custom-cell');
  });

  test('passes additional props to all components', () => {
    render(
      <Table data-testid="table" data-custom="table-custom">
        <TableCaption data-testid="caption" data-custom="caption-custom">
          Caption
        </TableCaption>
        <TableHeader data-testid="header" data-custom="header-custom">
          <TableRow data-testid="header-row" data-custom="header-row-custom">
            <TableHead data-testid="head" data-custom="head-custom">
              Header
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="body" data-custom="body-custom">
          <TableRow data-testid="body-row" data-custom="body-row-custom">
            <TableCell data-testid="cell" data-custom="cell-custom">
              Cell
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-testid="footer" data-custom="footer-custom">
          <TableRow data-testid="footer-row" data-custom="footer-row-custom">
            <TableCell data-testid="footer-cell" data-custom="footer-cell-custom">
              Footer
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByTestId('table')).toHaveAttribute('data-custom', 'table-custom');
    expect(screen.getByTestId('caption')).toHaveAttribute('data-custom', 'caption-custom');
    expect(screen.getByTestId('header')).toHaveAttribute('data-custom', 'header-custom');
    expect(screen.getByTestId('header-row')).toHaveAttribute('data-custom', 'header-row-custom');
    expect(screen.getByTestId('head')).toHaveAttribute('data-custom', 'head-custom');
    expect(screen.getByTestId('body')).toHaveAttribute('data-custom', 'body-custom');
    expect(screen.getByTestId('body-row')).toHaveAttribute('data-custom', 'body-row-custom');
    expect(screen.getByTestId('cell')).toHaveAttribute('data-custom', 'cell-custom');
    expect(screen.getByTestId('footer')).toHaveAttribute('data-custom', 'footer-custom');
    expect(screen.getByTestId('footer-row')).toHaveAttribute('data-custom', 'footer-row-custom');
    expect(screen.getByTestId('footer-cell')).toHaveAttribute('data-custom', 'footer-cell-custom');
  });
});
