import { format } from 'date-fns';

function dateFormat(date) {
	return format(new Date(date), 'dd/MM/yyyy');
}

export default dateFormat;
