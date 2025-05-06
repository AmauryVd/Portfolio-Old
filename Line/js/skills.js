// Animate skill bars when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill');

    const animateSkillBars = () => {
        skills.forEach(skill => {
            const skillLevel = skill.querySelector('.skill-level');
            const level = skill.getAttribute('data-level');

            if (!skill.classList.contains('animated')) {
                const rect = skill.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

                if (isVisible) {
                    skillLevel.style.width = level + '%';
                    skill.classList.add('animated');
                }
            }
        });
    };

    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target;
                    const skillLevel = skill.querySelector('.skill-level');
                    const level = skill.getAttribute('data-level');

                    if (!skill.classList.contains('animated')) {
                        skillLevel.style.width = level + '%';
                        skill.classList.add('animated');
                    }
                }
            });
        }, { threshold: 0.1 });

        skills.forEach(skill => {
            observer.observe(skill);
        });
    }
});