        // 1. Define Projects Data
        const projectsData = [
            {
                title: "Motor Drive Parameter Estimation",
                description: "A method for accurately estimating lumped parameters of VSI connected synchronous machines, including experimental validation and practical implications for drive design. <br>(Presented at IEEE APEC 2025 Conference in Atlanta, GA)",
                image: "./src/vsi_parameter.png",
                link: "https://ieeexplore.ieee.org/document/10977308",
                linkText: "View Publication"
            },
            {
                title: "Resonant Controller Design for WRSM drives",
                description: "Development of advanced rotor current control system for wound-rotor synchronous motor drives in C2000 microcontroller, achieving minimal delay and lag between setpoint current and excitation current.",
                image: "./src/propres.png",
                link: "#",
                linkText: "View Project"
            },
            {
                title: "High-Speed Speed Controller Design for Very High Power Synchronous Machine in M4-Cortex MCU",
                description: "Design and implementation of a high-speed high-torque speed controller for a 900 kW synchronous machine using a M4-Cortex microcontroller through CAN Bus communication protocol.",
                image: "./src/m4_cascadia.jpg",
                link: "#",
                linkText: "View Project"
            },
            {
                title: "Sensorless High-Speed Control of BLDC Motor for Stress Testing Rig",
                description: "Design and implementation of a sensorless high-speed (up to 20,000 RPM bidirectional) control system for a 1.2 kW BLDC motor used in a proprietary stress testing rig that cycles between variation of speeds for weeks at a time, including control strategy development and hardware implementation.",
                image: "./src/bldc.jpg",
                link: "#",
                linkText: "View Project"
            },
            {
                title: "Switching Dynamic Brake Circuit Design for High-Speed BLDC Motor",
                description: "Design and simulation of a 2 kW dynamic brake circuit board for high-speed BLDC motors, focusing on fast response and efficient energy dissipation during rapid deceleration.",
                image: "./src/board_power_electronics.jpg",
                link: "#",
                linkText: "View Project"
            },
            {
                title: "Grid Connected Battery Energy Storage System (BESS) Design and Simulation",
                description: "Design and simulation of a grid-connected battery energy storage system in MATLAB/Simulink, including control strategy development and performance analysis under various grid conditions such as peak-shaving and frequency regulation.",
                image: "./src/peakshave_plot.png",
                link: "#",
                linkText: "View Project"
            },
            {
                title: "High Voltage Indicator Circuit Design for High Power Test Bench",
                description: "Design and PCB build of a high voltage indicator circuit for a high power dyno test bench, ensuring safe operation and real-time monitoring of DC bus voltage level.",
                image: "./src/light_pcb.jpg",
                link: "#",
                linkText: "View Project"
            }, 
            {
                title: "Object Detection Algorithm Comparison on Thermal Imaging Data",
                description: "A comparative study of various object detection algorithms implemented on thermal imaging data, evaluating their performance in terms of accuracy, speed, and robustness under different environmental conditions. (Undergraduate Thesis)",
                image: "./src/MobileNetV2_web.png",
                link: "https://lib.ui.ac.id/detail?id=20516386&lokasi=lokal",
                linkText: "View Publication"
            }
        ];

        // 2. Define  Blog Data
        const blogData = [
            {
                title: "Why SVPWM and How?",
                description: "An exploration of how and why Space Vector Pulse Width Modulation (SVPWM) is used in modern power electronics.",
                image: "./src/svpwm.png",
                link: "#",
                linkText: "Read Article"
            },
                       {
                title: "Manual Purely Mechnical Pre-Quartz Soviet Watch Repair",
                description: "Repaired my father's Vostok Amphibia watch from the 80s that had a main spring problem.",
                image: "./src/vostok.jpg",
                link: "#",
                linkText: "Read Article"
            }
        ];

        // 3. Create a function to generate the HTML for a card
        function generateCardHTML(item) {
            // Check if there is an image, otherwise use a default placeholder
            const imageUrl = item.image ? item.image : "bldc.jpg";
            
            return `
                <div class="card">
                    <div class="card-img-wrapper">
                        <img src="${imageUrl}" alt="${item.title}" class="card-img">
                        <div class="glass-overlay"></div>
                    </div>
                    <div class="card-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="card-link" target="_blank">${item.linkText} &rarr;</a>
                    </div>
                </div>
            `;
        }

        // 4. Inject the generated HTML into the specific containers
        document.getElementById('projects-container').innerHTML = projectsData.map(generateCardHTML).join('');
        document.getElementById('blog-container').innerHTML = blogData.map(generateCardHTML).join('');