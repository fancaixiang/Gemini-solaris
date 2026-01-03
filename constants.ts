import { PlanetData } from './types';

// Note: Sizes and Distances are scaled for educational visualization, not 1:1 astronomical accuracy.
export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    nameCN: "水星",
    color: "#A5A5A5",
    size: 0.8,
    distance: 10,
    speed: 4.1,
    description: "The smallest planet in the Solar System and the closest to the Sun."
  },
  {
    name: "Venus",
    nameCN: "金星",
    color: "#E3BB76",
    size: 1.5,
    distance: 15,
    speed: 1.6,
    description: "The second planet from the Sun. It is the hottest planet in the Solar System."
  },
  {
    name: "Earth",
    nameCN: "地球",
    color: "#22A6B3",
    size: 1.6,
    distance: 22,
    speed: 1,
    description: "Our home planet. The only known planet in the universe to harbor life."
  },
  {
    name: "Mars",
    nameCN: "火星",
    color: "#EB4D4B",
    size: 1.1,
    distance: 30,
    speed: 0.53,
    description: "The Red Planet. Dusty, cold, desert world with a very thin atmosphere."
  },
  {
    name: "Jupiter",
    nameCN: "木星",
    color: "#F9CA24",
    size: 4.5,
    distance: 45,
    speed: 0.08,
    description: "The largest planet in the Solar System. A gas giant with a Great Red Spot."
  },
  {
    name: "Saturn",
    nameCN: "土星",
    color: "#F0DFAF",
    size: 3.8,
    distance: 65,
    speed: 0.03,
    description: "Adorned with a dazzling, complex system of icy rings.",
    ring: {
      innerRadius: 4.5,
      outerRadius: 8,
      color: "#CDC1A5"
    }
  },
  {
    name: "Uranus",
    nameCN: "天王星",
    color: "#7DE3F4",
    size: 2.5,
    distance: 82,
    speed: 0.01,
    description: "An ice giant. It rotates at a nearly 90-degree angle from the plane of its orbit."
  },
  {
    name: "Neptune",
    nameCN: "海王星",
    color: "#30336B",
    size: 2.4,
    distance: 95,
    speed: 0.006,
    description: "The most distant major planet orbiting our Sun, dark, cold and whipped by supersonic winds."
  }
];

export const SUN_SIZE = 6;
export const SUN_COLOR = "#FDB813";