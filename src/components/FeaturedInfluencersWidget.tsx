"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// Mock data fallback matching your actual image paths
const mockCreators = [
  {
    id: 1,
    handle: '@gorg_fox.rsa',
    image: '/mediakits/2025-08-19-at-01.29.jpg', 
    avatar: '/images/profiles/gorg_fox.rsa.jpg',
    followers: '37.0K',
    engagement: '6.2%',
    reach: '55.0K',
  },
  {
    id: 2,
    handle: '@momobabes21',
    image: '/mediakits/_MG_0048 2.jpg',
    avatar: '/images/profiles/momobabes21.jpg',
    followers: '64.0K',
    engagement: '8.1%',
    reach: '95.0K',
  },
  {
    id: 3,
    handle: '@lion.paballo',
    image: '/mediakits/_MG_0048.jpg',
    avatar: '/media/photos/lion_paballo.jpg',
    followers: '89.0K',
    engagement: '5.4%',
    reach: '135.0K',
  },
  {
    id: 4,
    handle: '@barbiie.stallion',
    image: '/mediakits/9.jpg',
    avatar: '/media/photos/barbiie_stallion.jpg',
    followers: '323.0K',
    engagement: '4.8%',
    reach: '500.0K',
  }
];

export default function FeaturedInfluencersWidget() {
  const [displayCreators, setDisplayCreators] = useState<any[]>(mockCreators.slice(0, 4));
  const [hasSupabaseError, setHasSupabaseError] = useState(false);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .limit(4);
        
        if (error) {
          console.error("Supabase fetch error:", error);
          setHasSupabaseError(true);
        } else if (data && data.length > 0) {
          setDisplayCreators(data);
        } else {
          // If no error but also no data, could be paused or empty
          setHasSupabaseError(true);
        }
      } catch (err) {
        console.error("Unexpected error fetching creators:", err);
        setHasSupabaseError(true);
      }
    }
    
    fetchCreators();
  }, []);

  return (
    <div className="w-full relative z-50 flex justify-center pointer-events-none" style={{ height: "200px" }}>
      <section className="absolute w-full flex flex-col items-center text-white scale-90 md:scale-100 pointer-events-auto" style={{ top: "10px" }}>
      
      {/* Supabase Error Banner Fallback (Removed for cleaner UI) */}

      {/* Responsive Grid: 2 columns (4 cards) on mobile, 3 columns (3 cards) on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-6xl px-4 md:px-8">
        {displayCreators.map((creator, index) => (
          <div 
            key={creator.id || index} 
            className={`verd-card-wrapper group ${index === 3 ? 'md:hidden' : ''}`}
          >
            <div className="verd-card-border"></div>
            <div className="verd-card-mask"></div>
            <i className="verd-cta-shimmer"></i>
            
            <div className="verd-card-content">
              {/* Main Image Area */}
              <div className="relative aspect-[4/5] sm:h-80 w-full">
                <img 
                  src={creator.image || creator.image_url || '/path-to-image1.jpg'} 
                  alt={creator.handle || creator.name || 'Creator'}
                  className="object-cover w-full h-full"
                />
                
                {/* Gradient overlay to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Avatar & Handle */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#C9A96E]/50 shrink-0">
                    <img src={creator.avatar || creator.avatar_url || '/path-to-avatar1.jpg'} alt="avatar" className="object-cover w-full h-full" />
                  </div>
                  <span className="font-semibold text-sm sm:text-lg text-[#F5F0EB] drop-shadow-md line-clamp-1">{creator.handle || creator.name}</span>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="flex justify-between sm:justify-around items-center bg-transparent backdrop-blur-md p-2 sm:p-4 border-t border-white/5">
                <div className="text-center px-0.5">
                  <p className="text-[10px] sm:text-xs text-[#D4A07A]/70 mb-0.5">👥 Follow</p>
                  <p className="font-bold text-xs sm:text-sm text-[#F5F0EB] truncate">{creator.followers || '0'}</p>
                </div>
                <div className="text-center px-0.5">
                  <p className="text-[10px] sm:text-xs text-[#D4A07A]/70 mb-0.5">📈 Eng</p>
                  <p className="font-bold text-xs sm:text-sm text-[#C9A96E] truncate">{creator.engagement || '0%'}</p>
                </div>
                <div className="text-center px-0.5">
                  <p className="text-[10px] sm:text-xs text-[#D4A07A]/70 mb-0.5">👁️ Reach</p>
                  <p className="font-bold text-xs sm:text-sm text-[#F5F0EB] truncate">{creator.reach || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Animated Influencers Button linking to the Talent/Creators page */}
      <div className="mt-6 mb-8 verd-project-cta-component" style={{ display: "inline-block", isolation: "isolate" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .verd-cta-btn {
            --color-copper: #C17F59;
            --color-copper-light: #D4A07A;
            --color-gold: #C9A96E;
            --color-bg: #0F0F0E;
            --color-cream: #F5F0EB;
            --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.8rem;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 500;
            border-radius: 100px;
            color: var(--color-cream);
            text-decoration: none;
            overflow: hidden;
            transition: color 0.6s var(--ease-out-expo),
              box-shadow 0.6s,
              letter-spacing 0.6s var(--ease-out-expo),
              transform 0.6s var(--ease-out-expo);
            cursor: pointer;
          }

          /* Spinning Gradient Border */
          .verd-cta-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            aspect-ratio: 1;
            transform-origin: center;
            background: conic-gradient(rgba(212, 160, 122, 0.7),
                rgba(193, 127, 89, 0.25) 25%,
                rgba(201, 169, 110, 0.6) 50%,
                rgba(193, 127, 89, 0.25) 75%,
                rgba(212, 160, 122, 0.7));
            animation: verdBorderSpin 4s linear infinite;
            z-index: -2;
            transform: translate(-50%, -50%);
          }

          @keyframes verdBorderSpin {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          /* Inner Background Mask */
          .verd-cta-btn::after {
            content: '';
            position: absolute;
            inset: 1.5px;
            border-radius: 100px;
            background: var(--color-bg);
            z-index: -1;
            transition: background 0.6s;
          }

          /* Shimmer Effect */
          .verd-cta-shimmer {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 40%;
            height: 200%;
            background: radial-gradient(ellipse at center, rgba(232, 184, 148, 0.35), transparent 70%);
            animation: verdShimmer 3.5s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes verdShimmer {
            0% { left: -50%; opacity: 0; }
            15% { opacity: 1; }
            50% { left: 120%; opacity: 1; }
            65% { opacity: 0; }
            100% { left: 120%; opacity: 0; }
          }

          /* Hover States */
          .verd-cta-btn:hover {
            color: #fff;
            box-shadow: 0 0 25px rgba(193, 127, 89, 0.25), 0 0 60px rgba(193, 127, 89, 0.1);
            letter-spacing: 0.17em;
            transform: translateY(-2px);
          }

          .verd-cta-btn:hover::before {
            animation-duration: 2s;
          }

          .verd-cta-btn:hover::after {
            background: rgba(25, 23, 20, 0.92);
          }

          .verd-cta-btn:hover .verd-cta-shimmer {
            animation-duration: 1.8s;
          }

          .verd-cta-text {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          /* --- Widget Card Styling --- */
          .verd-card-wrapper {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
            padding: 1.5px; /* The border width */
            transition: transform 0.6s var(--ease-out-expo), box-shadow 0.6s;
            cursor: pointer;
            isolation: isolate;
          }
          
          .verd-card-wrapper:hover {
            transform: scale(1.02) translateY(-4px);
            box-shadow: 0 0 25px rgba(193, 127, 89, 0.25), 0 0 60px rgba(193, 127, 89, 0.1);
          }
          
          .verd-card-border {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            aspect-ratio: 1;
            transform-origin: center;
            background: conic-gradient(rgba(212, 160, 122, 0.7), rgba(193, 127, 89, 0.25) 25%, rgba(201, 169, 110, 0.6) 50%, rgba(193, 127, 89, 0.25) 75%, rgba(212, 160, 122, 0.7));
            animation: verdBorderSpin 4s linear infinite;
            z-index: -2;
            transform: translate(-50%, -50%);
          }
          
          .verd-card-wrapper:hover .verd-card-border {
            animation-duration: 2s;
          }
          
          .verd-card-mask {
            content: '';
            position: absolute;
            inset: 1.5px;
            border-radius: calc(1rem - 1.5px);
            background: var(--color-bg);
            z-index: -1;
            transition: background 0.6s;
          }
          
          .verd-card-wrapper:hover .verd-card-mask {
            background: rgba(25, 23, 20, 0.92);
          }
          
          .verd-card-wrapper:hover .verd-cta-shimmer {
            animation-duration: 1.8s;
          }
          
          .verd-card-content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            border-radius: calc(1rem - 1.5px);
            overflow: hidden;
          }
        `}} />
        
        <Link href="/talent" className="verd-cta-btn">
          <i className="verd-cta-shimmer"></i>
          <span className="verd-cta-text">
            Influencers
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.4s var(--ease-out-expo)" }}>
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </span>
        </Link>
      </div>

      </section>
    </div>
  );
}
