(function () {
    const STORAGE_KEY = "belong-save-v1";

    document.addEventListener("DOMContentLoaded", () => {
        const app = new GameApp();
        app.init();
    });

    class GameApp {
        constructor() {
            this.state = null;
            this.pendingOutcome = null;
            this.previousScreen = "menu";
            this.dom = {};
        }

        init() {
            this.cacheDom();
            this.bindEvents();
            this.resetState();
            this.loadSavedGameFlag();
            this.showScreen("menu");
        }

        cacheDom() {
            this.dom.screens = {
                menu: document.getElementById("menu-screen"),
                character: document.getElementById("character-screen"),
                game: document.getElementById("game-screen"),
                results: document.getElementById("results-screen"),
                resources: document.getElementById("resources-screen")
            };
            this.dom.gameScreen = this.dom.screens.game;
            this.dom.startButton = document.getElementById("start-button");
            this.dom.continueButton = document.getElementById("continue-button");
            this.dom.resourcesButton = document.getElementById("resources-button");
            this.dom.characterBack = document.getElementById("character-back");
            this.dom.characterGrid = document.getElementById("character-grid");
            this.dom.scoreChip = document.getElementById("score-chip");
            this.dom.progressPill = document.getElementById("progress-pill");
            this.dom.sceneAvatar = document.getElementById("scene-avatar");
            this.dom.sceneBackground = document.getElementById("scene-background");
            this.dom.sceneTitle = document.getElementById("scene-title");
            this.dom.sceneDay = document.getElementById("scene-day");
            this.dom.sceneContext = document.getElementById("scene-context");
            this.dom.choicesContainer = document.getElementById("choices-container");
            this.dom.feedbackContainer = document.getElementById("feedback-container");
            this.dom.factBanner = document.getElementById("fact-banner");
            this.dom.factText = document.getElementById("fact-text");
            this.dom.factToggle = document.getElementById("fact-toggle");
            this.dom.continueNext = document.getElementById("continue-button-next");
            this.dom.restartButton = document.getElementById("restart-button");
            this.dom.saveExit = document.getElementById("save-exit");
            this.dom.resultsScore = document.getElementById("results-score");
            this.dom.resultsTier = document.getElementById("results-tier");
            this.dom.resultsReflection = document.getElementById("results-reflection");
            this.dom.resultsMoments = document.getElementById("results-moments");
            this.dom.playAgain = document.getElementById("play-again");
            this.dom.viewResourcesFromResults = document.getElementById("view-resources-from-results");
            this.dom.returnMenu = document.getElementById("return-menu");
            this.dom.resourcesBack = document.getElementById("resources-back");
        }

        bindEvents() {
            this.dom.startButton.addEventListener("click", () => this.openCharacterSelect());
            this.dom.continueButton.addEventListener("click", () => this.resumeSavedGame());
            this.dom.resourcesButton.addEventListener("click", () => this.openResources("menu"));
            this.dom.characterBack.addEventListener("click", () => this.showScreen("menu"));
            this.dom.continueNext.addEventListener("click", () => this.advanceAfterOutcome());
            this.dom.restartButton.addEventListener("click", () => this.restartStory());
            this.dom.saveExit.addEventListener("click", () => this.saveAndExit());
            this.dom.factToggle.addEventListener("click", () => this.toggleFact());
            this.dom.playAgain.addEventListener("click", () => this.openCharacterSelect());
            this.dom.viewResourcesFromResults.addEventListener("click", () => this.openResources("results"));
            this.dom.returnMenu.addEventListener("click", () => this.showScreen("menu"));
            this.dom.resourcesBack.addEventListener("click", () => this.showScreen(this.previousScreen));
        }

        resetState() {
            this.state = {
                characterId: null,
                scenarioId: null,
                inclusionScore: 0,
                confidence: 0,
                history: [],
                flags: [],
                completed: false,
                savedAt: null
            };
            this.flagSet = new Set();
        }

        loadSavedGameFlag() {
            const saved = this.getStoredState();
            const hasSave = Boolean(saved && saved.characterId && !Number.isNaN(saved.inclusionScore));
            this.dom.continueButton.classList.toggle("hidden", !hasSave);
        }

        openCharacterSelect() {
            this.renderCharacterCards();
            this.showScreen("character");
        }

        openResources(fromScreen) {
            this.previousScreen = fromScreen;
            this.showScreen("resources");
        }

        renderCharacterCards() {
            this.dom.characterGrid.innerHTML = "";
            Object.values(window.GAME_CHARACTERS).forEach((character) => {
                const card = document.createElement("button");
                card.className = "character-card";
                card.type = "button";
                card.setAttribute("role", "listitem");
                if (character.accentColor) {
                    card.style.setProperty("--card-accent", character.accentColor);
                }

                const portraitFrame = document.createElement("div");
                portraitFrame.className = "character-portrait-frame";
                const portraitSrc = character.cardImage || character.portrait;
                if (portraitSrc) {
                    const img = document.createElement("img");
                    img.src = portraitSrc;
                    img.alt = `${character.displayName} portrait`;
                    img.loading = "lazy";
                    portraitFrame.appendChild(img);
                } else {
                    const placeholder = document.createElement("div");
                    placeholder.className = "character-placeholder";
                    placeholder.textContent = character.displayName.charAt(0).toUpperCase();
                    placeholder.setAttribute("aria-hidden", "true");
                    portraitFrame.appendChild(placeholder);
                }

                const meta = document.createElement("div");
                meta.className = "character-meta";
                const name = document.createElement("h2");
                name.textContent = character.displayName;
                const tagline = document.createElement("p");
                tagline.textContent = character.tagline;
                const description = document.createElement("p");
                description.textContent = character.description;
                meta.append(name, tagline, description);

                card.append(portraitFrame, meta);
                card.addEventListener("click", () => this.startNewStory(character.id));
                this.dom.characterGrid.appendChild(card);
            });
        }

        startNewStory(characterId) {
            const character = window.GAME_CHARACTERS[characterId];
            if (!character) {
                console.warn("Unknown character", characterId);
                return;
            }

            this.resetState();
            this.state.characterId = characterId;
            this.state.inclusionScore = character.startingStats.inclusionScore;
            this.state.confidence = character.startingStats.confidence;
            this.state.savedAt = new Date().toISOString();
            this.state.scenarioId = this.getFirstScenarioId(characterId);
            this.saveState();

            this.renderScenario();
            this.showScreen("game");
        }

        restartStory() {
            if (!this.state.characterId) {
                this.openCharacterSelect();
                return;
            }
            this.startNewStory(this.state.characterId);
        }

        resumeSavedGame() {
            const saved = this.getStoredState();
            if (!saved) {
                this.openCharacterSelect();
                return;
            }
            this.state = {
                ...saved,
                history: saved.history || [],
                flags: saved.flags || [],
                completed: Boolean(saved.completed),
                savedAt: saved.savedAt || new Date().toISOString()
            };
            this.flagSet = new Set(this.state.flags);
            this.showScreen(this.state.completed ? "results" : "game");
            if (this.state.completed) {
                this.renderResults();
            } else {
                this.renderScenario();
            }
        }

        saveAndExit() {
            this.saveState();
            this.loadSavedGameFlag();
            this.showScreen("menu");
        }

        getFirstScenarioId(characterId) {
            const list = (window.GAME_SCENARIOS.byCharacter[characterId] || []).slice().sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
            return list.length ? list[0].id : null;
        }

        renderScenario() {
            if (!this.state.scenarioId) {
                this.completeStory();
                return;
            }

            const scenario = window.GAME_SCENARIOS.byId[this.state.scenarioId];
            const character = window.GAME_CHARACTERS[this.state.characterId];
            if (!scenario || !character) {
                console.warn("Missing scenario or character", this.state.scenarioId, this.state.characterId);
                this.completeStory();
                return;
            }

            this.applyCharacterTheme(character);
            this.applySceneArtwork(scenario, character);

            const portraitSrc = scenario.portrait || character.portrait || "";
            if (portraitSrc) {
                this.dom.sceneAvatar.src = portraitSrc;
                this.dom.sceneAvatar.classList.remove("hidden");
            } else {
                this.dom.sceneAvatar.removeAttribute("src");
                this.dom.sceneAvatar.classList.add("hidden");
            }
            this.dom.sceneAvatar.alt = `${character.displayName} portrait`;
            if (character.accentColor) {
                this.dom.sceneAvatar.style.setProperty("--card-accent", character.accentColor);
            } else {
                this.dom.sceneAvatar.style.removeProperty("--card-accent");
            }

            this.dom.sceneTitle.textContent = scenario.title;
            this.dom.sceneDay.textContent = scenario.day;
            this.dom.sceneContext.textContent = scenario.context;
            this.dom.progressPill.textContent = scenario.day;
            this.updateScoreChip();
            this.renderChoices(scenario);
            this.renderFact(scenario);
            this.dom.feedbackContainer.classList.add("hidden");
            this.dom.feedbackContainer.textContent = "";
            this.dom.continueNext.classList.add("hidden");
            this.pendingOutcome = null;
        }

        renderChoices(scenario) {
            this.dom.choicesContainer.innerHTML = "";
            scenario.choices.forEach((choice) => {
                const choiceButton = document.createElement("button");
                choiceButton.className = "choice-button";
                choiceButton.type = "button";
                choiceButton.textContent = choice.text;
                choiceButton.addEventListener("click", () => this.handleChoiceSelection(choice));
                this.dom.choicesContainer.appendChild(choiceButton);
            });
        }

        renderFact(scenario) {
            const hasFact = Boolean(scenario.fact);
            this.dom.factBanner.classList.toggle("hidden", !hasFact);
            if (!hasFact) {
                return;
            }
            this.dom.factText.textContent = scenario.fact;
            this.dom.factText.classList.add("hidden");
            this.dom.factToggle.textContent = "Show insight";
            this.dom.factToggle.setAttribute("aria-expanded", "false");
        }

        toggleFact() {
            if (this.dom.factBanner.classList.contains("hidden")) {
                return;
            }
            const hidden = this.dom.factText.classList.toggle("hidden");
            this.dom.factToggle.textContent = hidden ? "Show insight" : "Hide insight";
            this.dom.factToggle.setAttribute("aria-expanded", hidden ? "false" : "true");
        }

        handleChoiceSelection(choice) {
            if (this.pendingOutcome) {
                return;
            }
            const scenario = window.GAME_SCENARIOS.byId[this.state.scenarioId];
            if (!scenario) {
                return;
            }
            const outcome = this.resolveOutcome(choice);
            this.applyOutcome(choice, outcome, scenario);
            this.showOutcomeFeedback(outcome.feedback);
            this.disableChoiceButtons();
            this.dom.continueNext.classList.remove("hidden");
            this.pendingOutcome = { scenarioId: scenario.id, choiceId: choice.id, outcome };
            this.saveState();
        }

        resolveOutcome(choice) {
            const { confidence } = this.state;
            const candidates = choice.outcomes || [];
            const resolved = candidates.find((entry) => {
                const req = entry.requirements || {};
                if (typeof req.minConfidence === "number" && confidence < req.minConfidence) {
                    return false;
                }
                if (typeof req.maxConfidence === "number" && confidence > req.maxConfidence) {
                    return false;
                }
                if (req.requiresFlag && !this.flagSet.has(req.requiresFlag)) {
                    return false;
                }
                if (req.excludesFlag && this.flagSet.has(req.excludesFlag)) {
                    return false;
                }
                return true;
            });
            return resolved || candidates[candidates.length - 1] || {
                feedback: "The choice had no noticeable impact.",
                scoreChange: 0,
                confidenceChange: 0,
                nextScenario: null
            };
        }

        applyOutcome(choice, outcome, scenario) {
            const scoreChange = outcome.scoreChange || 0;
            const confidenceChange = outcome.confidenceChange || 0;
            this.state.inclusionScore = window.ScoreHelpers.clampScore(this.state.inclusionScore + scoreChange);
            this.state.confidence = Math.max(0, Math.min(100, Math.round(this.state.confidence + confidenceChange)));
            if (Array.isArray(outcome.addFlags)) {
                outcome.addFlags.forEach((flag) => {
                    if (!this.flagSet.has(flag)) {
                        this.flagSet.add(flag);
                        this.state.flags.push(flag);
                    }
                });
            }
            this.updateScoreChip();
            this.state.history.push({
                scenarioId: scenario.id,
                scenarioTitle: scenario.title,
                choiceId: choice.id,
                choiceText: choice.text,
                feedback: outcome.feedback,
                scoreAfter: this.state.inclusionScore,
                confidenceAfter: this.state.confidence,
                timestamp: new Date().toISOString()
            });
            this.state.savedAt = new Date().toISOString();
        }

        showOutcomeFeedback(feedback) {
            this.dom.feedbackContainer.textContent = feedback || "This choice is still settling in.";
            this.dom.feedbackContainer.classList.remove("hidden");
        }

        disableChoiceButtons() {
            const buttons = this.dom.choicesContainer.querySelectorAll("button");
            buttons.forEach((button) => {
                button.disabled = true;
            });
        }

        advanceAfterOutcome() {
            if (!this.pendingOutcome) {
                return;
            }
            const { outcome } = this.pendingOutcome;
            const nextId = outcome.nextScenario ?? this.getSequentialNextScenario();
            if (!nextId) {
                this.completeStory();
                return;
            }
            this.state.scenarioId = nextId;
            this.pendingOutcome = null;
            this.renderScenario();
            this.saveState();
        }

        getSequentialNextScenario() {
            const scenarios = window.GAME_SCENARIOS.byCharacter[this.state.characterId] || [];
            const currentIndex = scenarios.findIndex((s) => s.id === this.state.scenarioId);
            if (currentIndex === -1) {
                return null;
            }
            const next = scenarios[currentIndex + 1];
            return next ? next.id : null;
        }

        completeStory() {
            this.state.completed = true;
            this.saveState();
            this.renderResults();
            this.showScreen("results");
        }

        renderResults() {
            const character = window.GAME_CHARACTERS[this.state.characterId];
            const scoreSummary = window.ScoreHelpers.describeScore(this.state.inclusionScore);
            const reflection = character?.reflections?.[scoreSummary.tierId] || "This week left a lasting impression.";
            this.dom.resultsScore.textContent = `${scoreSummary.score} / 100`; 
            this.dom.resultsTier.textContent = `${scoreSummary.label} – ${scoreSummary.description}`;
            this.dom.resultsReflection.textContent = reflection;
            this.renderMoments();
        }

        renderMoments() {
            this.dom.resultsMoments.innerHTML = "";
            const keyMoments = this.state.history.slice(-3).reverse();
            keyMoments.forEach((entry) => {
                const item = document.createElement("li");
                item.innerHTML = `
                    <strong>${entry.scenarioTitle}</strong><br>
                    <span>${entry.choiceText}</span><br>
                    <span>${entry.feedback}</span>
                `;
                this.dom.resultsMoments.appendChild(item);
            });
            if (!keyMoments.length) {
                const empty = document.createElement("li");
                empty.textContent = "Play a story to unlock reflections.";
                this.dom.resultsMoments.appendChild(empty);
            }
        }

        updateScoreChip() {
            this.dom.scoreChip.textContent = `Score: ${this.state.inclusionScore} / 100`;
        }

        showScreen(name) {
            Object.entries(this.dom.screens).forEach(([key, element]) => {
                element.classList.toggle("active", key === name);
            });
        }

        applyCharacterTheme(character) {
            const computed = getComputedStyle(this.dom.gameScreen);
            const accent = (character?.accentColor || computed.getPropertyValue("--accent-color") || "#6fd5ff").trim();
            const shadow = (character?.accentShadow || computed.getPropertyValue("--accent-shadow") || "#1e4a8a").trim();
            this.dom.gameScreen.style.setProperty("--accent-color", accent);
            this.dom.gameScreen.style.setProperty("--accent-shadow", shadow);
        }

        applySceneArtwork(scenario, character) {
            const sceneArt = scenario.background || character.cardImage || "";
            if (!this.dom.sceneBackground) {
                return;
            }
            if (sceneArt) {
                this.dom.sceneBackground.style.backgroundImage = `url("${sceneArt}")`;
            } else {
                this.dom.sceneBackground.style.backgroundImage = "none";
            }
        }

        saveState() {
            try {
                this.state.flags = Array.from(this.flagSet);
                const payload = {
                    ...this.state,
                    flags: this.state.flags
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            } catch (error) {
                console.warn("Unable to save game", error);
            }
        }

        getStoredState() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) {
                    return null;
                }
                return JSON.parse(raw);
            } catch (error) {
                console.warn("Unable to load saved game", error);
                return null;
            }
        }
    }
})();
