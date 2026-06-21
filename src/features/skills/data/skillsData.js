import { SiFlutter, SiDart, SiFirebase, SiGithub } from 'react-icons/si';
import { Layers, Cpu, Box, Code, Brain, Bell, MapPin, Send } from 'lucide-react';

export const skillCategories = [
  {
    id: 'core',
    label: 'Core Stack',
    color: '#7F77DD',
    glow: 'rgba(127,119,221,0.5)',
    radiusX: 290,
    radiusY: 74,
    tilt: 0,
    speed: 0.35,
    skills: [
      { name: 'Flutter',  Icon: SiFlutter },
      { name: 'Dart',     Icon: SiDart },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'Hive DB',  Icon: Box },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    color: '#5DCAA5',
    glow: 'rgba(93,202,165,0.5)',
    radiusX: 210,
    radiusY: 52,
    tilt: 8,
    speed: -0.45,
    skills: [
      { name: 'BLoC Pattern', Icon: Cpu },
      { name: 'Clean Arch.',  Icon: Layers },
      { name: 'FCM Push',     Icon: Send },
      { name: 'AI Tools',     Icon: Brain },
    ],
  },
  {
    id: 'integration',
    label: 'Integration',
    color: '#F0997B',
    glow: 'rgba(240,153,123,0.5)',
    radiusX: 130,
    radiusY: 32,
    tilt: -6,
    speed: 0.6,
    skills: [
      { name: 'REST APIs',    Icon: Code },
      { name: 'Google Maps',  Icon: MapPin },
      { name: 'Git & GitHub', Icon: SiGithub },
      { name: 'Local Alerts', Icon: Bell },
    ],
  },
];
