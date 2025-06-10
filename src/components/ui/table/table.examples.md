# Table Component Examples

The Table component provides a flexible, accessible way to display tabular data. This document showcases various examples of how to use the Table component and its sub-components.

## Basic Table

A simple table with header, body, and data:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from '@/components/ui/table';

export function BasicTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell>$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell>$350.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

## Table with Different Variants

The Table component supports different variants like 'default', 'bordered', 'zebra', and 'compact':

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

export function TableVariants() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3>Default Table</h3>
        <Table variant="default">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3>Bordered Table</h3>
        <Table variant="bordered">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3>Zebra Table</h3>
        <Table variant="zebra">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3>Compact Table</h3>
        <Table variant="compact">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

## Sortable Table Columns

Implementing sortable columns in a table:

```tsx
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';

type SortDirection = 'asc' | 'desc' | null;

export function SortableTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const initialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 32 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 27 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', age: 29 }
  ];

  const [data, setData] = useState(initialData);

  const handleSort = (column: string) => {
    let newDirection: SortDirection = 'asc';

    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      } else {
        newDirection = 'asc';
      }
    }

    setSortColumn(newDirection ? column : null);
    setSortDirection(newDirection);

    if (!newDirection) {
      setData(initialData); // Reset to initial data
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      if (newDirection === 'asc') {
        return a[column as keyof typeof a] > b[column as keyof typeof b] ? 1 : -1;
      } else {
        return a[column as keyof typeof a] < b[column as keyof typeof b] ? 1 : -1;
      }
    });

    setData(sortedData);
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;

    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            sortable
            sortDirection={sortColumn === 'name' ? sortDirection : undefined}
            onClick={() => handleSort('name')}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              Name
              {renderSortIcon('name')}
            </div>
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortColumn === 'email' ? sortDirection : undefined}
            onClick={() => handleSort('email')}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              Email
              {renderSortIcon('email')}
            </div>
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortColumn === 'age' ? sortDirection : undefined}
            onClick={() => handleSort('age')}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              Age
              {renderSortIcon('age')}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Table with Selectable Rows

Implementing selectable rows in a table:

```tsx
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export function SelectableTable() {
  const initialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
  ];

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === initialData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(initialData.map(item => item.id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selectedRows.length === initialData.length}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialData.map(item => (
          <TableRow key={item.id} selected={selectedRows.includes(item.id)}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(item.id)}
                onCheckedChange={() => handleSelectRow(item.id)}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Table with Truncated Cells

Implementing a table with truncated cell content:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';

export function TruncatedCellsTable() {
  const data = [
    {
      id: 1,
      title: 'A very long document title that would overflow the available space in the table cell',
      description:
        'This is a very long description that contains a lot of text and would normally overflow the table cell boundaries, causing layout issues.',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Another document with an extremely long title that demonstrates truncation',
      description:
        'Another very lengthy description that showcases how text can be elegantly truncated when it exceeds the available width.',
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Short title',
      description: 'A description that is not too long and should display fine.',
      status: 'Archived'
    }
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell truncate title={item.title}>
              {item.title}
            </TableCell>
            <TableCell truncate title={item.description}>
              {item.description}
            </TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Responsive Table

A table that adapts to different screen sizes:

```tsx
import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from '@/components/ui/table';

type UserData = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
};

export function ResponsiveTable() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const userData: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      status: 'Active',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer',
      status: 'Away',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
      status: 'Offline',
      lastActive: '3 days ago'
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        {userData.map(user => (
          <div key={user.id} className="border rounded-md p-4">
            <h3 className="font-bold">{user.name}</h3>
            <div className="text-sm">{user.email}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="text-gray-500">Role:</span>
              <span>{user.role}</span>
              <span className="text-gray-500">Status:</span>
              <span>{user.status}</span>
              <span className="text-gray-500">Last Active:</span>
              <span>{user.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>List of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.lastActive}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Table with Pagination

Implementing a table with pagination:

```tsx
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PaginatedTable() {
  const allData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Developer' : i % 3 === 1 ? 'Designer' : 'Manager'
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allData.slice(startIndex, endIndex);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, allData.length)} of{' '}
                  {allData.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
```
