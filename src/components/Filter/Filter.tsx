import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
	setName?: (name: string) => void;
	setGender?: (gender: string) => void;
	setStatus?: (status: string) => void;
	name?: string;
	gender?: string;
	status?: string;
	type: string;
}

export const Filters: React.FC<Props> = ({ setName, setGender, setStatus, type }) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [currentName, setCurrentName] = useState(searchParams.get('name') || '');
	const [currentGender, setCurrentGender] = useState(searchParams.get('gender') || '');
	const [currentStatus, setCurrentStatus] = useState(searchParams.get('status') || '');

	useEffect(() => {
		setName?.(currentName);
		setGender?.(currentGender);
		setStatus?.(currentStatus);

		const params = new URLSearchParams();
		if (currentName) params.set('name', currentName);
		if (currentGender) params.set('gender', currentGender);
		if (currentStatus) params.set('status', currentStatus);

		router.push(`?${params.toString()}`);
	}, [currentName, currentGender, currentStatus]);

	return (
		<div className="w-full max-w-lg mx-auto p-4rounded-lg">
			{type === 'characters' && (
				<div className="flex items-center gap-4">
					<input type="text" placeholder="Search by name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
					<select value={currentGender} onChange={(e) => setCurrentGender(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="unknown">Unknown</option>
					</select>
					<select value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
						<option value="">Select Status</option>
						<option value="Alive">Alive</option>
						<option value="Dead">Dead</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			)}
		</div>
	);
};
