import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export const Container = ({ children }: Props) => {
  return <div className='max-w-[1200px] mx-auto bg-white px-8'>{children}</div>;
};
