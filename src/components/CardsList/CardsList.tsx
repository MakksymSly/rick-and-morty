import { Character } from '@/types/Character';
import { Card } from '../Card/Card';

interface Props {
  characters: Character[];
}
export const CardsList: React.FC<Props> = (props) => {

  const { characters } = props;
  
  return (
    <>
      <div className='flex flex-wrap gap-3'>
    {characters.map((character) => (
      <Card key={character.id} character={character} />
    ))}
        </div>
    </>
  );
}