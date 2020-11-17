import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  remitToContainer: {
    marginBottom: 36,
  },
  remitTo: {
    marginBottom: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

export default function InvoiceRemitToInfo({ invoice }) {
  return (
    <View style={styles.remitToContainer}>
      <Text style={styles.remitTo}>Remit To:</Text>
      <Text>{invoice.remitToUser}</Text>
      <Text>{invoice.remitToUserStreet}</Text>
      <Text>{invoice.remitToUserAddress}</Text>
      {/* <Text>{invoice.userEmail}</Text> */}
    </View>
  );
}
