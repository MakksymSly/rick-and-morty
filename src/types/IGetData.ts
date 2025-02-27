import { Data } from './Data';

export interface IGetData {
	type: Data.Characters | Data.Locations | Data.Episodes;
	pageNumber?: number;
	status?: string;
	gender?: string;
	name?: string;
	species?: string;
	dimension?: string;
	locationType?: string;
	id?: string;
	episode?: string;
}
