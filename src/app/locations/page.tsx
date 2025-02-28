'use client';
import { getData } from '@/services/api';
import { Data } from '@/types/Data';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'rc-pagination';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import { LocationCardsList } from '@/components/LocationsCardsList/LocationCardsList';
import { LocationFilter } from '@/components/LocationFilter/LocationFilter';

export default function Locations() {
	const [currentPage, setCurrentPage] = useState(1);

	const [name, setName] = useState('');
	const [locationType, setLocationType] = useState('');
	const [dimension, setDimension] = useState('');

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['locations', currentPage, name, locationType, dimension],
		queryFn: () => getData({ type: Data.Locations, pageNumber: currentPage, name: name, locationType: locationType, dimension: dimension }),
		retry: 1,
	});

	useEffect(() => {
		if (isSuccess) console.log(data);
	}, [isSuccess, data]);

	useEffect(() => {
		if (isError) console.log(isError);
	}, [isError, data]);
	return (
		<>
			<div className="container mx-auto h-full">
				<LocationFilter setName={setName} setLocationType={setLocationType} setDimension={setDimension} />
				<div className="cards">{isLoading && <div className="text-center">Loading...</div>}</div>
				<div> {isSuccess && <LocationCardsList locations={data.results} />}</div>
				{isSuccess && (
					<Pagination
						current={currentPage}
						total={data.info.count}
						pageSize={20}
						onChange={(page) => setCurrentPage(page)}
						className="flex items-center gap-1 sm:gap-2 justify-center mt-4 flex-wrap"
						prevIcon={<span className={cn('px-2 py-1 text-sm sm:px-3 sm:py-1 border rounded-lg bg-gray-200 cursor-pointer', { 'bg-gray-600': currentPage === 1 })}>&lt;</span>}
						nextIcon={<span className={cn('px-2 py-1 text-sm sm:px-3 sm:py-1 border rounded-lg bg-gray-200 cursor-pointer', { 'bg-gray-600': currentPage === data.info.pages })}>&gt;</span>}
						itemRender={(page, type, element) => {
							if (type === 'page') {
								return (
									<button
										className={cn('px-2 py-1 text-sm sm:px-3 sm:py-1 border rounded-lg', {
											'bg-green-500 text-white': currentPage === page,
											'bg-gray-100 hover:bg-gray-200': currentPage !== page,
										})}>
										{page}
									</button>
								);
							}
							return element;
						}}
					/>
				)}
				{isError && <div className="text-center ">Nothing found</div>}
			</div>
		</>
	);
}
