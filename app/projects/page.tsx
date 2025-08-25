'use client';

const projects = [
  {
    id: 0,
    date: { start: '2022', end: '2025' },
    title: 'ChikRice',
    link: 'https://chikrice.khaled-javdan.com/',
    desc: 'Fitness-focused meal planning web app evolution:<br/> <div class="mt-1">• <a href="https://ironbrothers.netlify.app/" target="_blank" class="font-bold text-primary hover:underline">ChikRice v1</a> (2022) - Didn\'t know how but I started</div>• <a href="https://chikrice-v2.netlify.app/meal-plan-generator" target="_blank" class="font-bold text-primary hover:underline">ChikRice v2</a> (2023) - First attempt to make it work<br/>• <a href="https://chikrice.netlify.app/#/meal-plan-generator" target="_blank" class="font-bold text-primary hover:underline">ChikRice v3</a> (2024) - Started to serve some of my friends<br/>• <a href="https://chikrice.khaled-javdan.com/" target="_blank" class="font-bold text-primary hover:underline">ChikRice v4</a> (2025) - Current version, built with MERN',
  },
  {
    id: 1,
    date: { start: '2022', end: '2023' },
    title: 'JoJoShop',
    link: 'https://shop.khaled-javdan.com/',
    desc: 'An ecommerce website to learn MERN stack',
  },
  {
    id: 2,
    date: { start: '2021', end: '2022' },
    title: 'First Portfolio',
    link: 'https://khaled-javedan-portfolio.netlify.app/projects',
    desc: 'Bunch of websites to learn HTML, CSS, JavaScript, and React.',
  },
];

export default function Projects() {
  // All projects are always expanded - no toggling needed
  const activeAccordion = new Set([0, 1, 2]);

  return (
    <div className="h-full overflow-y-scroll p-4 font-mono lg:px-0">
      <h2 className="mt-4 max-w-150">
        Selected projects showcasing my journey.
      </h2>

      <ol className="mt-8 flex flex-col gap-6">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col items-start lg:flex-row"
          >
            <div className="text-muted-foreground/50 w-50">
              {project.date.start} - {project.date.end}
            </div>
            <div className="max-w-130">
              <p className="cursor-pointer text-sm hover:underline">
                <a
                  href={project.link}
                  target="_blank"
                  className="text-primary font-bold hover:underline"
                >
                  {project.title}
                </a>
              </p>
              {activeAccordion.has(project.id) && (
                <p
                  className="text-muted-foreground mt-1 text-xs leading-5"
                  dangerouslySetInnerHTML={{ __html: project.desc }}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
