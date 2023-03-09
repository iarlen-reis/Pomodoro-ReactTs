import { zeroLeft } from "./zeroLeft";

export const secundToMinutes = (secunds: number): string => {
  const minute = zeroLeft((secunds / 60) % 60);
  const secund = zeroLeft((secunds % 60) % 60);

  return `${minute}:${secund}`;
};
