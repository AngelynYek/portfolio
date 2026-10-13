// Personalize this file, then replace the sample resume with your own PDF.
export const portfolio = {
  bio: {
    heading: 'A curious mind. A maker at heart.',
    paragraphs: [
      'This is where your story goes. Share what you love creating, what sparked your interest, and the kind of work you want to put into the world.',
      'Outside of projects, add a few things that feel like you: a favorite hobby, a small everyday joy, or whatever keeps you inspired.',
    ],
    tags: ['Your role here', 'Your location here', 'A little fun fact'],
  },
  resume: {
    url: './assets/resume-template.txt',
    note: 'Sample resume template — replace with your own PDF.',
  },
  skills: [
    { title: 'Development', subtitle: 'BRINGING IDEAS TO LIFE', icon: '</>', color: 'blue', items: ['HTML & CSS', 'JavaScript', 'React', 'Git & GitHub'] },
    { title: 'Design', subtitle: 'MAKING THE DETAILS COUNT', icon: '✳', color: 'pink', items: ['Figma', 'UI design', 'Responsive layouts', 'Prototyping'] },
    { title: 'The human side', subtitle: 'HOW I APPROACH THE WORK', icon: '♡', color: 'yellow', items: ['Problem solving', 'Collaboration', 'Attention to detail', 'Curiosity'] },
  ],
  projects: [
    { id: 'bloom', title: 'Bloom & Grow', category: 'WEBSITE CONCEPT', description: 'A gentle little home for all things green.', tags: ['Web design', 'Frontend'], color: 'green', preview: 'plant', details: 'An illustrative plant-shop concept with a calm editorial layout, product storytelling, and soft botanical details. Replace this example with your project: explain the problem, your role, what you built, and what you learned.', url: null },
    { id: 'daylight', title: 'A Little Daylight', category: 'APP CONCEPT', description: 'Making room for the small, good things.', tags: ['UI / UX', 'Product design'], color: 'blue', preview: 'journal', details: 'An illustrative daily-journal concept focused on approachable prompts and a simple writing experience. Add your own case study here, including the decisions you made and the outcome of your work.', url: null },
    { id: 'portfolio', title: 'This Little Portfolio', category: 'PERSONAL WEBSITE', description: 'A digital filing cabinet, with a personal touch.', tags: ['HTML & CSS', 'JavaScript'], color: 'pink', preview: 'portfolio', details: 'A responsive portfolio inspired by paper folders and a soft pastel palette. Built with semantic HTML, shared CSS design tokens, and a single editable content file. Features accessible folder navigation, reduced-motion support, and project details in native dialogs.', url: '#home' },
  ],
  learning: [
    { title: 'Thoughtful interactions', description: 'Small details that make interfaces feel natural.', status: 'EXPLORING' },
    { title: 'Accessible by design', description: 'Making the web a welcoming place for everyone.', status: 'IN PROGRESS' },
    { title: 'Better, cleaner code', description: 'Building good habits, one project at a time.', status: 'ALWAYS' },
  ],
  // Set real values to activate contact links; null values never send visitors to fake accounts.
  contact: { email: null, github: null, linkedin: null },
};

export const folders = [
  { id: 'about', name: 'About me', number: '01', note: 'the person behind it all', color: 'green', icon: '☺' },
  { id: 'skills', name: 'Skills', number: '02', note: 'a few things in my toolbox', color: 'blue', icon: '✳' },
  { id: 'projects', name: 'Projects', number: '03', note: 'ideas, brought to life', color: 'pink', icon: '↗' },
  { id: 'learning', name: 'Currently learning', number: '04', note: 'forever a work in progress', color: 'yellow', icon: '✎' },
  { id: 'contact', name: 'Contact', number: '05', note: 'a hello could be a start', color: 'green', icon: '♡' },
];
