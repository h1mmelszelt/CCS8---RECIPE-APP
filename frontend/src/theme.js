// filepath: c:\Users\Rach Kolly\Desktop\CCS8 RECIPE APP\frontend\src\theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins"; // Defaults to 400 weight
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif", // Font for headings
    body: "'Roboto', sans-serif", // Font for body text
  },
});

export default theme;
