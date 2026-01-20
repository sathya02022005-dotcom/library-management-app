
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import GeminiAssistant from './components/GeminiAssistant';
import AuthModal from './components/AuthModal';
import { Book, User } from './types';
import { INITIAL_BOOKS, CATEGORIES } from './constants';
// Added User as UserIcon to imports to fix the undefined reference error
import { Search, SlidersHorizontal, BookOpen, Quote, Info, ChevronRight, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', isLoggedIn: false });
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'signup' }>({
    isOpen: false,
    type: 'login'
  });

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, books]);

  const handleAuthSuccess = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', isLoggedIn: false });
  };

  const handleBookAction = (book: Book) => {
    if (!user.isLoggedIn) {
      setAuthModal({ isOpen: true, type: 'login' });
      return;
    }
    
    setBooks(prev => prev.map(b => 
      b.id === book.id ? { ...b, available: !b.available } : b
    ));
    alert(`${book.available ? 'Borrowed' : 'Returned'} "${book.title}" successfully!`);
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-amber-500 selection:text-slate-900">
      <Navbar 
        user={user} 
        onLoginClick={() => setAuthModal({ isOpen: true, type: 'login' })}
        onSignupClick={() => setAuthModal({ isOpen: true, type: 'signup' })}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            alt="Library"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest mb-6">
            <Quote size={14} /> The sanctuary of knowledge
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Discover Your Next <span className="text-amber-500 italic">Great Chapter</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Welcome to Lumina, the world's most intelligent digital library. Explore thousands of titles, 
            personalized by AI to match your unique literary taste.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group"
            >
              Start Exploring <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
              View Membership Plans
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Total Books', value: '12,500+', icon: BookOpen },
            { label: 'Active Readers', value: '8,200', icon: UserIcon },
            { label: 'Weekly Borrows', value: '1,240', icon: Info },
            { label: 'Smart Recs', value: '99%', icon: SlidersHorizontal }
          ].map((stat, i) => (
            <div key={i} className="glass-dark p-6 rounded-3xl border border-white/5 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3 text-amber-500">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Catalog Side */}
          <div id="catalog" className="lg:col-span-2 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <h2 className="text-3xl font-serif font-bold">The Catalog</h2>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by title, author, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
              <SlidersHorizontal size={18} className="text-amber-500 mr-2 flex-shrink-0" />
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 border ${
                    selectedCategory === cat 
                    ? 'bg-amber-500 text-slate-900 border-amber-500' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Book Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} onAction={handleBookAction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                <Search className="mx-auto text-slate-700 mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">No books found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>

          {/* AI Assistant Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
              <GeminiAssistant />
              
              <div className="mt-8 p-8 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl border border-amber-500/20">
                <h3 className="text-xl font-serif font-bold mb-4">Reading Challenge</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Join 45,000+ readers in our Annual Summer Marathon. Set your goal and unlock exclusive rewards.
                </p>
                <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                  <div className="bg-amber-500 h-full rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>15 of 20 books</span>
                  <span className="text-amber-500">75% Complete</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-40 py-20 border-t border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-amber-500 p-2 rounded-lg">
                <BookOpen className="text-slate-900" size={24} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">Lumina<span className="text-amber-500">Library</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Bringing the ancient wonder of libraries into the digital age with cutting-edge technology and a passion for storytelling.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Digital Archives</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Donations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Lumina AI Assistant</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Personal Curator</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Corporate Library</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Kid's Corner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get the latest literary updates and AI-picked reading lists.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-amber-500 text-slate-900 text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Lumina Library Systems. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        type={authModal.type}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;
