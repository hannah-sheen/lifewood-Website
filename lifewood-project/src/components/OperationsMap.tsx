import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

const OFFICE_LOCATIONS = [
  { name: 'South Africa', lng: 28.0473, lat: -26.1958, city: 'Johannesburg', details: 'Regional HQ - 150+ employees' },
  { name: 'Nigeria', lng: 3.3792, lat: 6.5244, city: 'Lagos', details: 'West Africa Hub - 200+ employees' },
  { name: 'Kenya', lng: 36.8219, lat: -1.2921, city: 'Nairobi', details: 'East Africa Operations - 120+ employees' },
  { name: 'Egypt', lng: 31.2357, lat: 30.0444, city: 'Cairo', details: 'North Africa Base - 80+ employees' },
  { name: 'Bangladesh', lng: 90.4125, lat: 23.8103, city: 'Dhaka', details: 'South Asia HQ - 300+ employees' },
  { name: 'Republic of the Congo', lng: 15.2429, lat: -4.2634, city: 'Brazzaville', details: 'Central Africa Office - 45+ employees' },
  { name: 'DR Congo', lng: 15.4068, lat: -4.4419, city: 'Kinshasa', details: 'DRC Operations - 60+ employees' },
  { name: 'Ghana', lng: -0.186964, lat: 5.6037, city: 'Accra', details: 'West Africa Center - 90+ employees' },
  { name: 'Madagascar', lng: 47.5079, lat: -18.8792, city: 'Antananarivo', details: 'Indian Ocean Hub - 30+ employees' },
  { name: 'Benin', lng: 2.6323, lat: 6.4969, city: 'Porto-Novo', details: 'Regional Office - 25+ employees' },
  { name: 'Uganda', lng: 32.5825, lat: 0.3136, city: 'Kampala', details: 'East Africa Center - 55+ employees' },
  { name: 'Ivory Coast', lng: -4.0083, lat: 5.3599, city: 'Abidjan', details: 'West Africa Operations - 70+ employees' },
  { name: 'Ethiopia', lng: 38.7578, lat: 8.9806, city: 'Addis Ababa', details: 'Horn of Africa Hub - 40+ employees' },
  { name: 'Niger', lng: 2.1254, lat: 13.5127, city: 'Niamey', details: 'Sahel Region Office - 20+ employees' },
  { name: 'Tanzania', lng: 39.2022, lat: -6.7924, city: 'Dar es Salaam', details: 'East Africa Hub - 65+ employees' },
  { name: 'Namibia', lng: 17.0846, lat: -22.5609, city: 'Windhoek', details: 'Southern Africa Office - 35+ employees' },
  { name: 'Zambia', lng: 28.3217, lat: -15.4167, city: 'Lusaka', details: 'Central Africa Hub - 45+ employees' },
  { name: 'Zimbabwe', lng: 31.0335, lat: -17.8252, city: 'Harare', details: 'Southern Africa Hub - 50+ employees' },
  { name: 'Liberia', lng: -10.8005, lat: 6.3106, city: 'Monrovia', details: 'West Africa Office - 25+ employees' },
  { name: 'Sierra Leone', lng: -13.2348, lat: 8.4844, city: 'Freetown', details: 'West Africa Hub - 30+ employees' },
];

const OperationsMap = forwardRef(({ selectedCountry: externalSelectedCountry }: { selectedCountry?: string | null }, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ name: string; city: string; details: string; x: number; y: number } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<any>(null);
  const svgRefForZoom = useRef<SVGSVGElement | null>(null);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);

  // Expose zoomToCountry method to parent component
  useImperativeHandle(ref, () => ({
    zoomToCountry: (countryName: string, lng: number, lat: number) => {
      setSelectedCountry(countryName);
      
      setTimeout(() => {
        if (svgRefForZoom.current && zoomRef.current && widthRef.current && heightRef.current) {
          const width = widthRef.current;
          const height = heightRef.current;
          
          const projection = d3.geoMercator()
            .scale(width / 4.2)
            .center([20, 5])
            .translate([width / 2, height / 2]);
          
          const coords = projection([lng, lat]);
          if (coords) {
            const svg = d3.select(svgRefForZoom.current);
            const newTransform = { 
              x: width / 2 - coords[0], 
              y: height / 2 - coords[1], 
              k: 3 
            };
            
            svg.transition().duration(750).call(
              zoomRef.current.transform as any, 
              d3.zoomIdentity
                .translate(newTransform.x, newTransform.y)
                .scale(newTransform.k)
            );
          }
        }
      }, 100);
    }
  }));

  // Update selected country when external prop changes
  useEffect(() => {
    if (externalSelectedCountry) {
      const office = OFFICE_LOCATIONS.find(o => o.name === externalSelectedCountry);
      if (office && svgRefForZoom.current && zoomRef.current) {
        setSelectedCountry(externalSelectedCountry);
        
        const width = widthRef.current;
        const height = heightRef.current;
        
        const projection = d3.geoMercator()
          .scale(width / 4.2)
          .center([20, 5])
          .translate([width / 2, height / 2]);
        
        const coords = projection([office.lng, office.lat]);
        if (coords) {
          const svg = d3.select(svgRefForZoom.current);
          const newTransform = { 
            x: width / 2 - coords[0], 
            y: height / 2 - coords[1], 
            k: 3 
          };
          
          svg.transition().duration(750).call(
            zoomRef.current.transform as any, 
            d3.zoomIdentity
              .translate(newTransform.x, newTransform.y)
              .scale(newTransform.k)
          );
        }
      }
    }
  }, [externalSelectedCountry]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const width = dimensions.width;
    const height = dimensions.height;
    
    // Store width and height for external zoom function
    widthRef.current = width;
    heightRef.current = height;
    svgRefForZoom.current = svgRef.current;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();
    
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background', '#133020')
      .style('cursor', 'grab');
    
    // Create a group for zoom/pan
    const g = svg.append('g');
    
    // Create projection with current zoom
    const projection = d3.geoMercator()
      .scale(width / 4.2)
      .center([20, 5])
      .translate([width / 2, height / 2]);
    
    // Create path generator
    const geoPath = d3.geoPath().projection(projection);
    
    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        const newTransform = event.transform;
        
        // Update projection and redraw
        const newProjection = d3.geoMercator()
          .scale(width / 4.2 * newTransform.k)
          .center([20, 5])
          .translate([width / 2 + newTransform.x, height / 2 + newTransform.y]);
        
        const newPath = d3.geoPath().projection(newProjection);
        
        // Update countries
        svg.selectAll('path').attr('d', (d: any) => newPath(d));
        
        // Update markers
        svg.selectAll('.marker').attr('cx', (d: any) => {
          const coords = newProjection([d.lng, d.lat]);
          return coords ? coords[0] : 0;
        }).attr('cy', (d: any) => {
          const coords = newProjection([d.lng, d.lat]);
          return coords ? coords[1] : 0;
        });
        
        svg.selectAll('.pulse').attr('cx', (d: any) => {
          const coords = newProjection([d.lng, d.lat]);
          return coords ? coords[0] : 0;
        }).attr('cy', (d: any) => {
          const coords = newProjection([d.lng, d.lat]);
          return coords ? coords[1] : 0;
        });
      });
    
    svg.call(zoom as any);
    zoomRef.current = zoom;
    
    // Load and draw world map
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json')
      .then(response => response.json())
      .then(world => {
        const countries = topojson.feature(world, world.objects.countries) as any;
        
        // Draw countries with interactive features
        g.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', (feature: any) => geoPath(feature))
          .attr('fill', (d: any) => {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const hasOffice = OFFICE_LOCATIONS.some(office => 
              countryName.toLowerCase().includes(office.name.toLowerCase()) ||
              office.name.toLowerCase().includes(countryName.toLowerCase())
            );
            return selectedCountry === countryName ? '#FFB347' : '#046241';
          })
          .attr('stroke', (d: any) => {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const hasOffice = OFFICE_LOCATIONS.some(office => 
              countryName.toLowerCase().includes(office.name.toLowerCase()) ||
              office.name.toLowerCase().includes(countryName.toLowerCase())
            );
            return hasOffice ? '#FFC370' : '#FFB347';
          })
          .attr('stroke-width', (d: any) => {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const hasOffice = OFFICE_LOCATIONS.some(office => 
              countryName.toLowerCase().includes(office.name.toLowerCase()) ||
              office.name.toLowerCase().includes(countryName.toLowerCase())
            );
            return hasOffice ? 1.5 : 0.5;
          })
          .attr('stroke-opacity', 0.7)
          .attr('cursor', 'pointer')
          .on('mouseenter', function(this: any, event: any, d: any) {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const hasOffice = OFFICE_LOCATIONS.some(office => 
              countryName.toLowerCase().includes(office.name.toLowerCase()) ||
              office.name.toLowerCase().includes(countryName.toLowerCase())
            );
            
            if (hasOffice) {
              d3.select(this)
                .attr('fill', '#FFC370')
                .attr('stroke', '#F9F7F7')
                .attr('stroke-width', 2);
            } else {
              d3.select(this)
                .attr('fill', '#0a5a3a')
                .attr('stroke', '#FFB347')
                .attr('stroke-width', 1);
            }
          })
          .on('mouseleave', function(this: any, event: any, d: any) {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const isSelected = selectedCountry === countryName;
            d3.select(this)
              .attr('fill', isSelected ? '#FFB347' : '#046241')
              .attr('stroke', '#FFB347')
              .attr('stroke-width', 0.5);
          })
          .on('click', function(this: any, event: any, d: any) {
            const countryName = d.properties?.name || d.properties?.admin || '';
            const office = OFFICE_LOCATIONS.find(office => 
              countryName.toLowerCase().includes(office.name.toLowerCase()) ||
              office.name.toLowerCase().includes(countryName.toLowerCase())
            );
            
            if (office) {
              setSelectedCountry(countryName);
              // Center map on clicked country
              const coords = projection([office.lng, office.lat]);
              if (coords) {
                const newTransform = { x: width / 2 - coords[0], y: height / 2 - coords[1], k: 2 };
                svg.transition().duration(750).call(zoom.transform as any, d3.zoomIdentity
                  .translate(newTransform.x, newTransform.y)
                  .scale(newTransform.k));
              }
            }
          });
        
        // Add markers
        g.selectAll('.marker')
          .data(OFFICE_LOCATIONS)
          .enter()
          .append('circle')
          .attr('class', 'marker')
          .attr('cx', d => {
            const coords = projection([d.lng, d.lat]);
            return coords ? coords[0] : 0;
          })
          .attr('cy', d => {
            const coords = projection([d.lng, d.lat]);
            return coords ? coords[1] : 0;
          })
          .attr('r', 8)
          .attr('fill', '#FFB347')
          .attr('stroke', '#F9F7F7')
          .attr('stroke-width', 2)
          .attr('cursor', 'pointer')
          .on('mouseenter', function(this: any, event: any, d: any) {
            setTooltip({
              name: d.name,
              city: d.city,
              details: d.details,
              x: event.clientX,
              y: event.clientY
            });
            d3.select(this)
              .attr('r', 12)
              .attr('fill', '#FFC370');
          })
          .on('mouseleave', function(this: any, event: any, d: any) {
            setTooltip(null);
            d3.select(this)
              .attr('r', 8)
              .attr('fill', '#FFB347');
          })
          .on('click', function(this: any, event: any, d: any) {
            setSelectedCountry(d.name);
            // Center map on clicked marker
            const coords = projection([d.lng, d.lat]);
            if (coords) {
              const newTransform = { x: width / 2 - coords[0], y: height / 2 - coords[1], k: 3 };
              svg.transition().duration(750).call(zoom.transform as any, d3.zoomIdentity
                .translate(newTransform.x, newTransform.y)
                .scale(newTransform.k));
            }
          });
        
        // Add pulsing effect circles
        g.selectAll('.pulse')
          .data(OFFICE_LOCATIONS)
          .enter()
          .append('circle')
          .attr('class', 'pulse')
          .attr('cx', d => {
            const coords = projection([d.lng, d.lat]);
            return coords ? coords[0] : 0;
          })
          .attr('cy', d => {
            const coords = projection([d.lng, d.lat]);
            return coords ? coords[1] : 0;
          })
          .attr('r', 8)
          .attr('fill', '#FFB347')
          .attr('fill-opacity', 0.4)
          .style('animation', 'pulse 1.5s ease-out infinite');
      })
      .catch(error => {
        console.error('Error loading map:', error);
      });
  }, [dimensions, selectedCountry]);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% {
            r: 8;
            opacity: 0.6;
          }
          100% {
            r: 25;
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div 
        ref={containerRef} 
        className="relative w-full bg-darkSerpent rounded-2xl overflow-hidden"
        style={{ height: '100%', minHeight: '550px' }}
      >
        {/* Zoom Controls */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              const svg = d3.select(svgRef.current);
              svg.transition().duration(300).call(zoomRef.current.scaleBy as any, 1.2);
            }}
            className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all duration-200 shadow-lg flex items-center justify-center text-xl font-bold z-30 border-white border-2"
          >
            +
          </button>
          <button
            onClick={() => {
              const svg = d3.select(svgRef.current);
              svg.transition().duration(300).call(zoomRef.current.scaleBy as any, 0.8);
            }}
            className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all duration-200 shadow-lg flex items-center justify-center text-xl font-bold z-30 border-white border-2"
          >
            -
          </button>
          <button
            onClick={() => {
              const svg = d3.select(svgRef.current);
              svg.transition().duration(500).call(zoomRef.current.transform as any, d3.zoomIdentity);
              setSelectedCountry(null);
            }}
            className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all duration-200 shadow-lg flex items-center justify-center text-sm font-semibold z-30 border-white border-2"
          >
            ↺
          </button>
        </div>
        
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* Interactive Tooltip */}
        {tooltip && (
          <div 
            className="fixed bg-castletonGreen text-seaSalt rounded-lg shadow-xl z-50"
            style={{
              left: tooltip.x + 15,
              top: tooltip.y - 60,
              minWidth: '200px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div className="p-3 border-b border-saffaron/30">
              <div className="font-semibold text-sm flex items-center gap-2">
                <span>📍</span>
                <span>{tooltip.name}</span>
              </div>
              <div className="text-xs text-saffaron mt-1">{tooltip.city}</div>
            </div>
            <div className="p-3 text-xs">
              {tooltip.details}
            </div>
          </div>
        )}
        
        {/* Interactive Legend */}
        <div className="absolute bottom-4 right-4 bg-darkSerpent/95 backdrop-blur-sm rounded-lg p-3 text-xs z-20 border border-saffaron/30 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-saffaron animate-pulse"></div>
            <span className="text-seaSalt">Active Offices (20)</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-saffaron"></div>
            <span className="text-seaSalt">Office Locations</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-earthYellow"></div>
            <span className="text-seaSalt">Hover/Selected</span>
          </div>
          <div className="mt-2 pt-2 border-t border-saffaron/30">
            <div className="text-seaSalt/60 text-xs flex items-center gap-2">
              <span>🖱️</span> Click to zoom
              <span>🔍</span> Scroll to zoom
              <span>✋</span> Drag to pan
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-darkSerpent/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs z-20 border border-saffaron/30">
          <span className="text-seaSalt">💡 Tip: Click on any country or marker to zoom in</span>
        </div>
      </div>
    </>
  );
});

OperationsMap.displayName = 'OperationsMap';

export default OperationsMap;