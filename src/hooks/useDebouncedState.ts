import { useEffect, useRef, useState } from "react";

function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number = 500,
  options = { leading: false }
) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const leadingRef = useRef(true);

  const clearTimeoutFn = () => clearTimeout(timeoutRef.current);
  useEffect(() => clearTimeoutFn, []);

  const debouncedSetValue = (newValue: T) => {
    clearTimeoutFn();
    if (leadingRef.current && options.leading) {
      setValue(newValue);
    } else {
      timeoutRef.current = setTimeout(() => {
        leadingRef.current = true;
        setValue(newValue);
      }, wait);
    }
    leadingRef.current = false;
  };

  return [value, debouncedSetValue] as const;
}

export { useDebouncedState };
