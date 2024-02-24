import * as React from "react";

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  const { fill = "#ffffff", height = 16, width = 18, ...rest } = props;
  return (
    <svg
      viewBox="0 0 18 16"
      fill="none"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z" fill={fill} />
    </svg>
  );
}

export default IconMenu;
