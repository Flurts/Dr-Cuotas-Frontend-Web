'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getJwt } from '@/store';
import {
  Surgery,
  useDeleteSurgeriesMutation,
  useGetMySurgeriesQuery,
} from '@/types';
import currencyFormatter from '@/utils/currencyFormatter';
export function SurgeryTable({
  editUpdateSurgeryHandler,
  onSurgeryCreated,
}: {
  editUpdateSurgeryHandler: (surgery?: Surgery, newSurgerie?: boolean) => void;
  onSurgeryCreated: () => void;
}) {
  const jwt = useSelector(getJwt);
  const { t } = useTranslation(['common', 'surgeries', 'constants']);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Surgery[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: surgeriesData, refetch: refetchSurgeriesData } =
    useGetMySurgeriesQuery();

  React.useEffect(() => {
    const fetchSurgeries = async () => {
      setLoading(true);
      await refetchSurgeriesData();
      // @ts-expect-error data is not null and is surgery[]
      setData(surgeriesData?.getMySurgeries ?? []);
      setLoading(false);
    };

    void fetchSurgeries();
  }, [jwt, refetchSurgeriesData, surgeriesData]);

  // Usa un efecto para realizar el refetch cuando se llame a onSurgeryCreated
  React.useEffect(() => {
    onSurgeryCreated = async () => {
      setLoading(true);
      await refetchSurgeriesData();
      // @ts-expect-error data is not null and is surgery[]
      setData(surgeriesData?.getMySurgeries ?? []);
      setLoading(false);
    };
  }, [refetchSurgeriesData, surgeriesData]);

  const [deleteSurgeries] = useDeleteSurgeriesMutation();

  const deleteSurgeryHandler = async (surgeriesId: string[]) => {
    setLoading(true);
    await deleteSurgeries({
      context: {
        headers: {
          Authorization: jwt,
        },
      },
      variables: {
        surgeriesId,
      },
    });
    await refetchSurgeriesData();
    // @ts-expect-error data is not null and is surgery[]
    setData(surgeriesData?.getMySurgeries ?? []);
    setLoading(false);
  };

  const columns: Array<ColumnDef<Surgery>> = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: t('common:name'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            {t('common:name')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.original.name}</div>,
    },
    {
      accessorKey: t('common:typeSurgery'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            {t('common:typeSurgery')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{t(`surgeries:${row.original.type}`)}</div>
      ),
    },
    {
      accessorKey: t('common:category'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            {t('common:category')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {t(`surgeries:${row.original.category}`)}
        </div>
      ),
    },
    {
      accessorKey: t('constants:totalPrice'),
      header: () => (
        <div className="text-right">{t('constants:totalPrice')}</div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat((row.original.amount ?? 0).toString());

        // // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat('en-US', {
        //   style: 'currency',
        //   currency: 'USD',
        // }).format(amount);

        return (
          <div className="text-right font-medium">
            {currencyFormatter(amount)}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-24 w-14 rounded-xl border text-drcuotasTertiary-text">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={async () => {
                  await navigator.clipboard.writeText(payment.id);
                }}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-full gap-4 flex items-center">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm tracking-tight leading-tight text-drcuotasTertiary-text"
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            editUpdateSurgeryHandler({} as Surgery, true);
          }}
        >
          <IoAdd className="h-5 w-5 " />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={selectedRows.length !== 1}
          onClick={() => {
            editUpdateSurgeryHandler(selectedRows[0].original);
          }}
        >
          <BsPencilSquare className="h-5 w-5" />
        </Button>

        <Button
          variant="destructive"
          size="icon"
          disabled={selectedRows.length === 0}
          onClick={() => {
            void deleteSurgeryHandler(
              selectedRows.map((row) => row.original.id),
            );
          }}
        >
          <BsTrash className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto tracking-tight leading-tight text-drcuotasTertiary-text">
              {t('constants:columns')} <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) => {
                      column.toggleVisibility(!!value);
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2  border-primary-foreground"></div>
        </div>
      ) : (
        <div className="h-full rounded-xl border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1  text-xs lg:text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
