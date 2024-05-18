import {type SkMatrix, type SkSize} from '@shopify/react-native-skia';
import {createContext, useCallback, useContext, useReducer} from 'react';
import type {ReactNode, FC} from 'react';
import type {SharedValue} from 'react-native-reanimated';

import type {StickerProps} from './stickers/Sticker';

export interface Sticker {
  Sticker: FC<StickerProps>;
  size: SkSize;
  matrix: SharedValue<SkMatrix>;
  index: number;
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

const stickerReducer = (
  stickers: Stickers,
  action: StickerAction,
): Stickers => {
  switch (action.type) {
    case 'add':
      const newStateAdd = [...stickers, {...action.sticker, index: Date.now()}];
      return newStateAdd;
    case 'remove':
      const newStateRemove = stickers.filter(
        (sticker, index) => sticker.index !== action.index,
      );
      return newStateRemove;
    case 'update':
      const newStateUpdate = stickers.map((sticker, index) =>
        index === action.index ? {...sticker, matrix: action.matrix} : sticker,
      );
      return newStateUpdate;
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
  const [stickers, dispatch] = useReducer(stickerReducer, [] as Stickers);

  return (
    <StickerContext.Provider value={{stickers, dispatch}}>
      {children}
    </StickerContext.Provider>
  );
};
