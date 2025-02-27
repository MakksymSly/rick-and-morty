'use server';
import { IGetData } from '@/types/IGetData';
import axios from 'axios';

export const getData = async ({ type, pageNumber = 1, status = '', gender = '', name = '', species = '', dimension = '', locationType = '', id = '', episode = '' }: IGetData) => {
	const url = process.env.URL_KEY;
	if (url) {
		const response = await axios.get(`${url}/${type}${id}`, { params: { page: pageNumber, status: status, gender: gender, name: name, species: species, dimension: dimension, type: locationType, episode: episode } });
		return response.data;
	}
};
