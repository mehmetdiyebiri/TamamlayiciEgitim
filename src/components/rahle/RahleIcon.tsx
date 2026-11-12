import React from 'react';

export interface RahleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
  variant?: 'outline' | 'silhouette';
}

export const RahleIcon: React.FC<RahleIconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
  variant = 'outline',
  ...props
}) => {
  if (variant === 'silhouette') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
      >
        {/* Sol Kur'an Sayfası */}
        <path d="M11 4.5 C 8 3.2 5 3.5 2.5 4.8 c -.3 .2 -.5 .5 -.5 .9 v 6.5 c 0 .4 .3 .7 .7 .6 c 2.5 -.9 5.2 -.9 8 .4 c .2 .1 .3 0 .3 -.3 V 4.5 z" />
        {/* Sağ Kur'an Sayfası */}
        <path d="M13 4.5 v 8.4 c 0 .3 .1 .4 .3 .3 c 2.8 -1.3 5.5 -1.3 8 -.4 c .4 .1 .7 -.2 .7 -.6 V 5.7 c 0 -.4 -.2 -.7 -.5 -.9 c -2.5 -1.3 -5.5 -1.6 -8.5 -.3 z" />
        {/* Çapraz Ahşap Rahle Ayakları ve Geleneksel Ayak Oymaları */}
        <path d="M4.5 13.2 L 10.5 17.2 L 6.5 20.8 c -.4 .4 -.5 .9 -.3 1.4 c .2 .5 .7 .8 1.2 .8 h 1.8 c .4 0 .8 -.2 1.1 -.5 l 1.7 -1.8 l 1.7 1.8 c .3 .3 .7 .5 1.1 .5 h 1.8 c .5 0 1 -.3 1.2 -.8 c .2 -.5 .1 -1 -.3 -1.4 l -4 -3.6 l 6 -4 c .4 -.3 .5 -.8 .2 -1.2 c -.3 -.4 -.8 -.5 -1.2 -.2 L 12 15.6 L 7.2 12.2 c -.4 -.3 -1 -.2 -1.3 .2 c -.3 .4 -.2 .9 .2 1.2 z" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Üst Kısım: Açık Kur'an-ı Kerim Sayfaları (Open Quran Pages) */}
      <path d="M2.5 5.5 C 5.5 3.8 8.8 3.8 12 5.8 C 15.2 3.8 18.5 3.8 21.5 5.5 v 6.5 C 18.5 10.3 15.2 10.3 12 12.3 C 8.8 10.3 5.5 10.3 2.5 12 Z" />
      {/* Kur'an Omurga Ayracı (Center Spine) */}
      <path d="M12 5.8 v 6.5" />
      {/* Sayfa Satır Detayları (Delicate Quran Verse Lines) */}
      <path d="M5.5 8.2 c 1.8 -0.8 3.8 -0.6 5 0" strokeWidth={Number(strokeWidth) > 1.5 ? 1.3 : strokeWidth} />
      <path d="M18.5 8.2 c -1.8 -0.8 -3.8 -0.6 -5 0" strokeWidth={Number(strokeWidth) > 1.5 ? 1.3 : strokeWidth} />
      {/* Ahşap Çapraz Rahle İskeleti (Crossed Wooden Scissor Legs with 3D Overlap) */}
      <path d="M5 13.5 L 10.5 16.8 m 3 1.6 L 19 21.5" />
      <path d="M19 13.5 L 5 21.5" />
      {/* Alt Taban ve Geleneksel Selçuklu/Osmanlı Kemer Oyması (Carved Ottoman Arch & Foot Base) */}
      <path d="M3.5 21.5 h 3" />
      <path d="M17.5 21.5 h 3" />
      <path d="M6.5 21.5 C 9 19 15 19 17.5 21.5" />
    </svg>
  );
};

export default RahleIcon;
