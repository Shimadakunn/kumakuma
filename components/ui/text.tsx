import { Text as RNText, TextProps, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export function Text({ children, className = '', style, ...props }: CustomTextProps) {
  return (
    <RNText
      style={[{ fontFamily: 'Lexend_500Medium' }, style]}
      className={`text-black ${className}`}
      {...props}>
      {children}
    </RNText>
  );
}
