import type { ReactNode } from "react";

export interface OnlyChildrenProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}