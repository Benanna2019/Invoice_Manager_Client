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
      <Text>{invoice.remitTo}</Text>
      {/* <Text>{invoice.userAddress}</Text>
      <Text>{invoice.userPhone}</Text>
      <Text>{invoice.userEmail}</Text> */}
    </View>
  );
}
