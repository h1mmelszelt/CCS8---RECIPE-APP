import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins"; // Defaults to 400 weight

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif", // Ensure headings use Poppins
    body: "'Poppins', sans-serif", // Ensure body text uses Poppins
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'Poppins', sans-serif", // Explicitly set font for Heading
      },
    },
  },
});

export default theme;
