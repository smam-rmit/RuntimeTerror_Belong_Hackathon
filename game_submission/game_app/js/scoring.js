(function () {
    const tiers = [
        { id: "thriving", label: "Thriving", min: 86, description: "Strong sense of belonging, authentic relationships" },
        { id: "belonging", label: "Belonging", min: 61, description: "Connections are forming and support is building" },
        { id: "struggling", label: "Struggling", min: 31, description: "Some progress, but barriers remain" },
        { id: "isolated", label: "Isolated", min: 0, description: "Feeling excluded, needs active support" }
    ];

    function clampScore(score) {
        if (Number.isNaN(score)) return 0;
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    function getTier(score) {
        const safeScore = clampScore(score);
        return tiers.find((tier) => safeScore >= tier.min) || tiers[tiers.length - 1];
    }

    function describeScore(score) {
        const tier = getTier(score);
        return {
            tierId: tier.id,
            label: tier.label,
            description: tier.description,
            score: clampScore(score)
        };
    }

    window.ScoreHelpers = {
        clampScore,
        getTier,
        describeScore,
        tiers
    };
})();
