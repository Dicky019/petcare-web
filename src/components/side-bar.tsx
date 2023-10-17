import { useRouter } from "next/router";
import { Button, buttonVariants } from "./ui/button";
import { DialogForm } from "./jadwal-layanan/dialog/dialog-form";
import { DialogForm as DialogFormTambahan } from "./pemesanan-tambahan/dialog/dialog-form";
import { JenisLayanan } from "@prisma/client";
import { Dialog } from "./ui/dialog";
import Link from "next/link";
import { cn } from "~/utils/utils";

export const SideBar = () => {
  const { query, pathname } = useRouter();

  const queryLayanan = query["layanan"]?.toString() ?? "kesehatan";

  const variant = (isActive: boolean) => (isActive ? "default" : "ghost");

  const jenisLayanan =
    JenisLayanan[queryLayanan as keyof typeof JenisLayanan] ||
    JenisLayanan.kesehatan;

  const className = (value: string) =>
    buttonVariants({
      variant: variant(queryLayanan === value),
    });

  return (
    <div className="divide-2 flex flex-none flex-col gap-y-3">
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
      <Link
        href={pathname + "?layanan=" + "kesehatan"}
        className={cn(className("kesehatan"))}
        // onClick={() => {
        //   // void layananKesehatan();
        //   // void push("?layanan=" + "kesehatan");
        // }}
      >
        Layanan Kesehatan
      </Link>
      <Link
        href={pathname + "?layanan=" + "konsultasi"}
        className={cn(className("konsultasi"))}
      >
        Layanan Konsultasi
      </Link>
      <Link
        href={pathname + "?layanan=" + "grooming"}
        className={cn(className("grooming"))}
      >
        Layanan Grooming
      </Link>
    </div>
  );
};
