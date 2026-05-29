import type { SVGProps } from "react";
import type { CategoryIconName } from "@/lib/categories";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </Svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </Svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
    </Svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <circle cx="12" cy="7.75" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4z" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <polyline points="9 6 15 12 9 18" />
    </Svg>
  );
}

const EYES = (
  <>
    <circle cx="9" cy="10.5" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10.5" r="1.05" fill="currentColor" stroke="none" />
  </>
);

/** Per-category glyph used on tiles and pills; inherits the category accent via currentColor. */
export function CategoryIcon({
  name,
  ...props
}: IconProps & { name: CategoryIconName }) {
  switch (name) {
    case "happy":
      return (
        <Svg {...props}>
          <circle cx="12" cy="12" r="9.5" />
          {EYES}
          <path d="M8 14c1 1.6 2.4 2.4 4 2.4S15 15.6 16 14" />
        </Svg>
      );
    case "cute":
      return (
        <Svg {...props}>
          <path d="M12 3.2l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.6 6.6 19.4l1.2-5.9L3.4 9.4l6-.7z" />
        </Svg>
      );
    case "sad":
      return (
        <Svg {...props}>
          <circle cx="12" cy="12" r="9.5" />
          {EYES}
          <path d="M8 16c1-1.6 2.4-2.4 4-2.4S15 14.4 16 16" />
        </Svg>
      );
    case "angry":
      return (
        <Svg {...props}>
          <path d="M13 2 4 13.5h6.5L9.5 22 20 10h-6.5z" />
        </Svg>
      );
    case "surprised":
      return (
        <Svg {...props}>
          <circle cx="12" cy="12" r="9.5" />
          <line x1="12" y1="7" x2="12" y2="13" />
          <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "love":
      return (
        <Svg {...props}>
          <path d="M12 20S3.5 14.5 3.5 8.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 1.8C20.5 14.5 12 20 12 20z" />
        </Svg>
      );
    case "greeting":
      return (
        <Svg {...props}>
          <path d="M20.5 11.3a7.6 7.6 0 0 1-8.2 7.6 8 8 0 0 1-3.4-.8L4 19.5l1.4-4.6a7.6 7.6 0 0 1-.9-3.6A7.6 7.6 0 0 1 12.3 3.7a7.6 7.6 0 0 1 8.2 7.6z" />
        </Svg>
      );
    case "apology":
      return (
        <Svg {...props}>
          <circle cx="12" cy="7.5" r="3.3" />
          <path d="M5.5 20c.8-4.2 3.2-6.4 6.5-6.4S17.7 15.8 18.5 20" />
        </Svg>
      );
  }
}
