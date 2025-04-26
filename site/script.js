document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackContainer = document.getElementById('feedbackContainer');

    displayFeedback();

    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nume = document.getElementById('nume').value.trim();
        const email = document.getElementById('email').value.trim();
        const mesaj = document.getElementById('mesaj').value.trim();

        if (nume && email && mesaj && validateEmail(email)) {
            const feedback = {
                nume: nume,
                mesaj: mesaj
            };

            saveFeedback(feedback);
            feedbackForm.reset();
            displayFeedback();
        } else {
            alert('Vă rugăm să completați toate câmpurile corect!');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function saveFeedback(feedback) {
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    }

    function displayFeedback() {
        feedbackContainer.innerHTML = '';
        const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];

        if (feedbackList.length === 0) {
            feedbackContainer.innerHTML = '<div style="text-align: center; color: #555;">Nu există păreri momentan.</div>';
            return;
        }

        feedbackList.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'feedback-entry';
            div.textContent = `${entry.nume}, ${entry.mesaj}`;
            feedbackContainer.appendChild(div);
        });
    }
});
