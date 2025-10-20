(function () {
    const scenarioList = [
        {
            id: "maya_cafeteria",
            characterId: "maya",
            sequence: 1,
            day: "Day 1 • Lunchtime",
            title: "Finding a seat in the cafeteria",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "Maya sits alone at a lunch table. A nearby group laughs about weekend plans, and she wonders if she should walk over.",
            fact: "Did you know? 1 in 3 international students report feeling left out during unstructured school times like lunch.",
            choices: [
                {
                    id: "approach_group",
                    text: "Walk over and ask to join the group",
                    outcomes: [
                        {
                            requirements: { minConfidence: 35 },
                            feedback: "Sarah smiles and waves Maya over. The group loops Maya into their conversation.",
                            scoreChange: 15,
                            confidenceChange: 10,
                            addFlags: ["maya_met_sarah"],
                            nextScenario: "maya_group_project"
                        },
                        {
                            feedback: "One student awkwardly says they were in a private chat. Maya walks back feeling discouraged.",
                            scoreChange: -10,
                            confidenceChange: -8,
                            addFlags: ["maya_rebuffed_lunch"],
                            nextScenario: "maya_group_project"
                        }
                    ]
                },
                {
                    id: "wait_and_hope",
                    text: "Wait to see if anyone notices",
                    outcomes: [
                        {
                            feedback: "The bell rings before anyone reaches out. Maya packs up quietly.",
                            scoreChange: -5,
                            confidenceChange: -4,
                            addFlags: ["maya_waited"],
                            nextScenario: "maya_group_project"
                        }
                    ]
                },
                {
                    id: "phone_safe",
                    text: "Scroll on her phone and stay put",
                    outcomes: [
                        {
                            feedback: "Maya looks busy, but she feels unseen the whole lunch.",
                            scoreChange: 0,
                            confidenceChange: -2,
                            nextScenario: "maya_group_project"
                        }
                    ]
                },
                {
                    id: "move_table",
                    text: "Move to a different table to avoid the tension",
                    outcomes: [
                        {
                            feedback: "The new table is empty. It feels safer, but also lonelier.",
                            scoreChange: -3,
                            confidenceChange: -3,
                            nextScenario: "maya_group_project"
                        }
                    ]
                }
            ]
        },
        {
            id: "maya_group_project",
            characterId: "maya",
            sequence: 2,
            day: "Day 2 • Humanities",
            title: "Group project scramble",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "The teacher assigns a group project. Students quickly form groups of three. Maya hesitates, unsure who to approach.",
            fact: "Collaborative classrooms improve belonging when teachers help students form inclusive groups.",
            choices: [
                {
                    id: "ask_teacher",
                    text: "Ask the teacher to help find a group",
                    outcomes: [
                        {
                            feedback: "The teacher pairs Maya with Sarah and Lina, who greet her warmly.",
                            scoreChange: 12,
                            confidenceChange: 6,
                            addFlags: ["maya_teacher_support"],
                            nextScenario: "maya_cultural_day"
                        }
                    ]
                },
                {
                    id: "approach_pair",
                    text: "Approach two students who are still looking",
                    outcomes: [
                        {
                            requirements: { minConfidence: 38 },
                            feedback: "They welcome Maya and even ask about her ideas for the project.",
                            scoreChange: 10,
                            confidenceChange: 8,
                            addFlags: ["maya_new_peers"],
                            nextScenario: "maya_cultural_day"
                        },
                        {
                            feedback: "They hesitate and say they already have someone in mind. Maya steps back.",
                            scoreChange: -6,
                            confidenceChange: -6,
                            nextScenario: "maya_cultural_day"
                        }
                    ]
                },
                {
                    id: "wait_last",
                    text: "Wait until someone invites her",
                    outcomes: [
                        {
                            feedback: "Maya gets added to a group as the last option. She stays quiet during planning.",
                            scoreChange: -4,
                            confidenceChange: -5,
                            nextScenario: "maya_cultural_day"
                        }
                    ]
                },
                {
                    id: "work_alone",
                    text: "Suggest working alone",
                    outcomes: [
                        {
                            feedback: "The teacher says collaboration is required and promises to help her join a group tomorrow.",
                            scoreChange: -8,
                            confidenceChange: -4,
                            nextScenario: "maya_cultural_day"
                        }
                    ]
                }
            ]
        },
        {
            id: "maya_cultural_day",
            characterId: "maya",
            sequence: 3,
            day: "Day 3 • Assembly",
            title: "Cultural celebration day",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "The school is organizing a cultural celebration. The teacher asks Maya if she would present about Vietnam.",
            fact: "Invitations should feel collaborative, not tokenizing. Students should have authentic choice in how they share culture.",
            choices: [
                {
                    id: "enthusiastic",
                    text: "Agree enthusiastically and plan a story",
                    outcomes: [
                        {
                            requirements: { minConfidence: 40 },
                            feedback: "Maya shares a traditional story. Her classmates applaud and ask thoughtful questions.",
                            scoreChange: 14,
                            confidenceChange: 10,
                            nextScenario: "maya_comment"
                        },
                        {
                            feedback: "Maya feels nervous during the talk and rushes through it. A few students seem distracted.",
                            scoreChange: 3,
                            confidenceChange: -2,
                            nextScenario: "maya_comment"
                        }
                    ]
                },
                {
                    id: "express_concern",
                    text: "Agree but express concern about being tokenized",
                    outcomes: [
                        {
                            feedback: "The teacher thanks her and invites other international students to collaborate, turning it into a shared showcase.",
                            scoreChange: 12,
                            confidenceChange: 6,
                            addFlags: ["maya_started_collab"],
                            nextScenario: "maya_comment"
                        }
                    ]
                },
                {
                    id: "decline",
                    text: "Politely decline the spotlight",
                    outcomes: [
                        {
                            feedback: "The teacher understands, but Maya wonders if she missed a chance to be seen.",
                            scoreChange: -2,
                            confidenceChange: -4,
                            nextScenario: "maya_comment"
                        }
                    ]
                },
                {
                    id: "suggest_collab",
                    text: "Suggest a collaborative presentation with other students",
                    outcomes: [
                        {
                            feedback: "Maya pairs up with others to celebrate multiple cultures together.",
                            scoreChange: 11,
                            confidenceChange: 7,
                            addFlags: ["maya_collab_team"],
                            nextScenario: "maya_comment"
                        }
                    ]
                }
            ]
        },
        {
            id: "maya_comment",
            characterId: "maya",
            sequence: 4,
            day: "Day 4 • Hallway",
            title: "Overhearing harmful comments",
            background: "assets/images/backgrounds/outsideschool.png",
            portrait: "assets/images/characters/crying_maya.png",
            context: "Maya hears a group mocking another student's accent in the hallway. Her heart sinks.",
            fact: "Interrupting bias can shift school culture. Even a short statement can signal allyship.",
            choices: [
                {
                    id: "confront",
                    text: "Confront the students directly",
                    outcomes: [
                        {
                            requirements: { minConfidence: 45 },
                            feedback: "Maya firmly asks them to stop. A teacher overhears and backs her up.",
                            scoreChange: 15,
                            confidenceChange: 10,
                            endTag: "ally_action",
                            nextScenario: null
                        },
                        {
                            feedback: "Maya confronts them, but they brush her off. She still feels proud she spoke up.",
                            scoreChange: 6,
                            confidenceChange: 4,
                            endTag: "attempted_ally",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "report",
                    text: "Report it to a teacher after class",
                    outcomes: [
                        {
                            feedback: "The teacher thanks her and plans a restorative chat with the students.",
                            scoreChange: 10,
                            confidenceChange: 5,
                            endTag: "reported_bias",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "walk_away",
                    text: "Walk away quickly",
                    outcomes: [
                        {
                            feedback: "Maya feels unsafe. She wishes someone else nearby had said something.",
                            scoreChange: -6,
                            confidenceChange: -5,
                            endTag: "avoided_incident",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "general_statement",
                    text: "Make a general statement about respect",
                    outcomes: [
                        {
                            feedback: "Maya calls out that mocking accents is hurtful. One student apologizes.",
                            scoreChange: 9,
                            confidenceChange: 6,
                            endTag: "modeled_respect",
                            nextScenario: null
                        }
                    ]
                }
            ]
        },
        {
            id: "alex_lab_introduction",
            characterId: "alex",
            sequence: 1,
            day: "Day 1 • Robotics Lab",
            title: "Kicking off robotics club",
            portrait: "assets/images/characters/alex_neutral.png",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "Alex arrives early to the robotics lab. The club is planning teams for the regional contest, and the room is already buzzing.",
            fact: "Students on the autism spectrum thrive when teammates agree on clear communication norms.",
            choices: [
                {
                    id: "set_expectations",
                    text: "Ask the group to set shared communication rules",
                    outcomes: [
                        {
                            feedback: "The mentor loves the idea. The group agrees on hand signals and note-taking to reduce overwhelm.",
                            scoreChange: 13,
                            confidenceChange: 8,
                            addFlags: ["alex_set_norms"],
                            nextScenario: "alex_group_planning"
                        }
                    ]
                },
                {
                    id: "join_quietly",
                    text: "Join a team quietly without saying anything",
                    outcomes: [
                        {
                            feedback: "Alex gets assigned repetitive tasks. They feel underutilized.",
                            scoreChange: -3,
                            confidenceChange: -5,
                            nextScenario: "alex_group_planning"
                        }
                    ]
                },
                {
                    id: "mention_triggers",
                    text: "Share sensory triggers with the mentor",
                    outcomes: [
                        {
                            feedback: "The mentor thanks Alex and provides noise-cancelling headphones for the session.",
                            scoreChange: 11,
                            confidenceChange: 7,
                            addFlags: ["alex_supported"],
                            nextScenario: "alex_group_planning"
                        }
                    ]
                },
                {
                    id: "leave_room",
                    text: "Leave the busy room and work alone",
                    outcomes: [
                        {
                            feedback: "Alex avoids the noise, but also the collaboration they wanted.",
                            scoreChange: -7,
                            confidenceChange: -6,
                            nextScenario: "alex_group_planning"
                        }
                    ]
                }
            ]
        },
        {
            id: "alex_group_planning",
            characterId: "alex",
            sequence: 2,
            day: "Day 2 • Homeroom",
            title: "Group project planning",
            portrait: "assets/images/characters/alex_anxious.png",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "In class, Alex is paired with two classmates for a science presentation. The group starts talking over each other.",
            fact: "Facilitating turn-taking and role clarity boosts inclusion for neurodivergent students.",
            choices: [
                {
                    id: "propose_roles",
                    text: "Propose clear roles for each person",
                    outcomes: [
                        {
                            feedback: "The group likes the structure. Alex takes lead on prototyping, and others agree to share notes.",
                            scoreChange: 12,
                            confidenceChange: 9,
                            addFlags: ["alex_role_lead"],
                            nextScenario: "alex_pe_lesson"
                        }
                    ]
                },
                {
                    id: "share_needs",
                    text: "Explain that overlapping voices make it hard to focus",
                    outcomes: [
                        {
                            requirements: { minConfidence: 42 },
                            feedback: "Classmates pause and agree to speak one at a time.",
                            scoreChange: 10,
                            confidenceChange: 6,
                            nextScenario: "alex_pe_lesson"
                        },
                        {
                            feedback: "They try to adjust, but conversations still get loud. Alex feels partially heard.",
                            scoreChange: 4,
                            confidenceChange: -1,
                            nextScenario: "alex_pe_lesson"
                        }
                    ]
                },
                {
                    id: "mask_and_manage",
                    text: "Stay quiet and push through the discomfort",
                    outcomes: [
                        {
                            feedback: "Alex finishes the meeting exhausted from masking their needs.",
                            scoreChange: -5,
                            confidenceChange: -6,
                            nextScenario: "alex_pe_lesson"
                        }
                    ]
                },
                {
                    id: "leave_meeting",
                    text: "Step out and email ideas later",
                    outcomes: [
                        {
                            feedback: "Alex sends ideas later, but feels disconnected from the team decisions.",
                            scoreChange: -4,
                            confidenceChange: -3,
                            nextScenario: "alex_pe_lesson"
                        }
                    ]
                }
            ]
        },
        {
            id: "alex_pe_lesson",
            characterId: "alex",
            sequence: 3,
            day: "Day 3 • Physical Education",
            title: "Unexpected PE class switch",
            portrait: "assets/images/characters/over_alex.png",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "The PE teacher announces a surprise change to a loud, fast-paced dodgeball game. Alex feels sensory overload creeping in.",
            fact: "Advance warnings and alternatives help neurodivergent students manage sensory load in PE.",
            choices: [
                {
                    id: "request_adjustment",
                    text: "Ask for a quieter role keeping score",
                    outcomes: [
                        {
                            feedback: "The teacher agrees and thanks Alex for suggesting an inclusive option.",
                            scoreChange: 11,
                            confidenceChange: 7,
                            addFlags: ["alex_self_advocated"],
                            nextScenario: "alex_school_assembly"
                        }
                    ]
                },
                {
                    id: "use_headphones",
                    text: "Use noise-cancelling headphones and stay in the game",
                    outcomes: [
                        {
                            requirements: { minConfidence: 45 },
                            feedback: "Alex manages the noise and even encourages a teammate.",
                            scoreChange: 9,
                            confidenceChange: 6,
                            nextScenario: "alex_school_assembly"
                        },
                        {
                            feedback: "The headphones help a little, but Alex still ends class overwhelmed.",
                            scoreChange: 3,
                            confidenceChange: -2,
                            nextScenario: "alex_school_assembly"
                        }
                    ]
                },
                {
                    id: "sit_out",
                    text: "Sit out without explaining",
                    outcomes: [
                        {
                            feedback: "Teammates assume Alex is uninterested, creating distance.",
                            scoreChange: -4,
                            confidenceChange: -5,
                            nextScenario: "alex_school_assembly"
                        }
                    ]
                },
                {
                    id: "leave_gym",
                    text: "Leave the gym to decompress",
                    outcomes: [
                        {
                            feedback: "Alex feels calmer outside but gets marked absent from the activity.",
                            scoreChange: -6,
                            confidenceChange: -4,
                            nextScenario: "alex_school_assembly"
                        }
                    ]
                }
            ]
        },
        {
            id: "alex_school_assembly",
            characterId: "alex",
            sequence: 4,
            day: "Day 4 • Assembly",
            title: "School assembly showcase",
            portrait: "assets/images/characters/okay_alex.png",
            background: "assets/images/backgrounds/outsideschool.png",
            context: "The principal invites Alex's team to demo their robot on stage, but the setup is chaotic and bright.",
            fact: "Providing accessible presentation setups encourages neurodivergent students to share their talents.",
            choices: [
                {
                    id: "ask_for_adjustments",
                    text: "Ask stage crew to dim lights and reduce noise",
                    outcomes: [
                        {
                            feedback: "They dim the lighting, and Alex confidently explains their work to cheers.",
                            scoreChange: 14,
                            confidenceChange: 9,
                            endTag: "presented_comfort",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "delegate_demo",
                    text: "Ask a teammate to do the live demo while narrating from backstage",
                    outcomes: [
                        {
                            feedback: "The plan works. Alex still shares insights while staying regulated.",
                            scoreChange: 10,
                            confidenceChange: 6,
                            endTag: "shared_presentation",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "push_through",
                    text: "Push through the discomfort and present anyway",
                    outcomes: [
                        {
                            feedback: "Alex finishes the demo but feels drained and shaky afterward.",
                            scoreChange: 2,
                            confidenceChange: -5,
                            endTag: "masked_on_stage",
                            nextScenario: null
                        }
                    ]
                },
                {
                    id: "skip_presentation",
                    text: "Skip the presentation and stay in the audience",
                    outcomes: [
                        {
                            feedback: "The team misses Alex's perspective. They feel a mix of relief and regret.",
                            scoreChange: -7,
                            confidenceChange: -6,
                            endTag: "missed_showcase",
                            nextScenario: null
                        }
                    ]
                }
            ]
        }
    ];

    const scenariosById = Object.fromEntries(scenarioList.map((scenario) => [scenario.id, scenario]));

    const scenariosByCharacter = scenarioList.reduce((acc, scenario) => {
        acc[scenario.characterId] = acc[scenario.characterId] || [];
        acc[scenario.characterId].push(scenario);
        return acc;
    }, {});

    Object.values(scenariosByCharacter).forEach((list) => {
        list.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
    });

    window.GAME_SCENARIOS = {
        list: scenarioList,
        byId: scenariosById,
        byCharacter: scenariosByCharacter
    };
})();
