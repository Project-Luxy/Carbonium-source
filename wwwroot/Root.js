window.Carbonium.tabManager = {
    // variables
    canTransition: true,
    currentTab: "play",
    IP: "99.999.999",
    transitioning: false,
    
    // animations
    tabIntro: async function () {
        const newMenuInAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .section`],
            opacity: ['0%', '100%'],
            translateX: [50, 0],
            delay: anime.stagger(100)
        }).finished;
        const newMenuScaleInAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .scale-in`],
            opacity: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 120,
            scale: [0.5, 1]
        }).finished;
        const menuHeaderAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .header`],
            opacity: ['0%', '100%'],
            translateY: [-20, 0],
            delay: anime.stagger(100)
        }).finished;
        const menuFooterAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .tab-bottom`],
            opacity: ['0%', '30%'],
            translateY: [20, 0],
            delay: anime.stagger(100)
        }).finished;

        await Promise.all([newMenuInAnimation, menuHeaderAnimation, menuFooterAnimation, newMenuScaleInAnimation]);
    },
    tabOutro: async function() {
        const oldMenuOutAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .section`],
            opacity: ['100%', '0%'],
            translateX: [0, 50],
            duration: 150,
            easing: 'easeInQuad',
            delay: anime.stagger(40)
        }).finished;
        const newMenuScaleOutAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .scale-in`],
            opacity: ['100%', '0%'],
            scale: [1, 0.5],
            duration: 150,
            easing: 'easeInQuad'
        }).finished;
        const menuHeaderAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .header`],
            opacity: ['100%', '0%'],
            translateY: [0, -20],
            duration: 150,
            easing: 'easeInQuad',
            delay: anime.stagger(100)
        }).finished;
        const menuFooterAnimation = anime({
            targets: [`.tab-container #${this.currentTab}-page .tab-bottom`],
            opacity: ['30%', '0%'],
            translateY: [0, 20],
            duration: 150,
            easing: 'easeInQuad',
            delay: anime.stagger(100)
        }).finished;

        await Promise.all([oldMenuOutAnimation, menuHeaderAnimation, menuFooterAnimation, newMenuScaleOutAnimation]);
    },
    
    // functions
    setTab: function(newTab) {
        if(this.currentTab === newTab || this.nextTab === newTab || this.canTransition === false) {
            return;
        }

        document.getElementById(`${newTab}-li`).classList?.add("selected");
        document.getElementById(`${this.currentTab}-li`).classList?.remove("selected");
        if(this.nextTab) {
            document.getElementById(`${this.nextTab}-li`).classList?.remove("selected");
        }

        this.nextTab = newTab;

        if(this.transitioning) {
            return;
        }

        this.transitioning = true;

        this.tabOutro().then(() => {
            document.getElementById(`${this.currentTab}-page`).style.display = "none";
            this.currentTab = this.nextTab;
            document.getElementById(`${this.currentTab}-page`).style.display = "unset";

            this.transitioning = false;
            this.tabIntro();
        })
    }
}

// initial set tab
document.getElementById(`${Carbonium.tabManager.currentTab}-page`).style.display = "unset";