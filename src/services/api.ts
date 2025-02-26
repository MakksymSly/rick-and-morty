'use server';
import { Data } from '@/types/Data';
import axios from 'axios';

export const getData = async (type: Data, pageNumber: number = 1, status: string = '', gender: string = '', name = '') => {
	const url = process.env.URL_KEY;
	if (url) {
		const response = await axios.get(`${url}/${type}`, { params: { page: pageNumber, status: status, gender: gender, name: name } });
		console.log(response.data);
		return response.data;
	}
};
