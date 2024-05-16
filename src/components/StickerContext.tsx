import {type SkMatrix, type SkSize} from '@shopify/react-native-skia';
import {createContext, useCallback, useContext, useReducer} from 'react';
import type {ReactNode, FC} from 'react';
import type {SharedValue} from 'react-native-reanimated';

import type {StickerProps} from './stickers/Sticker';

export interface Sticker {
  Sticker: FC<StickerProps>;
  size: SkSize;
  matrix: SharedValue<SkMatrix>;
}

type Stickers = Sticker[];

interface StickerContext {
  stickers: Stickers;
  dispatch: (action: StickerAction) => void;
}

const StickerContext = createContext<StickerContext | null>(null);

type StickerAction =
  | {type: 'add'; sticker: Sticker}
  | {type: 'remove'; index: number}
  | {type: 'update'; index: number; matrix: SkMatrix};

/**
 * Reduces the stickers array based on the action type.
 *
 * @param {Sticker[]} stickers - The array of stickers to be reduced.
 * @param {StickerAction} action - The action object containing type and additional data.
 * @return {Stickers} The updated array of stickers after applying the action.
 */
const stickerReducer = (stickers: Stickers, action: StickerAction) => {
  switch (action.type) {
    case 'add':
      return [...stickers, action.sticker];
    case 'remove':
      return stickers.filter((_, index) => index !== action.index);
    case 'update':
      return stickers.map((sticker, index) =>
        index === action.index ? {...sticker, matrix: action.matrix} : sticker,
      );
    default:
      return stickers;
  }
};

export const useStickerContext = () => {
  const ctx = useContext(StickerContext);
  if (ctx === null) {
    throw new Error('No Sticker context found');
  }
  const {stickers, dispatch} = ctx;
  const addSticker = useCallback(
    (sticker: Sticker) => {
      dispatch({type: 'add', sticker});
    },
    [dispatch],
  );

  const removeSticker = useCallback(
    (index: number) => {
      dispatch({type: 'remove', index});
    },
    [dispatch],
  );

  const updateSticker = useCallback(
    (index: number, matrix: SkMatrix) => {
      dispatch({type: 'update', index, matrix});
    },
    [dispatch],
  );
  return {
    stickers,
    addSticker,
    removeSticker,
    updateSticker,
  };
};

interface StickerProviderProps {
  children: ReactNode | ReactNode[];
}

export const StickerProvider = ({children}: StickerProviderProps) => {
  const [stickers, dispatch] = useReducer(stickerReducer, []);
  return (
    <StickerContext.Provider value={{stickers, dispatch}}>
      {children}
    </StickerContext.Provider>
  );
};
