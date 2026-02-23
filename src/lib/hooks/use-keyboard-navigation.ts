import { useCallback, useEffect, useRef, useState } from 'react';

interface UseKeyboardNavigationOptions<T = unknown> {
  items: T[];
  isOpen?: boolean;
  onSelect: (item: T) => void;
  onClose?: () => void;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

type KeyHandler = (e: KeyboardEvent) => void;

interface CreateKeyHandlersParams<T> {
  items: T[];
  selectedIndex: number;
  setSelectedIndex: (i: number | ((prev: number) => number)) => void;
  onSelect: (item: T) => void;
  onClose: (() => void) | undefined;
  onIndexChange: ((i: number) => void) | undefined;
}

function createKeyHandlers<T>({
  items,
  selectedIndex,
  setSelectedIndex,
  onSelect,
  onClose,
  onIndexChange,
}: CreateKeyHandlersParams<T>): Record<string, KeyHandler> {
  const len = items.length;
  const prevent = (e: KeyboardEvent, fn: () => void) => {
    e.preventDefault();
    fn();
  };
  return {
    ArrowDown: (e) =>
      prevent(e, () => {
        const n = (selectedIndex + 1) % len;
        setSelectedIndex(n);
        onIndexChange?.(n);
      }),
    ArrowUp: (e) =>
      prevent(e, () => {
        const p = (selectedIndex - 1 + len) % len;
        setSelectedIndex(p);
        onIndexChange?.(p);
      }),
    Enter: (e) =>
      prevent(e, () => {
        if (items[selectedIndex]) onSelect(items[selectedIndex]);
      }),
    Escape: (e) => prevent(e, () => onClose?.()),
    Home: (e) =>
      prevent(e, () => {
        setSelectedIndex(0);
        onIndexChange?.(0);
      }),
    End: (e) =>
      prevent(e, () => {
        setSelectedIndex(len - 1);
        onIndexChange?.(len - 1);
      }),
  };
}

function useKeyboardListeners(isOpen: boolean, handleKeyDown: (e: KeyboardEvent) => void) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);
}

export function useKeyboardNavigation<T = unknown>({
  items,
  isOpen,
  onSelect,
  onClose,
  initialIndex = 0,
  onIndexChange,
}: UseKeyboardNavigationOptions<T>) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const handlersRef = useRef<Record<string, KeyHandler>>({});
  handlersRef.current = createKeyHandlers({
    items,
    selectedIndex,
    setSelectedIndex,
    onSelect,
    onClose,
    onIndexChange,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || items.length === 0) return;
      handlersRef.current[e.key]?.(e);
    },
    [isOpen, items.length]
  );

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setSelectedIndex(initialIndex);
    }
  }, [isOpen, items.length, initialIndex]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  useKeyboardListeners(Boolean(isOpen), handleKeyDown);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e.nativeEvent),
    getItemRef: (idx: number) => (el: HTMLElement | null) => {
      itemRefs.current[idx] = el;
    },
  };
}
