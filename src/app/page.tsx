'use client';
import { CharacterCardsList } from '@/components/CharacterCardsList/CharacterCardsList';
import { getData } from '@/services/api';
import { Data } from '@/types/Data';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'rc-pagination';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import { Filters } from '@/components/Filter/Filter';

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);

	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [status, setStatus] = useState('');
	const [species, setSpecies] = useState('');

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['characters', currentPage, name, gender, status, species],
		queryFn: () => getData({ type: Data.Characters, pageNumber: currentPage, name: name, gender: gender, status: status, species: species }),
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
			<div className="container mx-auto">
				<Filters setName={setName} setGender={setGender} setStatus={setStatus} setSpecies={setSpecies} />
				<div className="cards">{isLoading && <div className="text-center">Loading...</div>}</div>
				<div> {isSuccess && <CharacterCardsList characters={data.results} />}</div>
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
