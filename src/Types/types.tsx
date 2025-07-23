export type Character = {
  id: number;
  name: string;
  created:string;
  episode:string[],
  location: { name: string, url:string };
  image: string;
  gender:string;
  status: string;
  species: string;
  type: string;
  origin: { name: string, url:string };
};


export type TableProps = {
  characters: Character[];
};