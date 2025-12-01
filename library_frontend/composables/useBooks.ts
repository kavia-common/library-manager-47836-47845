export type Book = {
  id: string;
  title: string;
  author: string;
  year?: number | null;
  tags?: string[];
  description?: string;
  coverUrl?: string;
  rating?: number; // optional via feature flag
};

type State = {
  books: Book[];
  initialized: boolean;
};

const STORAGE_KEY = 'ocean-library-books-v1';

/**
 * PUBLIC_INTERFACE
 * A lightweight in-memory store for books with localStorage persistence.
 */
export function useBooks() {
  const state = useState<State>('books-store', () => ({
    books: [],
    initialized: false,
  }));

  const save = () => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value.books));
      } catch {
        // no-op
      }
    }
  };

  const seedData: Book[] = [
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt, David Thomas',
      year: 1999,
      tags: ['Software', 'Programming'],
      description: 'Classic guide to pragmatic software craftsmanship.',
      coverUrl: 'https://covers.openlibrary.org/b/id/8099256-L.jpg',
      rating: 5,
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      year: 2008,
      tags: ['Software', 'Best Practices'],
      description: 'A handbook of agile software craftsmanship.',
      coverUrl: 'https://covers.openlibrary.org/b/id/9611040-L.jpg',
      rating: 4,
    },
    {
      id: '3',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      year: 2017,
      tags: ['Data', 'Architecture'],
      description: 'The big ideas behind reliable, scalable, and maintainable systems.',
      coverUrl: 'https://covers.openlibrary.org/b/id/9250866-L.jpg',
      rating: 5,
    },
    {
      id: '4',
      title: 'The Clean Coder',
      author: 'Robert C. Martin',
      year: 2011,
      tags: ['Professionalism', 'Software'],
      description: 'A code of conduct for professional programmers.',
      coverUrl: 'https://covers.openlibrary.org/b/id/7267805-L.jpg',
      rating: 4,
    },
    {
      id: '5',
      title: 'Refactoring',
      author: 'Martin Fowler',
      year: 1999,
      tags: ['Refactoring', 'Software'],
      description: 'Improving the design of existing code.',
      coverUrl: 'https://covers.openlibrary.org/b/id/9359252-L.jpg',
      rating: 4,
    },
    {
      id: '6',
      title: 'You Don’t Know JS Yet',
      author: 'Kyle Simpson',
      year: 2020,
      tags: ['JavaScript', 'Programming'],
      description: 'Deep dive into the core mechanisms of JS.',
      coverUrl: 'https://covers.openlibrary.org/b/id/10509376-L.jpg',
      rating: 3,
    },
  ];

  const init = () => {
    if (state.value.initialized) return;
    if (process.client) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Book[];
          state.value.books = parsed;
        } else {
          state.value.books = seedData;
          save();
        }
      } catch {
        state.value.books = seedData;
      }
    } else {
      // SSR safe default (no localStorage)
      state.value.books = seedData;
    }
    state.value.initialized = true;
  };

  const list = () => {
    init();
    return state.value.books;
  };

  const getById = (id: string): Book | undefined => {
    init();
    return state.value.books.find(b => b.id === id);
  };

  const add = (book: Omit<Book, 'id'>) => {
    init();
    const id = cryptoRandomId();
    const newBook: Book = { ...book, id };
    state.value.books.unshift(newBook);
    save();
    return newBook;
  };

  const update = (id: string, partial: Partial<Book>) => {
    init();
    const idx = state.value.books.findIndex(b => b.id === id);
    if (idx >= 0) {
      state.value.books[idx] = { ...state.value.books[idx], ...partial, id };
      save();
      return state.value.books[idx];
    }
    return undefined;
  };

  const remove = (id: string) => {
    init();
    const before = state.value.books.length;
    state.value.books = state.value.books.filter(b => b.id !== id);
    if (state.value.books.length !== before) {
      save();
      return true;
    }
    return false;
  };

  const uniqueTags = (): string[] => {
    init();
    const set = new Set<string>();
    state.value.books.forEach(b => (b.tags || []).forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  };

  return {
    list,
    getById,
    add,
    update,
    remove,
    uniqueTags,
  };
}

function cryptoRandomId(): string {
  // Safely access Web Crypto in both browser and Node (Nuxt SSR) without throwing
  let c: any = undefined;
  try {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;
    c = g?.crypto;
  } catch {
    c = undefined;
  }

  // Prefer randomUUID when available
  if (c && typeof c.randomUUID === 'function') {
    try {
      return c.randomUUID();
    } catch {
      // fall through to other strategies
    }
  }

  // Try getRandomValues if available
  if (c && typeof c.getRandomValues === 'function') {
    try {
      const arr = new Uint32Array(4);
      c.getRandomValues(arr);
      return Array.from(arr).map((n) => n.toString(36)).join('').slice(0, 24);
    } catch {
      // fall through
    }
  }

  // Fallback: use Math.random and time (works universally; not cryptographically secure)
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
