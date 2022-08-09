import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from './styling/globalStyles';

const InputField = ({
  leftIcon,
  iconColor = globalStyles.iconColor.iconColor,
  rightIcon,
  inputStyle,
  containerStyle,
  handlePasswordVisibility,
  placeholderTextColor = globalStyles.backgroundColor2.backgroundColor,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle, {alignSelf: 'center'}]}>
      {leftIcon ? (
        <Ionicons
          name={leftIcon + '-outline'}
          size={25}
          color={iconColor}
        />
      ) : null}
      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
        
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Ionicons
            name={rightIcon + '-outline'}
            size={25}
            color={iconColor}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  input: {
    width: '70%',
    paddingLeft: 5,
    fontSize: 18,
  },
});

export default InputField;