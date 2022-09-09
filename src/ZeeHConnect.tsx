import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import type {
  WebViewErrorEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
import { WebviewMessage, WebViewType } from './enum';
import type { ZeeHConnectProps } from './type.';

const RenderLoadingView = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="blue" />
  </View>
);

const ZeeHConnect = ({
  publickey,
  onSuccess,
  openWidget,
  ...rest
}: Omit<ZeeHConnectProps, 'children'>) => {
  const { setOpenWidget } = rest;

  const handleMessage = (message: string) => {
    const parsedMessage: WebviewMessage = JSON.parse(message);

    switch (parsedMessage.event) {
      case WebViewType.WIDGET_CLOSED:
        setOpenWidget(false);
        break;

      case WebViewType.ACCOUNT_LINKED_SUCCESS:
        onSuccess({ data: parsedMessage.data });
    }
  };

  const handleWebViewFailure = (error: WebViewErrorEvent['nativeEvent']) => {
    if (rest.onError) {
      setOpenWidget(false);
      return rest.onError(error);
    }
  };

  const handleWidgetLoaded = () => {
    if (rest.onLoad) {
      return rest.onLoad();
    }
  };

  const connectUrl = React.useMemo(() => {
    return { publickey, userReference: rest.userReference };
  }, [publickey, rest.userReference]);

  return (
    <Modal animationType="fade" transparent={true} visible={openWidget}>
      <SafeAreaView style={styles.container}>
        <WebView
          source={{
            uri: `https://widget.zeeh.africa/${connectUrl.publickey}?userReference=${connectUrl.userReference}`,
          }}
          startInLoadingState
          renderLoading={RenderLoadingView}
          onMessage={(event: WebViewMessageEvent) =>
            handleMessage(event.nativeEvent.data)
          }
          onError={(error: WebViewErrorEvent) =>
            handleWebViewFailure(error.nativeEvent)
          }
          onLoad={() => handleWidgetLoaded()}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default ZeeHConnect;
