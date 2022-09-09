import type React from 'react';
import type { WebViewError } from 'react-native-webview/lib/WebViewTypes';

export type ZeeHConnectProps = {
  children: React.ReactNode;
  publickey: string;
  onClose: () => void;
  onSuccess: (data: ResponseType) => void;
  onLoad?: () => void;
  onError?: (err: WebViewError) => void;
  onWidgetError?: (err: ResponseType) => void;
  openWidget: boolean;
  setOpenWidget: (T: boolean) => void;
  userReference: string;
};

export type WebviewMessage = {
  event: WebViewType;
  data: ResponseType;
};

export type ResponseType = {
  message: string;
  timeStamps: string;
  bank?: string;
  institution?: {
    _id: string;
    institution: {
      name: string;
      bankCode: string;
      type?: string;
    };
    name: string;
    accountNumber: string;
    balance: number;
    userReference: string;
    bvn: number;
  };
};
