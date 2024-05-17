# react-native-picture-editor-v1

<img src="https://github.com/khaled-hbaieb/react-native-picture-editor/assets/62106729/2960c6b4-20d1-423d-abd8-cd5494e7f8c0" alt="iOS" width="200"/>


The **react-native-picture-editor-v1** package provides powerful image editing capabilities for React Native applications.
This package allows users to draw on images, add stickers, import photos, and apply various edits directly on top of images within the app.

Once the editing is complete, users can save the edited image locally on their device.

This package is designed to enable seamless integration of image editing functionalities into React Native apps, enhancing the user experience with customizable image manipulation features.

## Features include:

- Drawing on images with customizable colors and brush sizes.
- Adding stickers and overlaying them on photos.
- Importing images from the device's gallery for editing.
- Applying edits directly on images and saving the edited version locally.

## Installation:

This package depends on various npm packages to function correctly.
To install the required dependencies, run the following commands in your project directory:

With **npm**:

```
npm install @gorhom/bottom-sheet @shopify/react-native-skia react-native-fs react-native-gesture-handler react-native-image-picker react-native-reanimated react-native-share react-native-svg
```

Or with **yarn**:

```
yarn add @gorhom/bottom-sheet @shopify/react-native-skia react-native-fs react-native-gesture-handler react-native-image-picker react-native-reanimated react-native-share react-native-svg
```

After installing the required dependencies, you can install the **react-native-picture-editor-v1** by running the command:

With **npm**:

```
npm install react-native-picture-editor-v1
```

Or with **yarn**:

```
yarn add react-native-picture-editor-v1
```

## Android:

No extra required steps.

## iOS:

```
cd ios && pod install && cd ..
```

## Do not forget to Clear Metro bundler cache (recommended)

```
yarn start --reset-cache
```

## Note:

Please follow the exact steps for each required dependencie.

## Usage:

After installation, import and use the package in your React Native application. For example:

```
import {RNPictureEditor} from 'react-native-picture-editor-v1';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <RNPictureEditor />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```
