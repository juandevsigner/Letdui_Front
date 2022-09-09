//TODO: organizar fecha de verdad
export const dateFormat = (date: any) => {
  const newDate = new Date(date.split("T")[0].split("-"));
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("en-EN", options);
};
