import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

interface SearchResult {
    title: string;
    description: string;
    slug: string;
    tags: string[];
    date: string;
}

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const fuseRef = useRef<Fuse<SearchResult> | null>(null);

    useEffect(() => {
        // Load index
        async function loadIndex() {
            const res = await fetch('/my-blog/api/posts.json');
            const data = await res.json();
            fuseRef.current = new Fuse(data, {
                keys: ['title', 'description', 'tags'],
                threshold: 0.3,
                includeMatches: true,
                minMatchCharLength: 2,
            });
        }
        loadIndex();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 1 && fuseRef.current) {
            setIsSearching(true);
            const searchResults = fuseRef.current.search(value);
            setResults(searchResults.map(result => result.item));
        } else {
            setIsSearching(false);
            setResults([]);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-zinc-950 dark:text-white dark:ring-zinc-800"
                    placeholder="Search articles, tags, words..."
                    value={query}
                    onChange={handleSearch}
                />
            </div>

            {query.length > 1 && (
                <div className="mt-4 space-y-4">
                    {results.length === 0 ? (
                        <div className="text-center text-zinc-500 py-10">
                            No results found for "{query}"
                        </div>
                    ) : (
                        results.map((post) => (
                            <a
                                key={post.slug}
                                href={`/my-blog/blog/${post.slug}`}
                                className="block p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-indigo-400 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">{post.title}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1">{post.description}</p>
                            </a>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
