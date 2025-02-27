'use client';
import { getData } from '@/services/api';
import { Data } from '@/types/Data';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import cn from 'classnames';

export default function CharacterPage() {
	const { id } = useParams();

	const currentId = `/${id}`;

	const { data, isSuccess, isError, isLoading } = useQuery({
		queryKey: ['character', id],
		queryFn: () => getData({ type: Data.Characters, id: currentId }),
	});
	console.log(data);

	const getDate = (date: string) => {
		const dateObj = new Date(date);
		const formattedDate = dateObj.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
		return formattedDate;
	};

	return (
		<div className="min-h-[calc(100vh-80px)] bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
			{isLoading && <div className="text-center text-white font-bold text-2xl">Loading...</div>}
			{isSuccess && (
				<div className="text-white max-w-4xl mx-auto space-y-6">
					<div className="flex justify-center">
						<Image src={data.image} alt={data.name} width={250} height={250} className={cn('rounded-full border-4 shadow-lg', { 'border-red-500': data.status === 'Dead', 'border-green-500': data.status === 'Alive' })} />
					</div>
					<div className="text-center space-y-2">
						<h1 className="text-4xl text-white font-extrabold">{data.name}</h1>
						<p className="text-xl text-gray-300">Gender: {data.gender}</p>
						<p
							className={cn('text-xl font-semibold', {
								'text-red-500': data.status === 'Dead',
								'text-green-500': data.status === 'Alive',
							})}>
							Status: {data.status}
						</p>
						<p className="text-xl text-gray-300">Species: {data.species}</p>
						<p className="text-xl text-gray-300">Type: {data.type || 'Unknown'}</p>
						<p className="text-xl text-gray-300">Number of episodes: {data.episode.length}</p>
						<p className="text-xl text-gray-300">Origin: {data.origin.name}</p>
						<p className="text-xl text-gray-300">Location: {data.location.name}</p>
						<p className="text-xl text-gray-300">Created: {getDate(data.created)}</p>
						<details>
							<summary>Episodes list</summary>
							<div className="flex flex-col flex-wrap gap-4 justify-center">
								{data.episode.map((episode: string) => {
									const episodeId = episode.split('/');
									const episodeNumber = episodeId[episodeId.length - 1];
									return (
										<div key={episode} className="text-gray-300">
											<p>Episode number: {episodeNumber}</p>
										</div>
									);
								})}
							</div>
						</details>
					</div>
				</div>
			)}
			{isError && <div className="text-center text-white text-2xl font-bold">Error</div>}
		</div>
	);
}
