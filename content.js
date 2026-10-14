// Edit personal content here. Pokémon positions use the 320 × 280 scene grid.
export const portfolio = {
  name: 'Angelyn Yek',
  about: ['Welcome to my little corner of the world. I’m Angelyn Yek.', 'My story is coming soon. In the meantime, take a look around!'],
  skills: [], // { title: 'Development', items: ['JavaScript', 'React'] }
  projects: [], // { title: 'My project', description: 'What I built and why.', url: 'https://...' }
  learning: [], // { title: 'A new skill', description: 'What I am exploring.' }
  contact: { email: null, github: null, linkedin: null },
  // Add assets/resume.pdf, update url, and set isSample to false.
  resume: { url: './assets/resume-template.txt', isSample: true },
};
export const pokemon = [
  { id: 'about', label: 'About', name: 'Sylveon', file: 'sylveon', x: 178, y: 227, width: 36, size: [96,96], bounds: [17,25,70,84] },
  { id: 'skills', label: 'Skills', name: 'Meowstic', file: 'meowstic', x: 86, y: 219, width: 32, size: [80,80], bounds: [13,14,65,80] },
  { id: 'projects', label: 'Projects', name: 'Hisuian Zoroark', file: 'zoroark', x: 126, y: 177, width: 49, size: [116,96], bounds: [21,2,114,93] },
  { id: 'learning', label: 'Currently Learning', name: 'Noivern', file: 'noivern', x: 62, y: 121, width: 66, size: [182,182], bounds: [14,35,168,181] },
  { id: 'contact', label: 'Contact', name: 'Absol', file: 'absol', x: 264, y: 186, width: 42, size: [67,68], bounds: [2,2,67,66] },
  { id: 'resume', label: 'Download Resume', name: 'Talonflame', file: 'talonflame', x: 234, y: 88, width: 53, size: [125,108], bounds: [2,3,116,103] },
];
export const credits = [
 'Noivern sprite: diegotoon20', 'Absol sprite: Superior-Absol',
 'Hisuian Zoroark sprite: Hellfire0Raptor', 'Meowstic sprite: SkidMarc25',
 'Sylveon sprite: Pompomking', 'Talonflame sprite: Snivy101',
 'PKMN Western font: nue-of-k (MIT license)',
 'Pokémon belongs to Nintendo, Game Freak, and Creatures. This is an independent personal portfolio.',
];
