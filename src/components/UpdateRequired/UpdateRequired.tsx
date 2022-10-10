import React from "react";
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CONF } from "../../conf";
import { COLORS } from "../../constants/Colors";
import { FONT_FAMILY } from "../../constants/Layout";
import { useLanguage } from "../../hooks/useLanguage";
import { FullBackground } from "../Base/FullBackGround/FullBackground";

export const UpdateRequired: React.FC<{ version?: string }> = ({ version }) => {
  const { t } = useLanguage();

  const storeLink = Platform.OS === "ios" ? CONF.LINKS.APPSTORE : CONF.LINKS.GOOGLEPLAY;

  return (
    <FullBackground>
      <View style={styles.container}>
        {version && (
          <>
            <Text style={styles.text}>{t("updateRequired")}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL(storeLink);
              }}
            >
              <Text style={styles.buttonText}>{t("updateNow")}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </FullBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.Black,
    color: COLORS.COMMON.RED,
    textAlign: "center",
    marginVertical: 12,
  },
  button: {
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.COMMON.RED,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.Black,
    color: COLORS.COMMON.RED,
    textAlign: "center",
  },
});
