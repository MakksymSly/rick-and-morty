import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
	setName?: (name: string) => void;
	setLocationType?: (type: string) => void;
	setDimension?: (dimension: string) => void;
}

export const LocationFilter: React.FC<Props> = (props) => {
	const { setName, setLocationType, setDimension } = props;
	const searchParams = useSearchParams();
	const router = useRouter();

	const [currentName, setCurrentName] = useState(searchParams.get('name') || '');
	const [currentType, setCurrentType] = useState(searchParams.get('type') || '');

	useEffect(() => {
		setName?.(currentName);
		setLocationType?.(currentType);

		const params = new URLSearchParams();
		if (currentName) params.set('name', currentName);
		if (currentType) params.set('type', currentType);

		router.push(`?${params.toString()}`);
	}, [currentName, currentType, setName, setDimension, setLocationType, router]);

	return (
		<div className="flex flex-wrap justify-center p-4">
			<div className="flex items-center gap-4 flex-wrap justify-center">
				<input type="text" placeholder="Search by name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
				<select value={currentType} onChange={(e) => setCurrentType(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
					<option value="">Select type</option>
					<option value="planet">Planet</option>
					<option value="space station"> Space Station</option>
					<option value="Microverse">Microverse</option>
					<option value="miniverse">Miniverse</option>
					<option value="dimention">Dimention</option>
					<option value="dream">Dream</option>
					<option value="Fantasy World">Fantasy World</option>
					<option value="Asteroid">Asteroid</option>
					<option value="Acid plant">Acid Plant</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>
		</div>
	);
};
