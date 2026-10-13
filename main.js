import { folders, portfolio } from './content.js';

// Content is authored locally; escape it so edits are always rendered as text.
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const tags = (items) => items.map((item) => `<span class="tag">${escape(item)}</span>`).join('');
const byId = (id) => document.getElementById(id);

byId('folder-navigation').innerHTML = folders.map((folder) => `
  <a class="folder ${folder.color}" href="#${folder.id}">
    <span class="folder-tab">${folder.name}</span>
    <span class="folder-body"><span class="folder-meta"><span>FILE / ${folder.number}</span><span aria-hidden="true">↗</span></span><span class="folder-icon" aria-hidden="true">${folder.icon}</span><span class="folder-name">${folder.name}</span><span class="folder-note">${folder.note}</span></span>
  </a>`).join('');

byId('bio-heading').textContent = portfolio.bio.heading;
byId('bio-copy').innerHTML = portfolio.bio.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('');
byId('personal-tags').innerHTML = tags(portfolio.bio.tags);
byId('resume-link').href = portfolio.resume.url;
byId('resume-note').textContent = portfolio.resume.note;

byId('skills-grid').innerHTML = portfolio.skills.map((skill, index) => `
  <article class="skill-card ${skill.color}"><div class="skill-card-top"><span aria-hidden="true">${escape(skill.icon)}</span><span>0${index + 1}</span></div><h3>${escape(skill.title)}</h3><span class="mini-label">${escape(skill.subtitle)}</span><ul>${skill.items.map((item) => `<li>${escape(item)}<span aria-hidden="true">↗</span></li>`).join('')}</ul></article>`).join('');

const previews = {
  plant: '<div class="mock-site plant-site"><div class="mock-nav"><b>bloom & grow.</b><span>ROOTED IN THE EVERYDAY ↗</span></div><div class="plant-body"><div><span class="mock-small">BRING THE OUTSIDE IN</span><strong>A little green.<br>A lot of good.</strong><span class="mock-pill">Find your plant ↗</span></div><svg viewBox="0 0 140 180" aria-hidden="true"><path d="M72 120V30M72 80Q31 89 26 40Q64 38 72 80M72 59Q105 65 119 20Q80 16 72 59M71 110Q116 111 115 73Q78 74 71 110" fill="#808A59" stroke="#485538" stroke-width="3"/><path d="m42 118 7 52h47l8-52Z" fill="#C89173"/><path d="M36 116h74v12H36Z" fill="#DCA285"/></svg></div></div>',
  journal: '<div class="journal-decoration" aria-hidden="true">✳</div><div class="mock-journal"><span class="mock-small">A LITTLE DAYLIGHT ☀</span><strong>Good things<br>take a little time.</strong><div class="journal-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div><div class="journal-prompt">One good thing about today…<span>Make a little room for gratitude.</span></div><span class="mock-pill">A moment for yourself ↗</span></div>',
  portfolio: '<div class="mock-site mini-portfolio"><div class="mock-nav"><b>ay✳</b><span>A LITTLE COLLECTION OF ME</span></div><span class="mock-small">HELLO THERE, I’M ANGELYN</span><strong>Portfolio.</strong><div class="mini-folders"><span></span><span></span><span></span><span></span></div></div>',
};
byId('project-list').innerHTML = portfolio.projects.map((project, index) => `
  <article class="project-card"><button class="project-preview ${project.color}" data-project="${escape(project.id)}" aria-label="Open ${escape(project.title)} project details"><span class="project-index">PROJECT / 0${index + 1}</span><div class="preview-art" aria-hidden="true">${previews[project.preview] || ''}</div><span class="preview-open" aria-hidden="true">↗</span></button><div class="project-info"><span class="mini-label">${escape(project.category)}</span><button class="project-title" data-project="${escape(project.id)}">${escape(project.title)} <span aria-hidden="true">↗</span></button><p>${escape(project.description)}</p><div class="tag-list">${tags(project.tags)}</div></div></article>`).join('');

byId('learning-list').innerHTML = portfolio.learning.map((item) => `<li><span class="learning-check" aria-hidden="true">↗</span><div><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><span class="learning-status">${escape(item.status)}</span></div></li>`).join('');

const contactLinks = [];
if (portfolio.contact.email) contactLinks.push(`<a class="button button-dark" href="mailto:${escape(portfolio.contact.email)}">Say hello <span aria-hidden="true">↗</span></a>`);
for (const [label, url] of [['GitHub', portfolio.contact.github], ['LinkedIn', portfolio.contact.linkedin]]) {
  if (url) contactLinks.push(`<a class="social-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`);
}
byId('contact-actions').innerHTML = contactLinks.length ? contactLinks.join('') : '<span class="contact-placeholder">Your next hello goes here <span aria-hidden="true">↗</span></span>';
byId('contact-note').textContent = portfolio.contact.email ? '' : 'Contact details coming soon.';
byId('year').textContent = `© ${new Date().getFullYear()}`;

const dialog = byId('project-dialog');
document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = portfolio.projects.find((item) => item.id === button.dataset.project);
    if (!project) return;
    byId('dialog-title').textContent = project.title;
    byId('dialog-type').textContent = project.category;
    byId('dialog-description').textContent = project.details;
    byId('dialog-tags').innerHTML = tags(project.tags);
    const link = byId('dialog-link');
    link.hidden = !project.url;
    if (project.url) {
      link.href = project.url;
      link.target = project.url.startsWith('#') ? '_self' : '_blank';
    } else link.removeAttribute('href');
    byId('dialog-note').textContent = project.url ? '' : 'Illustrative concept — a live project link has not been added yet.';
    dialog.showModal();
  });
});
byId('close-dialog').addEventListener('click', () => dialog.close());
byId('dialog-link').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
} });
