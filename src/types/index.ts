export interface Item {
  _id: string;
  title: string;
  price: number;
  img: string;
  category: string;
  description: string;
}

export interface Products {
  items: Item[];
  actual_page: number;
  per_page: number | null;
  total: number;
  total_pages: number | null;
  prev_page: number | null;
  next_page: number | null;
}

export interface Leads {
  name: string;
  lastname: string;
  email: string;
  description: string;
}
