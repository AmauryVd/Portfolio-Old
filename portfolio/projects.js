document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projects.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            if (category === 'all' || projectCategory === category) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    }

    // Initialiser l'affichage de tous les projets
    filterProjects('all');

    // Gérer les clics sur les boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Supprimer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            // Filtrer les projets
            filterProjects(button.getAttribute('data-category'));
        });
    });
});