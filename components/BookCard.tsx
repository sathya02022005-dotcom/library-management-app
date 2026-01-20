
import React from 'react';
import { Book } from '../types';
import { Star, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAction: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAction }) => {
  return (
    <div className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider">
          {book.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button 
            onClick={() => onAction(book)}
            className="w-full py-2 bg-amber-500 text-slate-900 font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            {book.available ? 'Borrow Now' : 'Join Waitlist'}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-amber-500 transition-colors">
            {book.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{book.rating}</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-3">{book.author}</p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock size={12} />
            <span>{book.year}</span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${book.available ? 'text-emerald-400' : 'text-rose-400'}`}>
            {book.available ? (
              <><CheckCircle2 size={14} /> Available</>
            ) : (
              <><AlertCircle size={14} /> Borrowed</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
