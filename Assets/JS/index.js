class CodingProject extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Get project title, href, project image, and GitHub attribute from attributes
        const projectTitle = this.getAttribute('project-title');
        const href = this.getAttribute('href');
        const projectImage = this.getAttribute('project-image');
        const github = this.getAttribute('github'); // New attribute

        // Create the HTML structure for the custom element
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your CSS styling here */
                a.button{
                        text-decoration: none;
                        color: #35393d;
                        cursor: pointer;
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #35393d;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                }
                a.button:hover {
                    background-color: #0056b3;
                }

                .project-container {
                    border: 7px solid black;
                    border-radius: 12px;
                    padding: 10px;
                    text-align: center;
                    width: 200px; /* Adjusted width to fit mobile screens */
                    height: auto;
                    background-image: url(${projectImage ? projectImage : 'none'});
                    background-color: rgba(255,255,255,.5);
                    background-size: cover;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }

                .project-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
                }

                .project-image {
                    width: 200px;
                    max-height: 200px;
                }

                .project-text {
                    
                }

                .github-button {
                    /* Style for GitHub button */
                    padding: 10px 20px; /* Adjusted padding to match 'a.button' */
                    font-size: 18px;
                }
                .button-icon {
                    background-color: rgba(255, 255, 255, 0.5);
                    width: 30px;
                    height: 30px;
                }
                /* Media query for mobile devices when text is cramped */
                @media screen and (max-width: 600px) {
                    a.button,
                    a.github-button {
                        padding: 8px 16px; /* Adjusted padding for smaller screens */
                        font-size: 14px; /* Adjusted font size for smaller screens */
                    }

                    .github-button {
                        font-size: 16px; /* Adjusted font size for GitHub button on smaller screens */
                    }
                }
            </style>
            <div class="project-container">
                <a href="${href}" class="button">${projectTitle}</a>
                ${github ? `<a href="${github}" class="github-button"><svg class='button-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Free 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg></a>` : ''} <!-- GitHub button -->
                <slot></slot>
            </div>
        `;

        // Add a click event listener to navigate to the specified href
        const link = this.shadowRoot.querySelector('a');
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = href;
        });

        // Use slotchange event to add class to projected elements
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            const projectedElements = slot.assignedNodes();
            projectedElements.forEach((element) => {
                if (element instanceof HTMLParagraphElement) {
                    element.classList.add('project-text');
                }
            });
        });
    }
}

class CodingProjectWrapper extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Define the HTML structure for the wrapper element
        this.shadowRoot.innerHTML = `
            <style>
                coding-project-wrapper {
                background-color: rgba(255, 255, 255, 0.9);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            coding-project-wrapper:hover {
                transform: translateY(-5px);
                box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
            }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('coding-project', CodingProject);
customElements.define('coding-project-wrapper', CodingProjectWrapper);