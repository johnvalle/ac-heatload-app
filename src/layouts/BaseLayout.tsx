import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export const BaseLayout = ({ children }: Props) => {
  return <div className='bg-custom-gray-bg'>{children}</div>;
};
