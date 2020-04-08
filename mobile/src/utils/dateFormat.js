import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

function dateFormat(date) {
	return format(parseISO(date), "dd'/'MM'/'yyyy", { locale: pt });
}

export default dateFormat;
