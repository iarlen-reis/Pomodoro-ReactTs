import { zeroLeft } from "./zeroLeft";

export const secundToTime = (secunds: number): string => {
  const hour = zeroLeft(secunds / 360);
  const minute = zeroLeft((secunds / 60) % 60);
  const secund = zeroLeft((secunds % 60) % 60);

  return `${hour}:${minute}:${secund}`;
};
