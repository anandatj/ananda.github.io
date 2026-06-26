// Projects Data
const projectsData = [
    {
        title: "Motor Drive Parameter Estimation",
        description: "A method for accurately estimating lumped parameters of VSI connected synchronous machines, including experimental validation and practical implications for drive design. <br>(Presented at IEEE APEC 2025 Conference in Atlanta, GA)",
        image: "./src/vsi_parameter.png",
        link: "https://ieeexplore.ieee.org/document/10977308",
        linkText: "View Publication",
    },
    {
        title: "Resonant Controller Design for WRSM drives",
        description: "Development of advanced rotor current control system for wound-rotor synchronous motor drives in C2000 microcontroller, achieving minimal delay and lag between setpoint current and excitation current.",
        image: "./src/res_Controller.png",
        link: "#",
        linkText: ""
    },
    {
        title: "High-Speed Speed Controller Design for Very High Power Synchronous Machine in M4-Cortex MCU",
        description: "Design and implementation of a high-speed high-torque speed controller for a 900 kW synchronous machine using a M4-Cortex microcontroller through CAN Bus communication protocol.",
        image: "./src/m4_motor.jpg",
        link: "#",
        linkText: ""
    },
    {
        title: "Sensorless High-Speed Control of BLDC Motor for Stress Testing Rig",
        description: "Design and implementation of a sensorless high-speed (up to 20,000 RPM bidirectional) control system for a 1.2 kW BLDC motor used in a proprietary stress testing rig that cycles between variation of speeds for weeks at a time, including control strategy development and hardware implementation.",
        image: "./src/bldc.jpg",
        link: "#",
        linkText: ""
    },
    {
        title: "Switching Dynamic Brake Circuit Design for High-Speed BLDC Motor",
        description: "Design and simulation of a 2 kW dynamic brake circuit board for high-speed BLDC motors, focusing on fast response and efficient energy dissipation during rapid deceleration.",
        image: "./src/board_power_electronics.jpg",
        link: "#",
        linkText: ""
    },
    {
        title: "Grid Connected Battery Energy Storage System (BESS) Design and Simulation",
        description: "Design and simulation of a grid-connected battery energy storage system in MATLAB/Simulink, including control strategy development and performance analysis under various grid conditions such as peak-shaving and frequency regulation.",
        image: "./src/peakshave_plot.png",
        link: "#",
        linkText: ""
    },
    {
        title: "High Voltage Indicator Circuit Design for High Power Test Bench",
        description: "Design and PCB build of a high voltage indicator circuit for a high power dyno test bench, ensuring safe operation and real-time monitoring of DC bus voltage level.",
        image: "./src/light_pcb.jpg",
        link: "#",
        linkText: ""
    }, 
    {
        title: "Object Detection Algorithm Comparison on Thermal Imaging Data",
        description: "A comparative study of various object detection algorithms implemented on thermal imaging data, evaluating their performance in terms of accuracy, speed, and robustness under different environmental conditions. (Undergraduate Thesis)",
        image: "./src/MobileNetV2_web.png",
        link: "https://lib.ui.ac.id/detail?id=20516386&lokasi=lokal",
        linkText: "View Publication"
    }
];

// Blog Data
const blogData = [
    {
        title: "Understanding SVPWM (Part 1) - Basics",
        description: "How and why Space Vector Pulse Width Modulation (SVPWM) is used in modern power electronics.",
        image: "./articles/src/SVPWM-Basic.svg",
        link: "#",
        linkText: "Read Article",
        articleFile: "./articles/svpwm_article.html" 
    },
    {
        title: "Understanding SVPWM (Part 2) - Efficient Algorithm",
        description: "Reducing if-else logic in implementing SVPWM (Work in Progress)",
        image: "./src/MinMax_Injection.svg",
    },
    {
        title: "Understanding SVPWM (Part 3) - Implementation",
        description: "Implementing SVPWM in STM32 (Work in Progress)",
        image: "./src/svpwm.png",
    },
    {
        title: "Soviet Mechanical Watch Repair",
        description: "Repaired my father's Vostok Amphibia watch from the 80s that had a main spring problem (Work in Progress).",
        image: "./src/vostok.jpg",
        //link: "#",
        //linkText: "Read Article (In Progress)"
    }
];

// Function to generate the HTML for a card
function generateCardHTML(item) {
    const imageUrl = item.image ? item.image : "bldc.jpg";
    
    // Check if the item has an articleFile to show. If so, build an onclick handler to open the modal.
    // If not, build a standard href link (or hide it if linkText is empty).
    let linkHtml = '';
    if (item.linkText !== "") {
        // If it has a file to fetch, wire up the openArticle function
        if (item.articleFile) {
            linkHtml = `<a onclick="openArticle('${item.articleFile}')" class="card-link">${item.linkText}</a>`;
        }
        // Otherwise fallback to external link if provided
        else if (item.link) {
            linkHtml = `<a href="${item.link}" class="card-link" target="_blank">${item.linkText}</a>`;
        }
    }
    
    return `
        <div class="card">
            <div class="card-img-wrapper">
                <img src="${imageUrl}" alt="${item.title}" class="card-img">
                <div class="glass-overlay"></div>
            </div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${linkHtml}
            </div>
        </div>
    `;
}

// Inject the generated HTML into the specific containers
document.getElementById('projects-container').innerHTML = projectsData.map(generateCardHTML).join('');
document.getElementById('blog-container').innerHTML = blogData.map(generateCardHTML).join('');

// Ambient Light Scroll Effect
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.body.style.setProperty('--scroll', scrollPercent);
});

// --- Article Modal Logic ---
const backdrop = document.getElementById('articleBackdrop');
const contentContainer = document.getElementById('articleContentContainer');
const closeBtn = document.getElementById('modalCloseBtn');

// Global function attached to buttons
window.openArticle = async function (fileUrl) {
    // Lock background scrolling
    document.body.classList.add('modal-open');

    // Show loading state and activate modal
    contentContainer.innerHTML = '<div class="loading-spinner">Loading article...</div>';
    backdrop.classList.add('active');

    try {
        // Fetch the HTML file dynamically
        const response = await fetch(fileUrl);

        if (!response.ok) throw new Error("File not found");

        const htmlContent = await response.text();

        // Inject the fetched HTML safely
        contentContainer.innerHTML = htmlContent;

        // Tell MathJax to scan the newly injected HTML for LaTeX equations and render them
        if (window.MathJax) {
            MathJax.typesetPromise([contentContainer]).catch((err) => console.log('MathJax error:', err.message));
        }
    } catch (error) {
        console.error("Error loading article:", error);
        contentContainer.innerHTML = `
                    <div style="text-align: center; color: #dc2626; padding: 2rem;">
                        <h3>Failed to load article</h3>
                        <p>File requested: <code>${fileUrl}</code></p>
                        <br>
                        <p style="font-size: 0.9rem; color: #475569;">
                            <b>Note for local development:</b> Most web browsers block "fetch" requests from local files (CORS policy) for security.<br>
                            To test this on your computer, you need to open your project using a local server (like the "Live Server" extension in VS Code).
                        </p>
                    </div>`;
    }
};

function closeArticle() {
    backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Wait for the CSS fade out to finish before removing the content
    setTimeout(() => {
        contentContainer.innerHTML = '';
    }, 400); 
}

// Close when clicking the return button
closeBtn.addEventListener('click', closeArticle);

// Close when clicking the blurred background outside the card
backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
        closeArticle();
    }
});