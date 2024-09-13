import { createLazyFileRoute } from "@tanstack/react-router";
import plugSvg from "@assets/plug.svg";
import rulerSvg from "@assets/ruler.svg";
import { BaseLayout } from "@/layouts/BaseLayout";
import { Container } from "@/layouts/Container";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <BaseLayout>
      <Container>
        <div className='text-start'>
          <h2 className='font-bold text-2xl text-custom-black'>
            Let's get started
          </h2>
          <h3 className='text-2xl text-custom-black'>
            What do you want to know?
          </h3>
        </div>
        <div className='flex gap-3 py-12'>
          <div className='flex relative bg-custom-blue-light w-[240px] h-[285px] p-9 rounded-[36px]'>
            <img
              className='absolute -top-8 left-4'
              src={plugSvg}
              alt='plug image'
              width='200'
            />
            <p className='text-custom-blue-dark font-bold text-[20px] mt-auto'>
              How much HP for my room?
            </p>
          </div>
          <div className='flex relative bg-custom-green-light w-[240px] h-[285px] p-9 rounded-[36px]'>
            <img
              className='absolute -top-8 left-4'
              src={rulerSvg}
              alt='plug image'
              width='200'
            />
            <p className='text-custom-green-dark font-bold text-[20px] mt-auto'>
              Do I have the right AC for my room?
            </p>
          </div>
        </div>
        <h3 className='text-2xl text-custom-black'>Saved calculations</h3>
      </Container>
    </BaseLayout>
  );
}
