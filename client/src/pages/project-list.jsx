import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/projects`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [apiUrl]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            setProjects(projects.filter(project => project._id !== id));

        } catch (error) {
            console.error("Error deleting project", error);
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">Recipes</h1>

            <button className="btn btn-primary mb-3" onClick={() => navigate('/project-details')}>
                Create New Recipe
            </button>

            {projects.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ingredients</th>
                            <th>Cooking Time</th>
                            <th>Feeds up to</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.name}</td>
                                <td>{project.ingredients}</td>
                                <td>{project.cookingTime}</td>
                                <td>{project.feedsUpTo}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary mr-2"
                                        onClick={() => navigate(`/project-details/${project._id}`)}
                                    >
                                        Update
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No recipes available.</p>
            )}
        </div>
    );
}

export default ProjectList;
