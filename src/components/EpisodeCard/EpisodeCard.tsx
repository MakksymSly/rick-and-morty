'use client';
import { Episode } from '@/types/Episode';

interface Props {
	episode: Episode;
}

export const EpisodeCard: React.FC<Props> = (props) => {
	const { episode } = props;
	return (
		<>
			<div className="border-2  border-green-500 rounded w-48 justify-start p-3 text-white">
				<h2 className="text-center text-base text-white font-bold">{episode.name}</h2>
				<p>air date: {episode.air_date} </p>
				<p>episode code: {episode.episode} </p>
				<p>created: {episode.created}</p>
			</div>
		</>
	);
};
