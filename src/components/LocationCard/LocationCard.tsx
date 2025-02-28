'use client';
import { Location } from '@/types/Location';

interface Props {
	location: Location;
}

export const LocationCard: React.FC<Props> = (props) => {
	const { location } = props;
	return (
		<>
			<div className="border-2  border-green-500 rounded w-48 justify-start p-3 text-white">
				<h2 className="text-center text-base text-white font-bold">{location.name}</h2>
				<p>Type: {location.type}</p>
				<p>Dimension: {location.dimension}</p>
			</div>
		</>
	);
};
