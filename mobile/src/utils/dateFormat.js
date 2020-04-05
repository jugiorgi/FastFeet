import { format, parseISO } from 'date-fns';

function dateFormat(date) {
	return format(parseISO(date), 'dd/MM/yyyy');
}

export default dateFormat;
