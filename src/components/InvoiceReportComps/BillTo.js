import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

export default function BillTo({ invoice }) {
  // console.log(invoice);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.customer}</Text>
      <Text>{invoice.company}</Text>
      <Text>{invoice.address}</Text>
      <Text>{invoice.email}</Text>
    </View>
  );
}
