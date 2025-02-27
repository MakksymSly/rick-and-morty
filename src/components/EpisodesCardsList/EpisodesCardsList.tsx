import { Episode } from '@/types/Episode';
import { EpisodeCard } from '../EpisodeCard/EpisodeCard';

interface Props {
	episodes: Episode[];
}
export const EpisodesCardsList: React.FC<Props> = (props) => {
	const { episodes } = props;

	return (
		<div className="min-h-[calc(100vh-250px)]">
			<div className="flex flex-wrap w-full gap-4 justify-center">
				{episodes.map((episode) => (
					<EpisodeCard key={episode.id} episode={episode} />
				))}
			</div>
		</div>
	);
};
