import * as React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import useZeeHConnect from './useZeeHConnect';

interface IProps extends PressableProps {
  ButtonWrapperStyle?: StyleProp<ViewStyle>;
  TextStyles?: StyleProp<TextStyle>;
  text?: string;
}

const ZeehConnectButton = ({
  ButtonWrapperStyle,
  TextStyles,
  text,
  ...rest
}: IProps) => {
  const { init } = useZeeHConnect();

  return (
    <Pressable style={ButtonWrapperStyle} onPress={() => init()} {...rest}>
      <Text style={TextStyles}>{text ? 'Authenticate with ZeeH' : text}</Text>
    </Pressable>
  );
};

export default ZeehConnectButton;
