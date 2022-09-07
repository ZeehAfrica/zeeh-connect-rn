import type React from 'react';
import type { WebViewError } from 'react-native-webview/lib/WebViewTypes';

export type ZeeHConnectProps = {
  children: React.ReactNode;
  publickey: string;
  onClose: () => void;
  onSuccess: (data: any) => void;
  onLoad?: () => void;
  onError?: (err: WebViewError) => void;
  openWidget: boolean;
  setOpenWidget: (T: boolean) => void;
  userReference: string;
};
