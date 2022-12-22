import { useEffect, useState } from "react";

const Prefix = "chat-clone-";

export default function useLocalStorage(key, initalValue) {
  const prefixedKey = Prefix + key;
  console.log(prefixedKey);
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initalValue === "function") {
      return initalValue();
    } else {
      return initalValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
}
