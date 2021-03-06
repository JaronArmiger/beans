import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { 
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';



const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Downloaded {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>
        Order Receipt
      </Text>
      <Text style={styles.author}>
        Pilsen Vintage
      </Text>
      <Text style={styles.subtitle}>
        Order Summary
      </Text>
      <Table>
        <TableHeader>
          <TableCell>Product Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
        </TableHeader>
      </Table>
      <Table data={order.products}>
        <TableBody>
          <DataTableCell 
            getContent={(x) => x.product.title}
          />
          <DataTableCell 
            getContent={(x) => `$${x.price ? x.price.toFixed(2) : 0}`}
          />
          <DataTableCell 
            getContent={(x) => x.count}
          />
        </TableBody>
      </Table>
      <Text style={styles.text}>
        <Text>
          Order Id: {'           '}
          {order._id}
        </Text>
        {'\n'}
        <Text>
          Order Date: {'               '} 
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        {'\n'}
        <Text>
          Amount Paid: {'       '}
          ${order.chargeAmount ? order.chargeAmount.toFixed(2) : 0}
        </Text>
      </Text>
      <Text style={styles.footer}>
        ~ Thanks for Shopping with Pilsen Vintage ~
      </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

export default Invoice;