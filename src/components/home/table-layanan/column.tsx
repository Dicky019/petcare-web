"use client"

import { Status, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// import { PemesananLayanan } from "@prisma/client"
import { IPemesananLayanan } from "~/types/pemesanan-layanan"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

//   createdAt: new Date(),
//     updatedAt: new Date(),
//     id: faker.string.uuid(),
//     jenisKelaminHewan: faker.helpers.enumValue(JenisKelaminHewan),
//     keluhan: faker.lorem.text(),
//     layananGrouming: {
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamGrouming: faker.helpers.enumValue(PilihJamGrouming),
//       id: faker.string.uuid(),
//     },
//     layananGroumingId: faker.string.uuid(),
//     LayananKesehatan: {
//       id: faker.string.uuid(),
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamKesehatan: faker.helpers.enumValue(PilihJamKesehatanKonsultasi),
//     },
//     layananKesehatanId: faker.string.uuid(),
//     LayananKonsultasi: {
//       id: faker.string.uuid(),
//       pelanggan: faker.number.int({
//         min: 1,
//         max: 2,
//       }),
//       pilihJamKesehatan: faker.helpers.enumValue(PilihJamKesehatanKonsultasi),
//     },
//     layananKonsultasiId: faker.string.uuid(),
//     namaHewan: namaHewan,
//     noHP: faker.phone.number(),
//     status: faker.helpers.enumValue(Status),
//     umurHewan: faker.number
//       .int({
//         min: 1,
//         max: 20,
//       })
//       .toString(),
//     user: {
//       email: faker.internet.email(),
//       emailVerified: new Date(),
//       id: faker.string.uuid(),
//       image: faker.internet.email(),
//       name: faker.person.fullName(),
//     },
//     userId: faker.string.uuid(),
//     kategoriHewan: kategoriHewan,

export const columns: ColumnDef<IPemesananLayanan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={() =>
          table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected(!row.getIsSelected())}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Status>("status")
      // .split("").map((v,i) => i === 0 ? v.toUpperCase() : v)
      const variant =
        status == "failed"
          ? "destructive"
          : status == "pending"
          ? "outline"
          : status == "processing"
          ? "secondary"
          : "default"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.getValue<User>("user")
      return (
        <div className="flex flex-row gap-x-3 align-middle font-medium">
          <Avatar>
            <AvatarImage
              src={user.image || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1">
            <div>{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "namaHewan",
    header: "Nama Hewan",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Nama Hewan
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
  },
  {
    accessorKey: "jenisKelaminHewan",
    // header: "Jenis Kelamin Hewan",
    header: () => <div className="w-36">Jenis Kelamin Hewan</div>,
  },
  {
    accessorKey: "umurHewan",
    header: "Umur Hewan",
    // header: () => <div className="w-36">Jenis Kelamin Hewan</div>,
  },
  {
    accessorKey: "kategoriHewan",
    header: "Kategori Hewan",
    // header: () => <div className="w-36">Jenis Kelamin Hewan</div>,
  },
  {
    accessorKey: "keluhan",
    header: () => <div className="text-right">Keluhan</div>,
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("amount"))
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(amount)

    //   return <div className="text-right font-medium">{formatted}</div>
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
