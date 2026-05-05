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
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<any>(null);
  const projectionRef = useRef<any>(null);
  const gRef = useRef<any>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const [tooltip, setTooltip] = useState<{ name: string; city: string; details: string; x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const selectedCountryRef = useRef<string | null>(null);

  const zoomToCoords = (lng: number, lat: number, scale = 3) => {
    if (!svgRef.current || !zoomRef.current || !projectionRef.current) return;
    const width = widthRef.current;
    const height = heightRef.current;
    const coords = projectionRef.current([lng, lat]);
    if (!coords) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(
      zoomRef.current.transform,
      d3.zoomIdentity
        .translate(width / 2 - coords[0] * scale, height / 2 - coords[1] * scale)
        .scale(scale)
    );
  };

  const highlightCountry = (officeName: string | null) => {
    if (!svgRef.current) return;
    selectedCountryRef.current = officeName;
    d3.select(svgRef.current).selectAll<SVGPathElement, any>('path').attr('fill', (d) => {
      const name = d?.properties?.name || '';
      const matched = officeName && OFFICE_LOCATIONS.some(o =>
        o.name === officeName && (
          name.toLowerCase().includes(o.name.toLowerCase()) ||
          o.name.toLowerCase().includes(name.toLowerCase())
        )
      );
      return matched ? '#FFB347' : '#046241';
    });
  };

  useImperativeHandle(ref, () => ({
    zoomToCountry: (_name: string, lng: number, lat: number) => {
      highlightCountry(_name);
      zoomToCoords(lng, lat, 3);
    }
  }));

  // Zoom to external selection
  useEffect(() => {
    if (!externalSelectedCountry) return;
    const office = OFFICE_LOCATIONS.find(o => o.name === externalSelectedCountry);
    if (office) {
      highlightCountry(externalSelectedCountry);
      zoomToCoords(office.lng, office.lat, 3);
    }
  }, [externalSelectedCountry]);

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Build map once when dimensions are ready
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const { width, height } = dimensions;
    widthRef.current = width;
    heightRef.current = height;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background', '#133020')
      .style('cursor', 'grab');

    svg.selectAll('*').remove();

    const g = svg.append('g');
    gRef.current = g;

    const projection = d3.geoMercator()
      .scale(width / 4.2)
      .center([20, 5])
      .translate([width / 2, height / 2]);
    projectionRef.current = projection;

    const geoPath = d3.geoPath().projection(projection);

    // Zoom — just transform the group, no path recalculation
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);
    zoomRef.current = zoom;

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json')
      .then(r => r.json())
      .then(world => {
        const countries = topojson.feature(world, world.objects.countries) as any;

        g.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', (d: any) => geoPath(d))
          .attr('fill', '#046241')
          .attr('stroke', (d: any) => {
            const name = d.properties?.name || '';
            const hasOffice = OFFICE_LOCATIONS.some(o =>
              name.toLowerCase().includes(o.name.toLowerCase()) ||
              o.name.toLowerCase().includes(name.toLowerCase())
            );
            return hasOffice ? '#FFC370' : '#FFB347';
          })
          .attr('stroke-width', (d: any) => {
            const name = d.properties?.name || '';
            return OFFICE_LOCATIONS.some(o =>
              name.toLowerCase().includes(o.name.toLowerCase()) ||
              o.name.toLowerCase().includes(name.toLowerCase())
            ) ? 1.5 : 0.5;
          })
          .attr('stroke-opacity', 0.7)
          .attr('cursor', 'pointer')
          .on('mouseenter', function(this: any, _e: any, d: any) {
            const name = d.properties?.name || '';
            const hasOffice = OFFICE_LOCATIONS.some(o =>
              name.toLowerCase().includes(o.name.toLowerCase()) ||
              o.name.toLowerCase().includes(name.toLowerCase())
            );
            d3.select(this).attr('fill', hasOffice ? '#FFC370' : '#0a5a3a');
          })
          .on('mouseleave', function(this: any) {
            d3.select(this).attr('fill', '#046241');
          })
          .on('click', (_e: any, d: any) => {
            const name = d.properties?.name || '';
            const office = OFFICE_LOCATIONS.find(o =>
              name.toLowerCase().includes(o.name.toLowerCase()) ||
              o.name.toLowerCase().includes(name.toLowerCase())
            );
            if (office) {
              highlightCountry(office.name);
              zoomToCoords(office.lng, office.lat, 2);
            }
          });

        // Pulse rings
        g.selectAll('.pulse')
          .data(OFFICE_LOCATIONS)
          .enter()
          .append('circle')
          .attr('class', 'pulse')
          .attr('cx', d => projection([d.lng, d.lat])![0])
          .attr('cy', d => projection([d.lng, d.lat])![1])
          .attr('r', 8)
          .attr('fill', '#FFB347')
          .attr('fill-opacity', 0.35)
          .style('animation', 'mapPulse 2s ease-out infinite');

        // Markers
        g.selectAll('.marker')
          .data(OFFICE_LOCATIONS)
          .enter()
          .append('circle')
          .attr('class', 'marker')
          .attr('cx', d => projection([d.lng, d.lat])![0])
          .attr('cy', d => projection([d.lng, d.lat])![1])
          .attr('r', 6)
          .attr('fill', '#FFB347')
          .attr('stroke', '#F9F7F7')
          .attr('stroke-width', 1.5)
          .attr('cursor', 'pointer')
          .on('mouseenter', function(this: any, event: any, d: any) {
            setTooltip({ name: d.name, city: d.city, details: d.details, x: event.clientX, y: event.clientY });
            d3.select(this).attr('r', 9).attr('fill', '#FFC370');
          })
          .on('mouseleave', function(this: any) {
            setTooltip(null);
            d3.select(this).attr('r', 6).attr('fill', '#FFB347');
          })
          .on('click', (_e: any, d: any) => {
            highlightCountry(d.name);
            zoomToCoords(d.lng, d.lat, 3);
          });
      });
  }, [dimensions]);

  return (
    <>
      <style>{`
        @keyframes mapPulse {
          0% { r: 6; opacity: 0.5; }
          100% { r: 22; opacity: 0; }
        }
      `}</style>
      <div ref={containerRef} className="relative w-full bg-darkSerpent rounded-2xl overflow-hidden" style={{ height: '100%', minHeight: '550px' }}>
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <button onClick={() => d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.3)} className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all shadow-lg flex items-center justify-center text-xl font-bold border-white border-2 cursor-pointer">+</button>
          <button onClick={() => d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 0.77)} className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all shadow-lg flex items-center justify-center text-xl font-bold border-white border-2 cursor-pointer">-</button>
          <button onClick={() => d3.select(svgRef.current).transition().duration(500).call(zoomRef.current.transform, d3.zoomIdentity)} className="w-10 h-10 bg-castletonGreen text-white rounded-lg hover:bg-saffaron transition-all shadow-lg flex items-center justify-center text-sm font-semibold border-white border-2 cursor-pointer">↺</button>
        </div>

        <svg ref={svgRef} className="w-full h-full" />

        {tooltip && (
          <div className="fixed bg-castletonGreen text-seaSalt rounded-lg shadow-xl z-50 pointer-events-none" style={{ left: tooltip.x + 15, top: tooltip.y - 60, minWidth: '200px' }}>
            <div className="p-3 border-b border-saffaron/30">
              <div className="font-semibold text-sm flex items-center gap-2"><span>📍</span><span>{tooltip.name}</span></div>
              <div className="text-xs text-saffaron mt-1">{tooltip.city}</div>
            </div>
            <div className="p-3 text-xs">{tooltip.details}</div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-darkSerpent/95 backdrop-blur-sm rounded-lg p-3 text-xs z-20 border border-saffaron/30 shadow-lg">
          <div className="flex items-center gap-3 mb-2"><div className="w-3 h-3 rounded-full bg-saffaron animate-pulse" /><span className="text-seaSalt">Active Offices (20)</span></div>
          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-white border-2 border-saffaron" /><span className="text-seaSalt">Office Locations</span></div>
        </div>

        <div className="absolute bottom-4 left-4 bg-darkSerpent/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs z-20 border border-saffaron/30">
          <span className="text-seaSalt">💡 Click a marker to zoom in</span>
        </div>
      </div>
    </>
  );
});

OperationsMap.displayName = 'OperationsMap';
export default OperationsMap;
