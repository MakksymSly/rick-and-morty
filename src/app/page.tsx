'use client';
import { CardsList } from '@/components/CardsList/CardsList';
import { getData } from '@/services/api';
import { Data } from '@/types/Data';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'rc-pagination';
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
						className="flex items-center gap-2 justify-center mt-4"
						prevIcon={<span className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300">⬅️</span>}
						nextIcon={<span className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300">➡️</span>}
						itemRender={(page, type, element) => {
							if (type === 'page') {
								return <button className={`px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{page}</button>;
							}
							return element;
						}}
					/>
				)}
			</div>
		</>
	);
}
