import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({
  leftIcon,
  iconColor,
  rightIcon,
  inputStyle,
  containerStyle,
  handlePasswordVisibility,
  placeholderTextColor,
  globalStyles,
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