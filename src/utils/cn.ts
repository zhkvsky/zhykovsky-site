import { clsx, type ClassValue } from "clsx";

function twMerge(...inputs: Array<string | undefined | null | false>) {
  const classes = inputs
    .flatMap((input) => (typeof input === "string" ? input.split(/\s+/) : []))
    .filter(Boolean);

  return [...new Set(classes)].join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
