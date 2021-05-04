import { Observable } from 'rxjs';

export interface Meal {
  id?: string;
  title: string;
  image?: Observable<string>;
  description?: string;
}
