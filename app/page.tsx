'use client';

import { useState } from 'react';

const experiences = [
  {
    id: 0,
    date: { start: '2024', end: '2025' },
    title: 'Freelance, Dubai',
    desc: 'Founded <a href="https://chikrice.khaled-javdan.com" target="_blank" class="font-bold text-primary hover:underline">ChikRice</a>, a fitness-focused web app. Worked on multiple freelance web projects—designing and building modern websites and web apps for clients. <a href="https://services.khaled-javdan.com" target="_blank" class="font-bold text-primary hover:underline">View my services</a>',
  },
  {
    id: 1,
    date: { start: '2023', end: '2024' },
    title: 'Frontend dev at Utopia, Dubai',
    desc: 'Led frontend on a high-traffic (100K+ visitors) Live streaming web-app. Shipped real-time features, a custom CMS, and full e-commerce using Vue, and Node.js.',
  },
  {
    id: 2,
    date: { start: '2022', end: '2023' },
    title: 'Frontend dev at CEIT, Dubai',
    desc: 'Delivered 4 web-games + platform hub solo. Used React, Three.js, and WebGL to build immersive, production web apps.',
  },
  {
    id: 3,
    date: { start: '2017', end: '2021' },
    title: 'Collage: B.Sc. Software Engineering, Iran',
    desc: 'Graduated top of class(GPA 3.62). Built first full-stack e-commerce app using HTML, CSS, PHP, and MySQL.',
  },
  {
    id: 4,
    date: { start: '2016', end: '2017' },
    title: 'Dishwasher / Kitchen Support, Iran',
    desc: 'Supported kitchen operations by washing dishes, prepping ingredients, and helping prepare meals during busy shifts. Gained hands-on experience in teamwork, time management, and working under pressure.',
  },
];
export default function Home() {
  const [activeAccordian, setActiveAccrodian] = useState(new Set());

  const handleToggle = (id: number) => {
    setActiveAccrodian((prevIds) => {
      const newIds = new Set(prevIds);
      // eslint-disable-next-line
      newIds.has(id) ? newIds.delete(id) : newIds.add(id);
      return newIds;
    });
  };

  return (
    <div className="h-full overflow-y-scroll p-4 font-mono lg:px-0">
      <h2 className="mt-4 max-w-150">
        Frontend focoused engineer in Dubai, intrested in startups, design
        systems and ambitious ideas.
      </h2>

      <ol className="mt-8 flex flex-col gap-4">
        {experiences.map((experience) => (
          <li
            key={experience.id}
            className="flex flex-col items-start lg:flex-row"
            onClick={() => handleToggle(experience.id)}
          >
            <div className="text-muted-foreground/50 w-50">
              {experience.date.start} - {experience.date.end}
            </div>
            <div className="max-w-130">
              <p className="cursor-pointer text-sm hover:underline">
                {experience.title}
              </p>
              {activeAccordian.has(experience.id) && (
                <p
                  className="text-muted-foreground mt-1 text-xs leading-5"
                  dangerouslySetInnerHTML={{ __html: experience.desc }}
                />
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-26 text-sm">Get in touch</p>

      <ul className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        <li className="hover:underline">
          <a href="https://github.com/kjavedan" target="_blank">
            GitHub
          </a>
        </li>
        <li className="hover:underline">
          <a href="https://www.linkedin.com/in/khaled-javdan/" target="_blank">
            Linkedin
          </a>
        </li>
        <li className="text-muted-foreground">devkhaledjavdan@gmail.com</li>
      </ul>
    </div>
  );
}
