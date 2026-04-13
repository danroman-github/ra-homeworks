import React from 'react';

export function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.map((project, index) => (
                <div key={index} className="project-card">
                    <img
                        src={project.img}
                        alt={project.title}
                        className="project-image"
                    />
                </div>
            ))}
        </div>
    );
}
