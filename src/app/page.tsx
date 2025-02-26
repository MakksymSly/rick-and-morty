'use client';
import { CardsList } from '@/components/CardsList/CardsList';
import { getData } from '@/services/api';
import { Data } from '@/types/Data';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'rc-pagination';
import cn from 'classnames';
import { useState, useEffect } from 'react';

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['characters', currentPage],
		queryFn: () => getData(Data.Characters, currentPage),
	});

	useEffect(() => {
		if (isSuccess) console.log(data);
	}, [isSuccess, data]);

	useEffect(() => {
		if (isError) console.log(isError);
	}, [isError]);

	return (
		<>
			<div className="container mx-auto">
				<div className="cards">{isLoading ? <div>Loading...</div> : <CardsList characters={data?.results} />}</div>
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
			</div>
		</>
	);
}
