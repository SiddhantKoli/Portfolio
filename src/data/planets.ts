export interface PlanetData {
    id: string;
    name: string;
    color: string;
    size: number;
    distance: number;
    speed: number;
    description: string;
}

export const PLANETS: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        color: '#A5A5A5',
        size: 0.8,
        distance: 15,
        speed: 0.04,
        description: 'The smallest and innermost planet in the Solar System.'
    },
    {
        id: 'venus',
        name: 'Venus',
        color: '#E3BB76',
        size: 1.2,
        distance: 25,
        speed: 0.015,
        description: 'The second planet from the Sun, often called Earth\'s sister planet.'
    },
    {
        id: 'earth',
        name: 'Earth',
        color: '#2233FF',
        size: 1.3,
        distance: 35,
        speed: 0.01,
        description: 'Our home planet, the only known celestial object to harbor life.'
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#FF5733',
        size: 1,
        distance: 45,
        speed: 0.008,
        description: 'The Red Planet, home to Olympus Mons, the largest volcano in the solar system.'
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#FFA500',
        size: 3,
        distance: 65,
        speed: 0.002,
        description: 'The largest planet in the Solar System, an enormous gas giant.'
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#F4C430',
        size: 2.5,
        distance: 85,
        speed: 0.0009,
        description: 'Known for its prominent and spectacular ring system.'
    }
];
