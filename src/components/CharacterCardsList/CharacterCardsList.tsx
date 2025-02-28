'use client';
import { Character } from '@/types/Character';
import { CharacterCard } from '../CharacterCard/CharacterCard';

interface Props {
	characters: Character[];
}
export const CharacterCardsList: React.FC<Props> = (props) => {
	const { characters } = props;

	return (
		<>
			<div className="flex flex-wrap gap-3">
				{characters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</div>
		</>
	);
};
