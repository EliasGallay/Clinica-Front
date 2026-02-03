import Image from 'next/image';

export const HeroSection = () => {
  return (
    <div className="relative hidden lg:block br-rtl rounded-r-lg overflow-hidden">
      {/* Wave SVG */}
      <Image src={'/login_hero_desktop.png'} alt="Hero image" width={600} height={400} />
    </div>
  );
};
