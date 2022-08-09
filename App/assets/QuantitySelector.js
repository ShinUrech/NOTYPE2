import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QuantitySelector = ({quantity, setQuantity, color, fontFamily}) => {
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onMinus} style={styles.button}>
        <Text style={buttonText(color, fontFamily)}>-</Text>
      </TouchableOpacity>

      <Text style={buttonText(color, fontFamily)}>{quantity}</Text>

      <TouchableOpacity onPress={onPlus} style={styles.button}>
        <Text style={buttonText(color, fontFamily)}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  button: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function buttonText(color, fontFamily){
    return{
      fontSize: 25,
      color: color,
      fontFamily: fontFamily,
    };
}

export default QuantitySelector;