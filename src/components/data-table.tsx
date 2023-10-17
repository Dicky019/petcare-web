import * as React from "react";
import {
  type ColumnDef,
  // type ColumnFiltersState,
  // type SortingState,
  // type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "~/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DialogForm } from "./jadwal-layanan/dialog/dialog-form";
import { DialogForm as DialogFormTambahan } from "./pemesanan-tambahan/dialog/dialog-form";
import { Dialog } from "./ui/dialog";
import { useRouter } from "next/router";
import { JenisLayanan } from "@prisma/client";
// import { Input } from "~/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  name: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  name,
}: // sortKey
DataTableProps<TData, TValue>) {
  const { query, pathname } = useRouter();
  const queryLayanan = query["layanan"]?.toString() ?? "kesehatan";
  const jenisLayanan =
    JenisLayanan[queryLayanan as keyof typeof JenisLayanan] ||
    JenisLayanan.kesehatan;
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );

  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({});

  // const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      // columnFilters,
      // columnVisibility,
      // rowSelection,
    },
  });

  return (
    <>
      {/* <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${sortKey}s...`}
          value={(table.getColumn(sortKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(sortKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
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
                            header.getContext()
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  <div className="flex flex-col items-center justify-center gap-y-4 font-bold">
                    <span>{name} No results.</span>
                    {pathname === "/pemesanan-tambahan" ? (
                      <Dialog>
                        <DialogFormTambahan jenisLayanan={jenisLayanan}>
                          <Button variant="outline" size={"lg"}>
                            Tambah
                          </Button>
                        </DialogFormTambahan>
                      </Dialog>
                    ) : null}
                    {pathname === "/jadwal-layanan" ? (
                      <Dialog>
                        <DialogForm jenisLayanan={jenisLayanan}>
                          <Button variant="outline" size={"lg"}>
                            Tambah
                          </Button>
                        </DialogForm>
                      </Dialog>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        page={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        lastPage={() => table.setPageIndex(table.getPageCount() - 1)}
        firstPage={() => table.setPageIndex(0)}
        // selectedRowLength={table.getFilteredSelectedRowModel().rows.length}
        // rowLength={table.getFilteredRowModel().rows.length}
        nextPage={() => void table.nextPage()}
        previousPage={() => void table.previousPage()}
        getCanNextPage={table.getCanNextPage}
        getCanPreviousPage={table.getCanPreviousPage}
      />
    </>
  );
}

interface ITablePaginationProps {
  // selectedRowLength: number;
  // rowLength: number;
  page: number;
  totalPages: number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
}

export const TablePagination = ({
  previousPage,
  nextPage,
  getCanNextPage,
  getCanPreviousPage,
  firstPage,
  lastPage,
  // selectedRowLength,
  // rowLength,
  page,
  totalPages,
}: ITablePaginationProps) => {
  if (totalPages === 0) {
    return <></>;
  }

  return (
    <div className="justify- flex items-center space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {`${page} of ${totalPages} pages`}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => firstPage()}
        disabled={!getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
      >
        <ChevronLeft /> Previous
      </Button>

      {/* <div className="text-sm text-muted-foreground">
        {page} of {totalPages} pages
      </div> */}

      <Button
        variant="outline"
        size="sm"
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
      >
        Next <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => lastPage()}
        disabled={!getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};
