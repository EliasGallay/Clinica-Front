import Image from 'next/image';

export const HeroSectionMobile = () => {
  return (
    <div className="relative lg:hidden br-rtl rounded-r-lg overflow-hidden pt-12 bg-[var(--primary-soft)]">
      {/* Wave SVG */}
      <Image src={'/login_hero_mobile.png'} alt="Hero image" width={600} height={400} />
    </div>
  );
};
