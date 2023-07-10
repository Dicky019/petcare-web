import {
  Hari,
  JenisLayanan,
  PilihJamGrouming,
  PilihJamKesehatanKonsultasi,
} from "@prisma/client";
import { type ISelectItem } from "~/types/jadwal-layanan";
import { displayJam } from "./function";

export const listHari = Object.values(Hari);

export const listHariForm: ISelectItem[] = listHari.map((v) => ({
  display: v.toUpperCase(),
  value: v,
}));

export const listJenisLayanan = Object.values(JenisLayanan);

export const listJenisLayananForm: ISelectItem[] = listJenisLayanan.map(
  (v) => ({
    display: v.toUpperCase(),
    value: v,
  })
);

export const listJamKesehatanKonsultasi = Object.values(
  PilihJamKesehatanKonsultasi
);

export const listJamKesehatanKonsultasiForm: ISelectItem[] =
  listJamKesehatanKonsultasi.map((v) => ({
    display: displayJam(v),
    value: v,
  }));

export const listJamGrooming = Object.values(
  PilihJamGrouming
);

export const listJamGroumingForm: ISelectItem[] =
listJamGrooming.map((v) => ({
    display: displayJam(v),
    value: v,
  }));


