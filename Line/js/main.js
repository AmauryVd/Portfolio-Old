// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add active class to current page link
const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Load RSS feed content (for index page)
if (document.getElementById('rss-feed-content')) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('rss.php')
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                let html = '';
                items.forEach(el => {
                    html += `
                        <div class="rss-item" data-load>
                            <h3>${el.querySelector("title").textContent}</h3>
                            <p class="date">${el.querySelector("pubDate").textContent}</p>
                            <p>${el.querySelector("description").textContent}</p>
                        </div>
                    `;
                });
                document.getElementById('rss-feed-content').innerHTML = html;
                animateElements();
            })
            .catch(error => {
                console.error('Error loading RSS feed:', error);
                document.getElementById('rss-feed-content').innerHTML =
                    '<p>Could not load updates. Please check back later.</p>';
            });
    });
}

// Certificate modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('caption');
        const closeModal = document.querySelector('.close-modal');

        // Get all certificate buttons and attach click handlers
        document.querySelectorAll('.view-certificate').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                // Set the image source and title
                modalImg.src = this.dataset.certificateUrl;
                modalImg.alt = this.dataset.certificateTitle;
                captionText.innerHTML = this.dataset.certificateTitle;

                // Show the modal with transition
                modal.style.display = "block";
                document.body.classList.add('no-scroll');

                // Trigger the transition after a small delay
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);

                // Add error handling for image loading
                modalImg.onerror = function() {
                    captionText.innerHTML = "Certificate image not found: " + this.alt;
                    modalImg.style.display = "none";
                };
            });
        });

        // Close modal when X is clicked
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.classList.remove('no-scroll');
            }, 300); // Match this with the CSS transition duration
        });

        // Close modal when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.classList.remove('no-scroll');
                }, 300);
            }
        });
    }
});

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Create transition element
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // Add loaded class to body after a short delay
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    // Handle all internal links
    document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
        const href = link.getAttribute('href');

        // Skip if it's an anchor link, external link, or special button
        if (href.startsWith('#') ||
            href.startsWith('http') ||
            link.classList.contains('no-transition') ||
            link.classList.contains('view-certificate')) {
            return;
        }

        link.addEventListener('click', function(e) {
            // Skip if special key pressed (ctrl, shift, etc)
            if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) return;

            e.preventDefault();

            // Start transition
            transition.classList.add('active');
            document.body.classList.add('no-scroll');

            // Wait for transition to complete before navigating
            setTimeout(() => {
                window.location.href = href;
            }, 600); // Match this with CSS transition duration
        });
    });

    // When new page loads, reverse the transition
    window.addEventListener('load', function() {
        transition.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Animate elements sequentially
function animateElements() {
    const elements = document.querySelectorAll('[data-load]');
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50}ms`;
        setTimeout(() => {
            el.classList.add('loaded');
        }, 100 + (index * 50));
    });
}