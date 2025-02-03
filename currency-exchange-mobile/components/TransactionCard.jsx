import { StyleSheet, Text, View } from "react-native";
const TransactionCard = ({item}) => {
  return (
   <View style={styles.card}>
         
         <View style={styles.header}>
           <Text style={styles.date}>
             {item.createdAt.toString()}
           </Text>
         </View>
   
         <View style={styles.details}>

           <View style={styles.currencyContainer}>
             <Text style={styles.currencyText}>
               {item.currencyFrom}
                <Text style={styles.toText}>→</Text>
               {item.currencyTo}
             </Text>
           </View>
   
           <View style={styles.amountContainer}>
             <Text style={styles.amountText}>
               {formatAmount(item.amountFrom)} {item.currencyFrom}
             </Text>
             <Text style={styles.amountText}>
               {formatAmount(item.amountTo)} {item.currencyTo}
             </Text>
           </View>

         </View>
   
         <View style={styles.footer}>
           <Text style={styles.rateText}>Rate: {item.exchangeRate}</Text>
         </View>
       </View>
  );
};
export default TransactionCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },

  header: {
    marginBottom: 16,
  },
  
  date: {
    fontSize: 14,
    color: "#666666",
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  currencyContainer: {
    flex: 1,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555555",
  },
  toText: {
    fontSize: 16,
    color: "#888888",
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
  },

  amountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    paddingTop: 8,
  },
  rateText: {
    fontSize: 14,
    color: "#777777",
  },
});

const formatAmount = (amount) => {
  return amount.toLocaleString();
};