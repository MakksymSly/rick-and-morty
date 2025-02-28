'use client';
import { Location } from '@/types/Location';
import { LocationCard } from '../LocationCard/LocationCard';

interface Props {
	locations: Location[];
}
export const LocationCardsList: React.FC<Props> = (props) => {
	const { locations } = props;

	return (
		<div className="min-h-[calc(100vh-250px)]">
			<div className="flex flex-wrap w-full gap-4 justify-center">
				{locations.map((location) => (
					<LocationCard key={location.id} location={location} />
				))}
			</div>
		</div>
	);
};
