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
import { toast } from '@/components/ui/use-toast';
import { getJwt } from '@/store';
import {
  Adjudicated,
  Adjudicated_Status,
  useGetAdjudicatedListDoctorQuery,
  useVerifyAdjudicatedMutation,
} from '@/types';

export function AdjudicadosTable({
  // editUpdateSurgeryHandler,
  onSurgeryCreated,
}: {
  // editUpdateSurgeryHandler: (surgery?: Surgery, newSurgerie?: boolean) => void;
  onSurgeryCreated: () => void;
}) {
  const jwt = useSelector(getJwt);
  const { t } = useTranslation(['common', 'constants']);

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Adjudicated[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: adjudicatedData, refetch: reloadAdjudicatedData } =
    useGetAdjudicatedListDoctorQuery();

  const [verifyAdjudicated] = useVerifyAdjudicatedMutation();

  const verifyAdjudicatedHandler = async (adjudicatedId: string) => {
    setLoading(true);

    try {
      await verifyAdjudicated({
        variables: {
          adjudicatedId,
        },
      });

      await reloadAdjudicatedData();
      // @ts-expect-error data is not null and is adjudicated
      setData(adjudicatedData?.getAdjudicatedListDoctor ?? []);
      toast({
        variant: 'success',
        title: 'Adjudicated verified',
        description: 'The adjudicated has been verified successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error verifying adjudicated',
        description: 'An error occurred while verifying the adjudicated.',
      });
    }

    setLoading(false);
  };

  React.useEffect(() => {
    const fetchAdjudicated = async () => {
      setLoading(true);
      await reloadAdjudicatedData();
      // @ts-expect-error data is not null and is adjudicated
      setData(adjudicatedData?.getAdjudicatedListDoctor ?? []);
      setLoading(false);
    };

    void fetchAdjudicated();
  }, [jwt, reloadAdjudicatedData, adjudicatedData]);

  // Usa un efecto para realizar el refetch cuando se llame a onSurgeryCreated
  React.useEffect(() => {
    onSurgeryCreated = async () => {
      setLoading(true);
      await reloadAdjudicatedData();
      // @ts-expect-error data is not null and is adjudicated
      setData(adjudicatedData?.getAdjudicatedListDoctor ?? []);
      setLoading(false);
    };
  }, [reloadAdjudicatedData, adjudicatedData]);

  const columns: Array<ColumnDef<Adjudicated>> = [
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
      cell: ({ row }) => {
        return (
          <div className="capitalize">
            {row.original.user?.first_name} {row.original.user?.last_name}{' '}
          </div>
        );
      },
    },
    {
      accessorKey: t('constants:adjudicatedStatusTitle'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
          >
            {t('constants:adjudicatedStatusTitle')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="capitalize text-center">
            {t(
              `constants:adjudicatedStatus.${row.original.adjudicated_status}`,
            )}
          </div>
        );
      },
    },
    {
      accessorKey: t('constants:totalPrice'),
      header: () => (
        <div className="text-right">{t('constants:totalPrice')}</div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(
          (row.original.total_price ?? 'NaN').toString(),
        );

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const adjudicatedPayment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('constants:actions')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={async () => {
                  await navigator.clipboard.writeText(adjudicatedPayment.id);
                }}
              >
                {t('constants:copyAdjudicatedId')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {t('constants:viewAdjudicated')}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.adjudicated_status !== Adjudicated_Status.Active
                }
              >
                {t('constants:viewPaymentDetails')}
              </DropdownMenuItem>
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
    <div className="w-full h-full ">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Filter awarded..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex flex-row gap-2 mx-3">
          <Button
            variant="outline"
            size="icon"
            disabled={selectedRows.length !== 1}
            className=""
            // onClick={() => {
            //   editUpdateSurgeryHandler(selectedRows[0].original);
            // }}
          >
            <BsPencilSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className=""
            disabled={selectedRows.length === 0}
            // onClick={() => {
            //   void deleteSurgeryHandler(
            //     selectedRows.map((row) => row.original.id),
            //   );
            // }}
          >
            <BsTrash className="h-5 w-5" />
          </Button>

          {selectedRows.length === 1 &&
            selectedRows[0].original.adjudicated_status ===
              Adjudicated_Status.Validating && (
              <Button
                variant="default"
                size="default"
                className="capitalize text-white bg-[#6636E2] hover:bg-pr"
                onClick={() => {
                  void verifyAdjudicatedHandler(selectedRows[0].original.id);
                }}
              >
                {t('constants:verifyAdjudicated')}
              </Button>
            )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t('constants:columns')} <ChevronDown className="ml-2 h-4 w-4" />
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
        <div className="flex items-center justify-center h-64 ">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-foreground"></div>
        </div>
      ) : (
        <div className="rounded-md border">
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
