/* eslint-disable max-len */
import {Group, Path} from '@shopify/react-native-skia';
import React from 'react';

import type {StickerProps} from 'react-native-picture-editor-v1/src/components/stickers/Sticker';

export const size = {
  width: 100,
  height: 100,
};

const Sticker = ({matrix}: StickerProps) => {
  return (
    <Group matrix={matrix}>
      <Path
        path="M85.3591 4.7277C83.7321 3.10053 81.0937 3.10053 79.4666 4.7277L11.6666 72.5275V45.0005C11.6666 42.6992 9.80115 40.8338 7.49998 40.8338C5.19881 40.8338 3.33331 42.6992 3.33331 45.0005V78.3338C3.33331 82.9363 7.06427 86.6671 11.6666 86.6671H45C47.3012 86.6671 49.1666 84.8017 49.1666 82.5005C49.1666 80.1992 47.3012 78.3338 45 78.3338H17.6457L85.3591 10.6202C86.9862 8.99307 86.9862 6.35491 85.3591 4.7277Z"
        color="#3B6133"
        fillType="evenOdd"
        stroke-width="6.16667"
      />
    </Group>
  );
};

export const ArrowSticker = {Sticker, size};
