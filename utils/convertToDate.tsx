export const convertToDate = (dateObject: any) => {
  // Convert Polish month name to English
  const polishMonths = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];
  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const englishMonth = englishMonths[polishMonths.indexOf(dateObject.month)];

  // Create a valid date string
  const dateString = `${dateObject.year} ${englishMonth} ${
    dateObject.day.split(" ")[0]
  } ${dateObject.hour}`;

  // Create a JavaScript Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (!isNaN(date.getTime())) {
    return date;
  } else {
    console.error("Invalid date format:", dateObject);
  }
};
