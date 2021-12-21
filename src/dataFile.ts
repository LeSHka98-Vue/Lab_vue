import { Category, Product } from '@/types/interfaces';

const Categories: Category[] = [
  {
    id: 1,
    image: 'computer.png',
    signature: 'PC',
    category: 'pc',
  },
  {
    id: 2,
    image: 'playstation.png',
    signature: 'PS5',
    category: 'ps5',
  },
  {
    id: 3,
    image: 'xbox.png',
    signature: 'XBox',
    category: 'xbox',
  }
];

const Products: Product[] = [
  {
    id: 1,
    image: 'crysis.jpg',
    name: 'Crysis',
    genre: 'shooter',
    rating: 9,
    description: 'Crysis is a first-person shooter video game series created by German developer Crytek.'
  },
  {
    id: 2,
    image: 'nfs.jpg',
    name: 'NFS',
    genre: 'racing',
    rating: 8,
    description: 'Need for Speed (NFS) is a racing video game franchise published by Electronic Arts.'
  },
  {
    id: 3,
    image: 'assasin.jpg',
    name: "Assasin's Creed",
    genre: 'RPG',
    rating: 9,
    description: "Assassin's Creed series depicts a fictional millennia-old struggle between the Assassins, who fight for peace and free will, and the Templars, who desire peace through order and control."
  }
];

export {
  Categories,
  Products
} 
