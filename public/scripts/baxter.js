document.addEventListener('DOMContentLoaded', function() {
    let progress = 0;
    const progressBar = document.getElementById('loading-progress');
    const loadingText = document.querySelector('.loading-text');

    function simulateLoading() {
        let countdown = 0.2;
        // let countdown = 26.2;
        const interval = setInterval(function() {
            countdown -= 0.1;
            progressBar.style.width = (100 - countdown / 26.2 * 100) + '%';
            loadingText.textContent = `${countdown.toFixed(1)} miles to go`;

            if (countdown <= 0) {
                clearInterval(interval);
                document.getElementById('loading-scene').style.display = 'none';
                document.getElementById('welcome-scene').style.display = 'block';
            }
        }, 50); 
    }

    simulateLoading();

    document.getElementById('start-btn').addEventListener('click', function() {
        document.getElementById('welcome-scene').style.display = 'none';
        showScene('scene1');
    });

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nextSceneId = this.getAttribute('data-next');
            showScene(nextSceneId);
        });
    });

    document.getElementById('restart-btn').addEventListener('click', function() {
        document.getElementById('welcome-scene').style.display = 'block';
        document.querySelectorAll('.scene').forEach(scene => {
            scene.style.display = 'none';
        });
    });
});

function showScene(sceneId) {
    window.scrollTo(0, 0);

    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.display = 'none';
    });

    document.getElementById(sceneId).style.display = 'block';
}

