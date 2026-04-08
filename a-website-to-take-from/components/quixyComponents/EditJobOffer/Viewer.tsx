"use client";
export interface ViewerProps {
  value: string;
  light?: boolean;
  displayBlack?: boolean;
  lg?: boolean;
}

export default function Viewer(props: ViewerProps) {
  return (
    <div
      className={`${props.displayBlack && "!text-black"} ${
        props.lg && "lg:!prose-lg"
      } min-w-full prose ${
        !props.light && !props.displayBlack ? "prose-invert" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: props.value }}
    />
  );
}
