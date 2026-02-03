import { FormSection } from './_components/FormSection';
import { HeroSection } from './_components/HeroSection';
import { HeroSectionMobile } from './_components/HeroSectionMobile';

export default function LoginPage() {
  return (
    <div className="lg:m-auto bg-white lg:rounded-lg lg:shadow-lg max-w-4xl w-full h-full ">
      <div className="grid lg:grid-cols-2">
        <HeroSectionMobile />
        <FormSection />
        <HeroSection />
      </div>
    </div>
  );
}
