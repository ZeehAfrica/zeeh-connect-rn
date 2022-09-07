import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import type { WebViewError } from 'react-native-webview/lib/WebViewTypes';
import {
  useZeehConnect,
  ZeeHConnectButton,
  ZeehProvider,
} from 'zeeh-connect-rn';

const LinkAccountWithZeeH = () => {
  const { init } = useZeehConnect();
  return (
    <Pressable style={styles.pressable} onPress={() => init()}>
      <Text style={styles.pressableText}>Link your bank account</Text>
    </Pressable>
  );
};

export default function App() {
  const config = {
    onError: (err: WebViewError) => {
      console.log(err.title);
    },
    onClose: () => {
      console.log('modal close');
    },
    onSuccess: (data: any) => {
      console.log('successful');
      console.log(data);
    },
    userReference: 'a unique Id to identify your client',
    publickey: 'pk_e78eiwuewe...',
  };

  return (
    <ZeehProvider {...config}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Zeeh React Native Connect Example</Text>
        <LinkAccountWithZeeH />
        <ZeeHConnectButton
          ButtonWrapperStyle={styles.pressable}
          TextStyles={styles.pressableText}
          text="Testing This"
        />
      </View>
    </ZeehProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 32,
    textAlign: 'center',
  },
  pressable: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 16,
    marginBottom: 16,
  },
  pressableText: {
    color: 'white',
    fontSize: 16,
  },
});
