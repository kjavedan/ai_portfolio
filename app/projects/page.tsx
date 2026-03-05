'use client';

const projects = [
  {
    id: 0,
    title: 'Resume Maker',
    link: 'https://resume-maker.khaled-javdan.com/',
    desc: 'AI Resume creator/editor',
  },
  {
    id: 1,
    title: 'Cofound',
    link: 'https://cofound.com/',
    desc: 'Ventur Capital Cofounder Help',
  },
  {
    id: 2,
    title: 'ChikRice',
    link: 'https://chikrice.khaled-javdan.com/',
    desc: 'Fitness-focused meal planning web app evolution',
  },
  {
    id: 3,
    title: 'JoJoShop',
    link: 'https://shop.khaled-javdan.com/',
    desc: 'An ecommerce website to learn MERN stack',
  },
  {
    id: 4,
    title: 'First Portfolio',
    link: 'https://khaled-javedan-portfolio.netlify.app/projects',
    desc: 'Bunch of websites to learn HTML, CSS, JavaScript, and React.',
  },
];

export default function Projects() {
  return (
    <div className="h-full overflow-y-scroll p-4 font-mono lg:pt-0 lg:pl-0">
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border hover:border-primary hover:bg-muted/50 flex aspect-square w-full flex-col justify-between rounded-none border p-4 transition-colors"
          >
            <div>
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {project.desc}
              </p>
            </div>
            <div className="text-muted-foreground text-right text-xs">↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}
