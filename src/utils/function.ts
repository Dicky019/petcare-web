import { listHari } from "./data";

export function sameDay(d1: Date, d2: Date) {
  console.log({d1,d2});
  
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDay() === d2.getDay()
  );
}

export const displayJam = (value: string) => {
  const jam = value.split("jam").join("").split("_").map(v => `${v}.00`).join("-");
  return jam;
};

export const filterByHari = (hari: string) => {
  const haris = Object.entries(listHari);
  console.log({ haris, hari });
  const hariKey = haris.find((h) => h[1] === hari)?.[0];
  return hariKey ?? "0";
};