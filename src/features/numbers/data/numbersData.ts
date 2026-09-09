export interface NumberStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const stats: readonly NumberStat[] = [
  { value: 2,    suffix: '+', label: 'Years Experience',  description: 'Building Flutter apps with production-focused architecture' },
  { value: 7,    suffix: '+', label: 'Major Projects',    description: 'Across delivery, real estate, commerce, healthcare, learning, lifestyle, and media' },
  { value: 12,   suffix: '+', label: 'Core Skills',       description: 'Flutter, Dart, BLoC, Cubit, Firebase, Cloud APIs, REST, maps, audio, and localization' },
  { value: 2000, suffix: '+', label: 'Hours Coding',      description: 'Designing responsive UI, clean modules, and reliable app workflows' },
];
