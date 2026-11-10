"use client";
export default function Reveal({ children, className, as = "div", ...rest }) {
  return <div className={className} {...rest}>{children}</div>;
}
