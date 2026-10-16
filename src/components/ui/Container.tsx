import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Centers content with the site's max width and side padding. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1128px] px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
