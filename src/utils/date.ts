import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatTime = (timeString: string) => {
  return format(new Date(timeString), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
};
