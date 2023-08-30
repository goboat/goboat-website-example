import Image from 'next/image';

interface GoBoatConnectLogoProps {
  darkMode?: boolean;
}

const GoBoatConnectLogo = (props: GoBoatConnectLogoProps) => {
  const logoPath = props.darkMode ? '/gb-connect-white.png' : '/gb-connect-black.png';

  return (
    <Image src={logoPath} alt="GoBoat Connect logo" width={130} height={45} priority />
  );
};

export default GoBoatConnectLogo;
