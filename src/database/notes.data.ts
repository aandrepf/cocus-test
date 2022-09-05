export class NotesInfo {
  id: string;
  time: number;
  title: string;
  category: string;
  content: string;
}

export class NotesFilter {
  search?: string;
  category?: string;
  isToCreate?: boolean;
}

export class NotesCategory {
  id: number;
  name: string;
}
