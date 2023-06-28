import { useRouter } from "next/router";
import { Button } from "./ui/button";

export const SideBar = ({
  layananGrooming,
  layananKesehatan,
  layananKonsultasi,
}: {
  layananKesehatan: () => void;
  layananKonsultasi: () => void;
  layananGrooming: () => void;
}) => {
  const { query, push } = useRouter();

  const queryLayanan = query["layanan"] ?? "kesehatan";

  const variant = (isActive : boolean) => isActive ? "default" : "ghost";

  return (
    <div className="divide-2 flex flex-none flex-col gap-y-3">
      <Button
        onClick={() => {
          void layananKesehatan();
          void push("?layanan=" + "kesehatan");
        }}
        variant={variant(queryLayanan === "kesehatan")}
      >
        Layanan Kesehatan
      </Button>
      <Button
        onClick={() => {
          void layananKonsultasi();
          void push("?layanan=" + "konsultasi");
        }}
        variant={variant(queryLayanan === "konsultasi")}
      >
        Layanan Konsultasi
      </Button>
      <Button
        onClick={() => {
          void layananGrooming();
          void push("?layanan=" + "grooming");
        }}
        variant={variant(queryLayanan === "grooming")}
      >
        Layanan Grooming
      </Button>
    </div>
  );
};
