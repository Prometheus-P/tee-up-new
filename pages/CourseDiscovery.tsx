import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Plus, X, Info, ExternalLink, Navigation, Loader2 } from 'lucide-react';
import { Course } from '../types';
import { getCourseDeepDive, findNearbyCourses } from '../services/geminiService';

const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    name: 'St. Andrews Old Course',
    location: 'Fife, Scotland',
    rating: 4.9,
    par: 72,
    holes: 18,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800&auto=format&fit=crop',
    description: 'The home of golf. A historic links course that has challenged the greatest players for centuries.',
    difficulty: 'Pro'
  },
  {
    id: '2',
    name: 'Augusta National',
    location: 'Georgia, USA',
    rating: 5.0,
    par: 72,
    holes: 18,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800&auto=format&fit=crop',
    description: 'Exquisite landscape and legendary holes. Home to the Masters Tournament.',
    difficulty: 'Pro'
  },
  {
    id: '3',
    name: 'Pinehurst No. 2',
    location: 'North Carolina, USA',
    rating: 4.8,
    par: 70,
    holes: 18,
    image: 'https://images.unsplash.com/photo-1623594002633-85e7e9f3b6c4?q=80&w=800&auto=format&fit=crop',
    description: 'Famous for its turtle-back greens and strategic sand traps.',
    difficulty: 'Hard'
  },
  {
    id: '4',
    name: 'Cypress Point Club',
    location: 'California, USA',
    rating: 4.9,
    par: 72,
    holes: 18,
    image: 'https://images.unsplash.com/photo-1592919016327-5117f7815340?q=80&w=800&auto=format&fit=crop',
    description: 'Stunning coastal views and dramatic cliff-side play.',
    difficulty: 'Pro'
  }
];

const CourseDiscovery: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('teeup_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [deepDiveData, setDeepDiveData] = useState<{ text: string; links: { title: string; uri: string }[] } | null>(null);
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyResults, setNearbyResults] = useState<{ title: string; uri: string }[]>([]);

  const [newCourse, setNewCourse] = useState({
    name: '',
    location: '',
    par: 72,
    holes: 18,
    description: '',
    difficulty: 'Moderate' as Course['difficulty']
  });

  useEffect(() => {
    localStorage.setItem('teeup_courses', JSON.stringify(courses));
  }, [courses]);

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const courseToAdd: Course = {
      ...newCourse,
      id: Date.now().toString(),
      rating: 0,
      image: `https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=800&auto=format&fit=crop&sig=${Math.random()}`,
    };
    setCourses([courseToAdd, ...courses]);
    setShowAddModal(false);
    setNewCourse({
      name: '',
      location: '',
      par: 72,
      holes: 18,
      description: '',
      difficulty: 'Moderate'
    });
  };

  const handleDeepDive = async (course: Course) => {
    setSelectedCourse(course);
    setLoadingDeepDive(true);
    setDeepDiveData(null);
    try {
      const data = await getCourseDeepDive(course.name, course.location);
      setDeepDiveData(data as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDeepDive(false);
    }
  };

  const handleNearbySearch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setNearbyLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const results = await findNearbyCourses(pos.coords.latitude, pos.coords.longitude);
        setNearbyResults(results as any);
      } catch (err) {
        console.error(err);
      } finally {
        setNearbyLoading(false);
      }
    }, (err) => {
      setNearbyLoading(false);
      console.error(err);
      alert("Location access denied or unavailable.");
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-amber-600 text-xs font-bold uppercase tracking-[0.4em] mb-2">Discovery</h2>
          <h1 className="text-4xl font-serif font-bold text-slate-900">Elite Destinations</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleNearbySearch}
            className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-slate-50 transition-all flex items-center gap-2"
            disabled={nearbyLoading}
          >
            {nearbyLoading ? <Loader2 className="animate-spin" size={18}/> : <Navigation size={18}/>}
            {nearbyLoading ? 'Finding...' : 'Nearby'}
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-900 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-emerald-800 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Add Destination
          </button>
        </div>
      </header>

      {nearbyResults.length > 0 && (
        <section className="bg-amber-50/50 border border-amber-200 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-xl text-amber-900 flex items-center gap-2">
              <MapPin size={20}/> Recommended Nearby
            </h3>
            <button onClick={() => setNearbyResults([])} className="text-amber-900/50 hover:text-amber-900"><X size={18}/></button>
          </div>
          <div className="flex flex-wrap gap-3">
            {nearbyResults.map((p, i) => (
              <a 
                key={i} 
                href={p.uri} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white border border-amber-200 px-4 py-2 rounded-full text-sm font-medium text-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-2"
              >
                {p.title} <ExternalLink size={14}/>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search courses by name or location..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-emerald-900/30 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-emerald-900">
                <Star size={12} fill="currentColor" /> {course.rating > 0 ? course.rating : 'New'}
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                {course.difficulty}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">{course.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {course.location}
                </p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{course.holes} Holes</span>
                  <span>Par {course.par}</span>
                </div>
                <button 
                  onClick={() => handleDeepDive(course)}
                  className="p-2 rounded-full hover:bg-slate-100 text-emerald-900 transition-all"
                  title="Master Deep Dive"
                >
                  <Info size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="relative h-48 flex-shrink-0">
              <img src={selectedCourse.image} alt={selectedCourse.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-10 pb-10 overflow-y-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-serif font-bold text-slate-900">{selectedCourse.name}</h3>
                <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.3em]">Master's Strategic Intel</p>
              </div>
              
              {loadingDeepDive ? (
                <div className="py-12 flex flex-col items-center gap-4 text-slate-400">
                  <Loader2 className="animate-spin" size={32} />
                  <span className="text-sm font-medium animate-pulse">Alex Rivera is analyzing architectural data...</span>
                </div>
              ) : deepDiveData ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="text-slate-800 leading-relaxed italic text-sm">
                      "{deepDiveData.text}"
                    </p>
                  </div>
                  
                  {deepDiveData.links.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grounding Resources</h4>
                      <div className="flex flex-col gap-2">
                        {deepDiveData.links.map((link: any, i: number) => (
                          <a 
                            key={i} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-900/20 hover:bg-emerald-50 transition-all text-xs font-medium text-slate-700"
                          >
                            {link.title} <ExternalLink size={14} className="text-slate-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              
              <button 
                onClick={() => setSelectedCourse(null)} 
                className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs"
              >
                Close Intel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] max-w-lg w-full p-10 shadow-2xl space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold">New Destination</h3>
              <button onClick={() => setShowAddModal(false)}><X size={24}/></button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input 
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-emerald-900/20" 
                placeholder="Course Name"
                value={newCourse.name}
                onChange={e => setNewCourse({...newCourse, name: e.target.value})}
              />
              <input 
                required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-emerald-900/20" 
                placeholder="Location"
                value={newCourse.location}
                onChange={e => setNewCourse({...newCourse, location: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-emerald-900/20" 
                  placeholder="Par"
                  value={newCourse.par}
                  onChange={e => setNewCourse({...newCourse, par: parseInt(e.target.value) || 72})}
                />
                <input 
                  type="number"
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-emerald-900/20" 
                  placeholder="Holes"
                  value={newCourse.holes}
                  onChange={e => setNewCourse({...newCourse, holes: parseInt(e.target.value) || 18})}
                />
              </div>
              <textarea 
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm h-32 resize-none outline-none focus:ring-1 focus:ring-emerald-900/20" 
                placeholder="Brief Description"
                value={newCourse.description}
                onChange={e => setNewCourse({...newCourse, description: e.target.value})}
              />
              <select 
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm appearance-none outline-none focus:ring-1 focus:ring-emerald-900/20"
                value={newCourse.difficulty}
                onChange={e => setNewCourse({...newCourse, difficulty: e.target.value as any})}
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
                <option value="Pro">Pro</option>
              </select>
              <button 
                type="submit" 
                className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition-all mt-4"
              >
                Add to Collection
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDiscovery;