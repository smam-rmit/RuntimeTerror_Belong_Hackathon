(function () {
    const characters = {
        maya: {
            id: "maya",
            displayName: "Maya Nguyen",
            tagline: "Finding belonging as a Vietnamese international student",
            description: "Maya loves storytelling and debate club, but language barriers and cultural gaps make it hard to join in.",
            avatarClass: "avatar-maya",
            themeColor: "#ff6978",
            startingStats: {
                inclusionScore: 55,
                confidence: 32
            },
            reflections: {
                thriving: "I finally felt like people wanted to know me for who I am, not just where I'm from.",
                belonging: "I'm starting to feel more at ease, but I still need allies to ask me in.",
                struggling: "Some moments felt hopeful, others not so much. I want to keep trying.",
                isolated: "I ended the week feeling invisible. I wish someone had reached out."
            }
        },
        alex: {
            id: "alex",
            displayName: "Alex Carter",
            tagline: "Navigating high school as a student on the autism spectrum",
            description: "Alex is a robotics whiz with a sharp mind. Group projects and noisy hallways can overwhelm them.",
            avatarClass: "avatar-alex",
            themeColor: "#3655f2",
            startingStats: {
                inclusionScore: 58,
                confidence: 40
            },
            reflections: {
                thriving: "Being understood and supported let me focus on the things I love.",
                belonging: "I felt seen when classmates asked how they could help me contribute.",
                struggling: "I had to mask a lot. It would help if people checked in more.",
                isolated: "No one adapted, so I shut down. That shouldn't have to happen."
            }
        }
    };

    window.GAME_CHARACTERS = characters;
})();
