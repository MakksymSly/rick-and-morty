import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
	setName?: (name: string) => void;
	setGender?: (gender: string) => void;
	setStatus?: (status: string) => void;
	setSpecies?: (species: string) => void;
}

export const Filters: React.FC<Props> = (props) => {
	const { setName, setGender, setStatus, setSpecies } = props;
	const searchParams = useSearchParams();
	const router = useRouter();

	const [currentName, setCurrentName] = useState(searchParams.get('name') || '');
	const [currentGender, setCurrentGender] = useState(searchParams.get('gender') || '');
	const [currentStatus, setCurrentStatus] = useState(searchParams.get('status') || '');
	const [currentSpecies, setCurrentSpecies] = useState(searchParams.get('species') || '');

	useEffect(() => {
		setName?.(currentName);
		setGender?.(currentGender);
		setStatus?.(currentStatus);
		setSpecies?.(currentSpecies);

		const params = new URLSearchParams();
		if (currentName) params.set('name', currentName);
		if (currentGender) params.set('gender', currentGender);
		if (currentStatus) params.set('status', currentStatus);
		if (currentSpecies) params.set('species', currentSpecies);

		router.push(`?${params.toString()}`);
	}, [currentName, currentGender, currentStatus, setName, setGender, setStatus, router, currentSpecies, setSpecies]);

	return (
		<div className="flex flex-wrap justify-center p-4">
			<div className="flex items-center gap-4 flex-wrap justify-center">
				<input type="text" placeholder="Search by name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
				<select value={currentGender} onChange={(e) => setCurrentGender(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
					<option value="">Select Gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="unknown">Unknown</option>
				</select>
				<select value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
					<option value="">Select Status</option>
					<option value="Alive">Alive</option>
					<option value="Dead">Dead</option>
					<option value="unknown">Unknown</option>
				</select>
				<select value={currentSpecies} onChange={(e) => setCurrentSpecies(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
					<option value="">Select Species</option>
					<option value="Human">Human</option>
					<option value="Humanoid">Humanoid</option>
				</select>
			</div>
		</div>
	);
};
