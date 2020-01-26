import { StyleSheet } from "react-native";

export const themeColors = {
  primary: "#3579e6",
  danger: "red",
  background: "white",
  textColorOnPrimary: "black",
};

export const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: "center",
  },
  buttonText: {
    color: themeColors.textColorOnPrimary,
  },
  container: {
    padding: 10,
  },
  contentColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentToEnd: {
    flex: 1,
    justifyContent: "flex-end",
  },
  helper: {
    color: themeColors.danger,
  },
  image: {
    height: 200,
    marginBottom: 10,
    width: "100%",
  },
  input: {
    backgroundColor: themeColors.background,
    color: themeColors.primary,
    marginBottom: 10,
  },
  marginBottomBig: {
    marginBottom: 20,
  },
  marginBottomSmall: {
    marginBottom: 10,
  },
  marginTopBig: {
    marginTop: 20,
  },
  marginTopSmall: {
    marginTop: 10,
  },
  textToLeft: {
    textAlign: "left",
  },
  textToRight: {
    textAlign: "right",
  },
});
