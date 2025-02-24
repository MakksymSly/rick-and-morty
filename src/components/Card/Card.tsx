import { Character } from "@/types/Character";
import Image from 'next/image';
import Link from "next/link";

interface Props {
  character: Character;
}

export const Card: React.FC<Props> = (props) => {

  const {character} = props;
  return (
    <>
      <div className="mx-auto border-2  border-green-500 rounded">
        <Link href={`/characters/${character.id}`}>
          <Image src={character.image} alt={character.name} width={250} height={250} />
          <h2 className="text-center text-base text-white font-bold">{character.name}</h2>
        </Link>
    </div>
    </>
  );
}