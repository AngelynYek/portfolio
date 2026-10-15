// Edit personal content here. Pokémon positions use the 320 × 280 scene grid.
export const portfolio = {
  name: 'Angelyn Yek',
  about: ['Welcome to my little corner of the world. I’m Angelyn Yek.', 'My story is coming soon. In the meantime, take a look around!'],
  skills: [{ title: 'Programming Languages & Frameworks', items: ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'Scala', 'React'] }, 
           { title: 'Version Control & Deployment', items: ['Git', 'Github', 'Vercel'] },
           { title: 'Database Management', items: ['SQL', 'Oracle Database', 'Oracle APEX'] },
           { title: 'Productivity Tools', items: ['Microsoft 365 (Word, Excel, Powerpoint)'] },
          ],

  projects: [], // { title: 'My project', description: 'What I built and why.', url: 'https://...' }
  learning: [], // { title: 'A new skill', description: 'What I am exploring.' }
  achievements: [], // { title: 'Award or milestone', description: 'Details about the achievement.', url: 'https://...' }
  contact: { email: null, github: null, linkedin: null },
  resume: { url: './assets/AngelynYek_Internship_Resume.pdf', isSample: false },
};
export const pokemon = [
  { id: 'about', label: 'About', name: 'Sylveon', file: 'sylveon', x: 178, y: 227, width: 36, size: [96,96], bounds: [17,25,70,84] },
  { id: 'skills', label: 'Skills', name: 'Meowstic', file: 'meowstic', x: 86, y: 219, width: 32, size: [80,80], bounds: [13,14,65,80] },
  { id: 'projects', label: 'Projects', name: 'Hisuian Zoroark', file: 'zoroark', x: 126, y: 177, width: 49, size: [116,96], bounds: [21,2,114,93] },
  { id: 'learning', label: 'Currently Learning', name: 'Noivern', file: 'noivern', x: 62, y: 121, width: 66, size: [182,182], bounds: [14,35,168,181] },
  { id: 'contact', label: 'Contact', name: 'Absol', file: 'absol', x: 264, y: 186, width: 42, size: [67,68], bounds: [2,2,67,66] },
  { id: 'achievements', label: 'Achievements', name: 'Talonflame', file: 'talonflame', x: 234, y: 88, width: 53, size: [125,108], bounds: [2,3,116,103] },
];
export const credits = [
'Pokémon belongs to Nintendo, Game Freak, and Creatures. This is an independent personal portfolio.',
];
