import { createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@components/ui/button";

import { BaseLayout } from "@layouts/BaseLayout";
import plugSvg from "@assets/plug.svg";
import { Container } from "@/layouts/Container";
import { Banner } from "@/layouts/Banner";

export const Route = createLazyFileRoute("/HPCalculator")({
  component: HPCalculator,
});

function HPCalculator() {
  return (
    <BaseLayout>
      <Banner>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='bg-custom-blue-light w-[220px] h-[200px] flex items-center justify-center rounded-tr-[45%] rounded-br-[45%]'>
              <img src={plugSvg} width='100' alt='plug image' />
            </div>
            <h2 className='text-custom-blue-dark text-2xl font-bold pl-4 max-w-[250px]'>
              How much horsepower does my room need?
            </h2>
          </div>
          <Button>Calculate</Button>
        </div>
      </Banner>
      <Container></Container>
    </BaseLayout>
  );
}
