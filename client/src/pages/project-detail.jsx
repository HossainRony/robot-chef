import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const [project, setProject] = useState({
        name: '',
        ingredients: '',
        cookingTime: '',
        feedsUpTo: ''
    });

    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                try {
                    const response = await fetch(`${apiUrl}/projects/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch project');
                    }
                    const data = await response.json();
                    setProject({
                        name: data.name,
                        ingredients: data.ingredients,
                        cookingTime: data.cookingTime,
                        feedsUpTo: data.feedsUpTo
                    });
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            };

            fetchProject();
        }
    }, [id, apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/projects/${id}` : `${apiUrl}/projects`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(project)
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            navigate('/projects');

        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">{id ? 'Update Recipe' : 'Create Recipe'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        value={project.ingredients}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cookingTime">Cooking Time</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cookingTime"
                        name="cookingTime"
                        value={project.cookingTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedsUpTo">Feeds up to</label>
                    <input
                        type="text"
                        className="form-control"
                        id="feedsUpTo"
                        name="feedsUpTo"
                        value={project.feedsUpTo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default ProjectDetails;
