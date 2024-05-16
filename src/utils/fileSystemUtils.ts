import {Buffer} from 'buffer';
import {Alert, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import * as ImagePicker from 'react-native-image-picker';
import Share from 'react-native-share';

const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  const buffer = Buffer.from(uint8Array);
  return buffer.toString('base64');
};

export const saveBase64Image = async (
  imageData: Uint8Array,
): Promise<string | null> => {
  const imageName = generateRandomImageName();
  const path = `file://${RNFS.DocumentDirectoryPath}/${imageName}.png`;
  const base64String = uint8ArrayToBase64(imageData);

  try {
    // Write the Base64 string to a file
    await RNFS.writeFile(path, base64String, 'base64');
    if (Platform.OS === 'ios') {
      await shareToFiles(path);
    } else {
      await RNFS.copyFile(
        path,
        `file://${RNFS.DownloadDirectoryPath}/${imageName}.png`,
      );
    }
    console.log('Image saved successfully:', path);
    // Save the image to the camera roll (photo library)

    //await moveFile(path);
    return path; // Return the file path
  } catch (error) {
    console.error('Error saving image:', error);
    return null;
  }
};

const shareToFiles = async (path: string) => {
  const shareOptions = {
    title: 'Share file',
    failOnCancel: false,
    saveToFiles: true,
    urls: [path], // base64 with mimeType or path to local file
  };

  // If you want, you can use a try catch, to parse
  // the share response. If the user cancels, etc.
  try {
    const ShareResponse = await Share.open(shareOptions);
    console.log('Result =>', ShareResponse);
  } catch (error) {
    console.log('Error =>', error);
  }
};

const moveFile = async (from: string) => {
  /* RNFS.moveFile(from, to)
    .then(() => {
      console.log('File copied successfully.', to);
    })
    .catch(error => {
      console.error('Error copying file:', error);
    }); */
  if (Platform.OS === 'android') {
    await RNFS.moveFile(from, `${RNFS.ExternalDirectoryPath}/image.png`); // Android gallery path
  } else if (Platform.OS === 'ios') {
    await RNFS.write(from, RNFS.LibraryDirectoryPath + '/image.png'); // iOS gallery path with base64 encoding
  }
};

export const selectImageFromGallery = async () => {
  try {
    const options: ImagePicker.OptionsCommon = {
      mediaType: 'photo',
      quality: 1, // Image quality (0 to 1)
      includeBase64: false,
    };

    // Launch image picker
    const image = ImagePicker.launchImageLibrary(
      options,
      async (response: ImagePicker.ImagePickerResponse) => {
        if (!response.didCancel && !response.errorCode) {
          const source = {uri: response.assets};
          return source;
        } else {
          return false;
        }
      },
    );
    return image;
  } catch (error) {
    console.error('Image picker error:', error);
    Alert.alert('Error', 'Failed to pick image.');
  }
};

export function removeFileProtocol(filePath: string): string {
  const fileProtocol = 'file://';

  // Check if the filePath starts with the file:// protocol
  if (Platform.OS === 'android' && filePath.startsWith(fileProtocol) && false) {
    // Remove the file:// prefix
    return filePath.slice(fileProtocol.length);
  }

  // If filePath doesn't start with file://, return it unchanged
  return filePath;
}

function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// Function to generate a random string of length 8
export function generateRandomImageName(): string {
  return generateRandomString(8);
}
