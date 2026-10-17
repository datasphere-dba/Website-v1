import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & (
  | { href: string; external?: boolean; type?: never; onClick?: never }
  | {
      href?: undefined;
      external?: never;
      type?: "button" | "submit" | "reset";
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }
);

const base =
  "inline-flex items-center justify-center border-hairline px-5 py-2.5 font-sans text-sm font-medium transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "border-green bg-green text-paper hover:bg-ink hover:border-ink",
  secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
};

/** Renders a link when `href` is given, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
}
