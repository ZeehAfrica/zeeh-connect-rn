export enum WebViewType {
  WIDGET_OPENED = 'WIDGET_OPENED',
  WIDGET_CLOSED = 'WIDGET_CLOSED',
  ACCOUNT_LINKED = 'ACCOUNT_LINKED',
  ACCOUNT_LINKED_SUCCESS = 'ACCOUNT_LINKED_SUCCESS',
}

export type WebviewMessage = {
  type: WebViewType;
  data: any;
};
