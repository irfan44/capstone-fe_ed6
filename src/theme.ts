import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const Button = {
  baseStyle: {
    borderRadius: "full",
  },
  sizes: {
    md: {
      px: "6",
      py: "1",
    },
  },
};

const Link = {
  baseStyle: {
    _focus: {
      boxShadow: "none",
    },
  },
};

const theme = extendTheme(
  {
    fonts: {
      body: `'InterVariable', system-ui, sans-serif`,
      heading: `'Source Sans Pro', system-ui, sans-serif`,
    },
    components: {
      Button,
      Link,
    },
    styles: {
      global: {
        body: {
          color: "black",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);

export default theme;
