import { AnimatePresence, motion } from 'framer-motion';

const suggestedActions = [
  {
    title: 'What are your skills?',
    action: 'List your main technical and professional skills.',
  },
  {
    title: 'Have you worked with React.js?',
    action: 'Tell me about the projects you have worked on.',
  },
  {
    title: 'What are you looking for?',
    action: 'Share what drives you in your career and projects.',
  },
  {
    title: 'Why should we hire you?',
    action: 'Summarize why you would be a great addition to a team or company.',
  },
];

export default function Suggestion({
  onSelect,
}: {
  onSelect: (suggestion: string) => void;
}) {
  return (
    <AnimatePresence>
      <div className="mt-10">
        {suggestedActions.map((action, index) => (
          <motion.button
            key={index}
            className="bg-background hover:bg-muted focus:bg-muted w-full cursor-pointer border-b p-3 pl-1 text-left font-sans text-sm"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            initial={{ opacity: 0, y: index * 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: index * 5 }}
            onClick={() => onSelect(action.title)}
          >
            {action.title}
          </motion.button>
        ))}
      </div>
    </AnimatePresence>
  );
}
