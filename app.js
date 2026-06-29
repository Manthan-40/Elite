/* 
   Elite Screens Interactive Documentation - Client Script
   Controls Sidebar Routing, Search, Code Toggles, and Lightbox Lightbox Zoom
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Section Navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const docSections = document.querySelectorAll('.doc-section');
    const topBarTitle = document.querySelector('.top-bar-title');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(mi => mi.classList.remove('active'));
            docSections.forEach(ds => ds.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');
            
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update top header title
                const sectionName = item.querySelector('span') ? item.querySelector('span').textContent : item.textContent;
                topBarTitle.textContent = sectionName;
                
                // Scroll to top of content container
                document.querySelector('.content-container').scrollTop = 0;
            }
        });
    });

    // 2. Search Filter in Sidebar
    const searchInput = document.getElementById('sidebarSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const menuSections = document.querySelectorAll('.menu-section');

            menuSections.forEach(section => {
                const title = section.querySelector('.menu-section-title');
                const items = section.querySelectorAll('.menu-item');
                let matchesInSection = 0;

                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(query)) {
                        item.style.display = 'flex';
                        matchesInSection++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Hide the section title if no items match
                if (matchesInSection === 0 && query !== '') {
                    title.style.display = 'none';
                } else {
                    title.style.display = 'block';
                }
            });
        });
    }

    // 3. Collapsible Code Blocks
    const toggles = document.querySelectorAll('.code-spec-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const container = toggle.closest('.code-spec-container');
            const body = container.querySelector('.code-spec-body');
            
            if (body.classList.contains('collapsed')) {
                body.classList.remove('collapsed');
                toggle.textContent = 'Collapse Code';
            } else {
                body.classList.add('collapsed');
                toggle.textContent = 'Expand Code';
            }
        });
    });

    // 4. Lightbox Image Viewer
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const zoomableContainers = document.querySelectorAll('.screenshot-container');

    zoomableContainers.forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
            }
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.alt = '';
        }, 300);
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 5. Copy Hex Value from Badges
    const colorBadges = document.querySelectorAll('.color-badge');
    colorBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const hex = badge.getAttribute('data-hex');
            navigator.clipboard.writeText(hex).then(() => {
                const originalTooltip = badge.getAttribute('data-tooltip');
                badge.setAttribute('data-tooltip', 'Copied: ' + hex);
                
                setTimeout(() => {
                    badge.setAttribute('data-tooltip', originalTooltip);
                }, 1500);
            }).catch(err => {
                console.error('Could not copy color hex value: ', err);
            });
        });
    });
});
