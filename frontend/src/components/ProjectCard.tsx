// /src/components/ProjectCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects-data';

interface ProjectCardProps {
  project: Project;
}

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
    >
      <Link href={project.liveUrl || project.githubUrl || "#"} target="_blank" className="group block">
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-background-subtle transition-all duration-300 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-48 object-cover"
          />
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-text-heading">{project.title}</h3>
            <p className="mt-3 flex-1 text-text-body">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-border-subtle px-3 py-1 text-xs text-text-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};