# react-native-picture-editor-v1

<img src="https://github.com/khaled-hbaieb/react-native-picture-editor/assets/62106729/a7591107-28f2-403d-ac91-006044492dc1" alt="iOS" width="200"/>
<img src="https://github.com/khaled-hbaieb/react-native-picture-editor/assets/62106729/b528d121-0c64-4794-81fa-94a6b66b9008" alt="iOS" width="200"/>




<div style="margin-top: 10px; margin-bottom: 10px;">
  <img src='https://github.com/khaled-hbaieb/react-native-picture-editor/assets/62106729/d73d30b5-94b9-46f0-963c-32867870cafd' width="50" height="50" />
  <strong>Warning</strong>
</div>

This package is still under development.

The **react-native-picture-editor-v1** package provides powerful image editing capabilities for React Native applications.
This package allows users to draw on images, add stickers, import photos, and apply various edits directly on top of images within the app.

Once the editing is complete, users can save the edited image locally on their device.

This package is designed to enable seamless integration of image editing functionalities into React Native apps, enhancing the user experience with customizable image manipulation features.

## Features include:

- Adding Images And Stickers
- Drawing with multiple Colors
- Scaling and Rotating Objects
- Deleting Objects
- Saving to Phone storage.

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

## Features to be included:

- Cropping.
- Adding Text with Colors.
