import React, { Component, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import * as Icon from '@expo/vector-icons';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../constants';

const renderLabel = ({ label, error }) => {
  return (
    <Block flex={false}>
      {label ? (
        <Text gray2={!error} accent={error}>
          {label}
        </Text>
      ) : null}
    </Block>
  );
};

const renderToggle = ({
  secure,
  rightLabel,
  toggleSecure,
  setToggleSecure,
}) => {
  if (!secure) return null;

  return (
    <Button
      style={styles.toggle}
      onPress={() => setToggleSecure(!toggleSecure)}
    >
      {rightLabel ? (
        rightLabel
      ) : (
        <Icon.Ionicons
          color={theme.colors.gray}
          size={theme.sizes.font * 1.35}
          name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
        />
      )}
    </Button>
  );
};

const renderRight = ({ rightLabel, rightStyle, onRightPress }) => {
  if (!rightLabel) return null;

  return (
    <Button
      style={[styles.toggle, rightStyle]}
      onPress={() => onRightPress && onRightPress()}
    >
      {rightLabel}
    </Button>
  );
};

const Input = ({
  email,
  phone,
  number,
  label,
  rightLabel,
  secure,
  rightStyle,
  onRightPress,
  error,
  onChangeText,
  placeholder,
  value,
  style,
  ...props
}) => {
  const [toggleSecure, setToggleSecure] = useState(false);

  const inputStyles = [
    styles.input,
    error && { borderColor: theme.colors.accent },
    style,
  ];
  const isSecure = toggleSecure ? false : secure;

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <Block flex={false} margin={[theme.sizes.base, 0]}>
      {renderLabel({ label, error })}
      <TextInput
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onChangeText={onChangeText}
        defaultValue={value}
        placeholder={placeholder}
        {...props}
      />
      {renderToggle({ secure, rightLabel, toggleSecure, setToggleSecure })}
      {renderRight({ rightLabel, rightStyle, onRightPress })}
    </Block>
  );
};

export default Input;
const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
    paddingHorizontal: 10,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  },
});
