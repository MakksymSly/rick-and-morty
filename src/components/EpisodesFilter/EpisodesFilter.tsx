import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
	setName?: (name: string) => void;
	setEpisode?: (episode: string) => void;
}

export const EpisodesFilter: React.FC<Props> = (props) => {
	const { setName, setEpisode } = props;
	const searchParams = useSearchParams();
	const router = useRouter();

	const [currentName, setCurrentName] = useState(searchParams.get('name') || '');
	const [currentEpisode, setCurrentEpisode] = useState(searchParams.get('episode') || '');

	useEffect(() => {
		setName?.(currentName);
		setEpisode?.(currentEpisode);

		const params = new URLSearchParams();
		if (currentName) params.set('name', currentName);
		if (currentEpisode) params.set('episode', currentEpisode);

		router.push(`?${params.toString()}`);
	}, [currentName, currentEpisode, setName, setEpisode, router]);

	return (
		<div className="flex flex-wrap justify-center p-4">
			<div className="flex items-center gap-4 flex-wrap justify-center">
				<input type="text" placeholder="Search by name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
				<input type="text" placeholder="Search by code" value={currentEpisode} onChange={(e) => setCurrentEpisode(e.target.value.toUpperCase())} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
			</div>
		</div>
	);
};
