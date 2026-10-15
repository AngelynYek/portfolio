import { portfolio, pokemon, credits } from './content.js';
import { drawIsland } from './scene.js';

drawIsland(document.querySelector('#island'));
const dialog = document.querySelector('#pokedex');
const content = document.querySelector('#entry-content');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionQuery.matches;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function resumeLink(className = 'pixel-button') {
  const link = element('a', portfolio.resume.isSample ? 'DOWNLOAD SAMPLE RESUME' : 'DOWNLOAD RESUME', className);
  link.href = portfolio.resume.url;
  link.download = '';
  return link;
}
function addParagraph(text, className) { content.append(element('p', text, className)); }
function addExternalLink(label, url) {
  // Only web URLs may become external project or profile links.
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return;
    const link = element('a', label);
    link.href = parsed.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
    content.append(link, document.createElement('br'));
  } catch { /* Unconfigured links stay inactive. */ }
}
function openEntry(id) {
  const entry = pokemon.find(item => item.id === id);
  document.querySelector('#entry-title').textContent = entry?.label ?? 'Credits';
  document.querySelector('#entry-number').textContent = entry ? `ENTRY ${String(pokemon.indexOf(entry) + 1).padStart(2, '0')} / ANGELYN YEK` : 'THE PEOPLE BEHIND THE PIXELS';
  content.replaceChildren();
  if (id === 'about') {
    portfolio.about.forEach(text => addParagraph(text));
    content.append(resumeLink());
    if (portfolio.resume.isSample) addParagraph('Sample file for now. My resume will be added soon.', 'status');
  } else if (id === 'skills') {
    if (!portfolio.skills.length) addParagraph('My skill collection is coming soon.');
    for (const group of portfolio.skills) {
      content.append(element('h3', group.title));
      const list = element('ul');
      group.items.forEach(skill => list.append(element('li', skill)));
      content.append(list);
    }
  } else if (id === 'projects' || id === 'learning' || id === 'achievements') {
    const emptyMessages = {
      projects: 'New adventures are in the making. My projects will appear here soon.',
      learning: 'Always a work in progress. I’ll share what I’m learning here soon.',
      achievements: 'My achievements and milestones will appear here soon.',
    };
    if (!portfolio[id].length) addParagraph(emptyMessages[id]);
    for (const item of portfolio[id]) {
      content.append(element('h3', item.title)); addParagraph(item.description);
      if (item.url) addExternalLink(id === 'projects' ? 'VIEW PROJECT >' : 'VIEW DETAILS >', item.url);
    }
  } else if (id === 'contact') {
    const {description, email, github, linkedin} = portfolio.contact;
    if (description) addParagraph(description);
    if (!email && !github && !linkedin) addParagraph('Contact details coming soon.', 'status');
    if (email) {
      const link = element('a', email); link.href = `mailto:${encodeURIComponent(email)}`; content.append(link, document.createElement('br'));
    }
    if (github) addExternalLink('GITHUB >', github);
    if (linkedin) addExternalLink('LINKEDIN >', linkedin);
  } else credits.forEach(text => addParagraph(text));
  dialog.showModal();
  content.scrollTop = 0;
  document.querySelector('#back-button').focus();
}

for (const entry of pokemon) {
  const button = element('button', null, 'pokemon');
  button.dataset.id = entry.id;
  button.setAttribute('aria-label', `${entry.label} — ${entry.name}`);
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => openEntry(entry.id));
  if (entry.x > 160) button.classList.add('right');
  const [left, top, right, bottom] = entry.bounds;
  const width = right - left, height = bottom - top;
  Object.assign(button.style, {left:`${entry.x / 320 * 100}%`,top:`${entry.y / 280 * 100}%`,width:`${entry.width / 320 * 100}%`,height:`${entry.width / width * height / 280 * 100}%`,zIndex:Math.round(entry.y)});
  // Crop transparent padding with a viewport, preserving the original animated GIF.
  button.replaceChildren();
  const art = element('span', null, 'sprite-art');
  art.append(element('span', null, 'sprite-shadow'));
  const crop = element('span', null, 'sprite-crop');
  const img = new Image(); img.alt = ''; img.src = `./assets/sprites/${entry.file}.gif`;
  const still = element('canvas'); still.width = entry.size[0]; still.height = entry.size[1];
  for (const node of [img, still]) Object.assign(node.style,{width:`${entry.size[0]/width*100}%`,height:`${entry.size[1]/height*100}%`,left:`${-left/width*100}%`,top:`${-top/height*100}%`});
  img.addEventListener('load', () => still.getContext('2d').drawImage(img,0,0), {once:true});
  crop.append(img,still); art.append(crop);
  const tooltip = element('span', entry.label, 'tooltip'); tooltip.setAttribute('aria-hidden','true');
  tooltip.append(element('small', entry.name));
  button.append(art,tooltip); document.querySelector('#pokemon').append(button);
}
function updateMotion() {
  document.body.classList.toggle('paused', paused);
  const toggle = document.querySelector('#motion-toggle');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.textContent = paused ? 'PLAY SPRITES' : 'PAUSE SPRITES';
}
updateMotion();
motionQuery.addEventListener('change', event => { paused=event.matches; updateMotion(); });
document.querySelector('#motion-toggle').addEventListener('click', () => { paused=!paused; updateMotion(); });
document.querySelector('#labels-toggle').addEventListener('click', event => {
  const shown=document.body.classList.toggle('labels-visible');
  event.currentTarget.setAttribute('aria-pressed', String(shown));
  event.currentTarget.textContent=shown ? 'HIDE LABELS' : 'SHOW LABELS';
});
document.querySelector('#back-button').addEventListener('click', () => dialog.close());
document.querySelector('#credits-button').addEventListener('click', () => openEntry('credits'));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
