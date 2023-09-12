import { Hari, JenisLayanan } from "@prisma/client";
import { type ISelectItem } from "~/types/jadwal-layanan";

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

export const listJamKesehatanKonsultasi = [
  "jam09_10",
  "jam10_11",
  "jam11_12",
  "jam13_14",
  "jam14_15",
  "jam15_16",
  "jam16_17",
  "jam17_18",
  "jam18_19",
  "jam19_20",
  "jam20_21",
];

export const listJamKesehatanKonsultasiForm: ISelectItem[] =
  listJamKesehatanKonsultasi.map((v) => ({
    display: v.split("jam").join("").split("_").map(v => `${v}.00`).join("-"),
    value: v,
  }));

export const listJamGrooming = ["jam09_12", "jam10_14", "jam14_17", "jam16_19"];

export const listJamGroumingForm: ISelectItem[] = listJamGrooming.map((v) => ({
  display: v.split("jam").join("").split("_").map(v => `${v}.00`).join("-"),
  value: v,
}));
