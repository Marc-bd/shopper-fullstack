import { http } from '@/services/http/http';

export async function getInitialData() {

    const res = await http.get('app');
   return res.data;

}