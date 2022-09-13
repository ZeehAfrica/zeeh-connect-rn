# zeeh-connect-rn

React Native SDK for implementing ZeeH widget - It is a quick and secure way to link bank accounts to ZeeH from within your React Native app. ZeeH Connect is a drop-in framework that handles connecting a financial institution to your app (credential validation, bank statements etc).

## Documentation

For complete information about ZeeH Connect, head to the [docs](https://zeehdocs.zeeh.africa).

## Getting Started

Checkout our [get started guide](https://zeehdocs.zeeh.africa/guides/getting-started) to create your developer account and retrieve your Client Token, API Keys, and Private Keys.

## Installation

using npm

```sh
npm install zeeh-connect-rn
```

using yarn

```sh
yarn add zeeh-connect-rn
```

## Usage

### with hooks

```js
import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import type { WebViewError } from 'react-native-webview/lib/WebViewTypes';
import { useZeehConnect, ZeehProvider } from 'zeeh-connect-rn';

export default function App() {
  const { init } = useZeehConnect();

  const config = {
    onClose: () => {
      //if the widget is close
      console.log('modal close');
    },
    onWidgetError: (data: any) => {
      console.log('encountered error when loading widget');
      console.log(data);
    },
    onSuccess: (data: any) => {
      //if the connect is successful
      console.log('successful');
      console.log(data);
    },
    userReference: 'a unique Id to identify your client, might be your',
    publickey: 'pk_e78eiwuewe...', //Access your dashboard to get this
  };

  return (
    <ZeehProvider {...config}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          zeeh react native connect with hooks
        </Text>
        return (<Pressable style={styles.pressable} onPress={() => init()}>
          <Text style={styles.pressableText}>Link your bank account</Text>
        </Pressable>
        );
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
```

### with component

```js
import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import type { WebViewError } from 'react-native-webview/lib/WebViewTypes';
import { useZeehConnect, ZeehProvider } from 'zeeh-connect-rn';

export default function App() {
  const config = {
    onClose: () => {
      //if the widget is close
      console.log('modal close');
    },
    onWidgetError: (data: any) => {
      console.log('encountered error when loading widget');
      console.log(data);
    },
    onSuccess: (data: any) => {
      //if the connect is successful
      console.log('successful');
      console.log(data);
    },
    userReference: 'a unique Id to identify your client, might be your',
    publickey: 'pk_e78eiwuewe...', //This can be get on your ZeeH Dashboard
  };

  return (
    <ZeehProvider {...config}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Zeeh React Native Component Example
        </Text>
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
```

## Configuration Options

- [`publicKey`](#publicKey)
- [`onSuccess`](#onSuccess)
- [`onClose`](#onClose)
- [`onWidgetError`](#onWidgetError)
- [`onLoad`](#onLoad)
- [`userReference`](#userReference)

### <a id="publicKey"></a> `publicKey`

#### String: Required

This is your ZeeH Africa public API key from [ZeeH dashboard](https://dash.zeeh.africa/app).

### <a name="onSuccess"></a> `onSuccess`

#### (data) => { Void }: Required

The closure is called when a user has successfully onboarded their account. It should return back user financial institution details including the [`userReference`](#userReference) passed.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onSuccess: (data) => {
    console.log(data);
  },
};
```

The data JSON returned from the onSuccess callback.

```js
{
  message:"linking successful",
  timeStamps:"",
  institution:{
    _id: 'uuid string',
    institution: {
      name: 'FCMB'
      bankCode:'214'
      type: 'classic savings',
    },
    name: 'jon doe'
    accountNumber: '1010101010'
    balance: 5000
    userReference: 'random string'
    bvn: 2222
  }
}
```

### <a id="onClose"></a> `onClose`

#### () => { Void }: Optional

The optional closure is called when a user has specifically exited the ZeeH Africa Connect flow. It does not take any arguments.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onSuccess: (data) => {
    console.log(data);
  },
  onClose: () => console.log('widget closed'),
};
```

### <a id="onWidgetError"></a> `onWidgetError`

#### (data) => { Void }: Optional

The optional closure is called if errors were encountered when loading the widget. passing a wrong publicKey or wrong params can cause this error.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onSuccess: (data) => {
    console.log(data);
  },
  onClose: () => console.log('widget closed'),
  onWidgetError: (data) =>
    console.log('There was an error when loading the widget'),
};
```

### <a id="onLoad"></a> `onLoad`

#### () => { Void }: Optional

The optional closure is called if the widget is succesfully loaded.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onSuccess: (data) => {
    console.log(data);
  },
  onClose: () => console.log('widget closed'),
  onWidgetError: data) =>
    console.log('There was an error when loading the widget'),
  onClose: () => console.log('widget loaded'),
};
```

### <a id="userReference"></a> `userReference`

#### String: Optional

A unique string that should be passed to the connect widget. This will act like an Id of your user that is with Us. you can get account details passing userReference as a params.
It will be generated automatically if not passed, but it's recommended to always pass it. It could be your client Id.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onSuccess: (data) => {
    console.log(data);
  },
  onClose: () => console.log('widget closed'),
  onWidgetError: (data) =>
    console.log('There was an error when loading the widget'),
  onClose: () => console.log('widget loaded'),
  userReference: 'recommended(your client userId)',
};
```

## Examples

See more examples [here](/example/src/App.tsx).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](/LICENSE)
