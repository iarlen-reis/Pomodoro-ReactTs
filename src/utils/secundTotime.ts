export const secundToTime = (secunds: number): string => {
  const zeroLeft = (number: number) => {
    return Math.floor(number).toString().padStart(2, "0");
  };

  const minute = zeroLeft((secunds / 60) % 60);
  const secund = zeroLeft((secunds % 60) % 60);

  return `${minute}:${secund}`;
};
