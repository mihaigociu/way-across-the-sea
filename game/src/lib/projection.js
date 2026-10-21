// Shared map projection, used both by the base-map build script and in the browser,
// so that cities, routes and coastlines line up exactly.
import { geoConicConformal } from 'd3-geo';

export const WIDTH = 1600;
export const HEIGHT = 1000;

// Mediterranean world, from the Atlantic to Mesopotamia, from Britain to Egypt.
const FRAME = {
  type: 'MultiPoint',
  coordinates: [[-10, 30], [46.5, 30], [-10, 52.5], [46.5, 52.5], [18, 25.8]],
};

export const projection = geoConicConformal()
  .rotate([-19, 0])
  .parallels([30, 46])
  .fitExtent([[0, 0], [WIDTH, HEIGHT]], FRAME)
  .clipExtent([[-2, -2], [WIDTH + 2, HEIGHT + 2]])
  .precision(0.2);

/** [lon, lat] -> [x, y] in map pixels */
export const project = (lonlat) => projection(lonlat);
