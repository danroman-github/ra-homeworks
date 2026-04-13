import React, { Component } from 'react';
import { Toolbar } from './Toolbar';
import { ProjectList } from './ProjectList';

const projects = [
    { img: "src/img/mon.jpg", category: "Business Cards" },
    { img: "src/img/200.jpg", category: "Websites" },
    { img: "src/img/emi_haze.jpg", category: "Websites" },
    { img: "src/img/codystretch.jpg", category: "Websites" },
    { img: "src/img/Triangle_003.jpg", category: "Business Cards" },
    { img: "src/img/place200x290.png", category: "Websites" },
    { img: "src/img/200.jpg", category: "Websites" },
    { img: "src/img/transmission.jpg", category: "Business Cards" },
    { img: "src/img/place200x290_1.png", category: "Websites" },
    { img: "src/img/place200x290_2.png", category: "Flayers" },
    { img: "src/img/the_ninetys_brand.jpg", category: "Websites" },
    { img: "src/img/dia.jpg", category: "Business Cards" },
    { img: "src/img/Triangle_350x197.jpg", category: "Websites" },
    { img: "src/img/emi_haze.jpg", category: "Websites" },
    { img: "src/img/transmission.jpg", category: "Business Cards" },
    { img: "src/img/Triangle_350x197_1.jpg", category: "Websites" },
    { img: "src/img/place200x290_3.png", category: "Flayers" }
];

const getUniqueCategories = () => {
    return ["All", "Websites", "Flayers", "Business Cards"];
};

export class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: 'All'
        };
    }

    handleFilterSelect = (filter) => {
        this.setState({ selectedFilter: filter });
    };

    getFilteredProjects = () => {
        if (this.state.selectedFilter === 'All') {
            return projects;
        }
        return projects.filter(project => project.category === this.state.selectedFilter);
    };

    render() {
        const filters = getUniqueCategories();
        const filteredProjects = this.getFilteredProjects();

        return (
            <div className="portfolio">
                <Toolbar
                    filters={filters}
                    selected={this.state.selectedFilter}
                    onSelectFilter={this.handleFilterSelect}
                />
                <ProjectList projects={filteredProjects} />
            </div>
        );
    }
}
