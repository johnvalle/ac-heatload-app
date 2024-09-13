import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export const Banner = ({ children }: Props) => {
  return <div className='max-w-[1200px] mx-auto bg-white'>{children}</div>;
};
