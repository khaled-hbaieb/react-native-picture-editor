/* eslint-disable max-len */
import {Group, Path} from '@shopify/react-native-skia';
import React from 'react';

import type {StickerProps} from 'react-native-picture-editor-v1/src/components/stickers/Sticker';

export const size = {
  width: 130,
  height: 130,
};

const Sticker = ({matrix}: StickerProps) => {
  return (
    <Group matrix={matrix}>
      <Path
        path="M107.708 9.23291C103.157 9.23291 99.0687 12.2442 97.524 16.7221C96.392 20.0129 94.3708 23.8951 92.0285 28.3867C90.8918 30.5684 89.6543 32.9929 88.394 35.5367C83.8795 26.3149 76.161 17.9824 72.664 14.4854C67.8105 9.63166 59.7758 8.16041 55 11.2634C50.2242 8.16041 42.1895 9.63166 37.3358 14.4809C33.8203 17.9964 26.024 26.4021 21.5965 35.5184C20.336 32.9747 19.1033 30.5639 17.971 28.3821C15.629 23.8951 13.6078 20.0129 12.4755 16.7176C10.9313 12.2442 6.84299 9.23291 2.29174 9.23291C1.02674 9.23291 0 10.2596 0 11.5246C0 19.9534 13.31 58.5589 18.5487 69.7834C23.5033 80.3984 36.5705 97.3064 52.1217 100.336C52.3875 100.405 53.7488 100.895 54.7847 100.735C54.858 100.739 55.1285 100.753 55.1972 100.753C56.2377 100.753 57.6127 100.4 57.7317 100.368C73.4297 97.3062 86.4967 80.3984 91.4513 69.7834C96.69 58.5542 110 19.9534 110 11.5246C110 10.2596 108.973 9.23291 107.708 9.23291ZM80.6162 49.1722C80.5795 49.2317 80.5887 49.3051 80.5567 49.3601C74.9055 55.7126 66.2935 59.1501 55.0825 59.5626C43.6745 59.1501 35.0395 55.6944 29.393 49.3097C29.1822 43.5989 30.4242 36.6872 39.985 31.9021C41.4837 31.1504 43.8395 30.6372 46.3283 30.0872C49.3853 29.4179 52.5295 28.7259 55 27.4289C57.475 28.7259 60.6192 29.4134 63.6717 30.0872C66.1605 30.6326 68.5163 31.1504 70.015 31.9021C79.5025 36.6459 80.8042 43.4934 80.6162 49.1722Z"
        color="black"
      />
    </Group>
  );
};

export const BeardSticker = {Sticker, size};
