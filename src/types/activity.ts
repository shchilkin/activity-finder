// TODO: Try zod inference instead of interface
export interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  signedUp: string[];
  participated: string[];
}
