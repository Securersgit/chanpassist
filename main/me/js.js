let currentStep = 1;
const totalSteps = 4;

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const stepText = document.querySelector(".step-label");
const progressSteps = document.querySelectorAll(".step");
const formSteps = document.querySelectorAll(".form-step");

// Add validation functions
function validateStep(step) {
    switch(step) {
        case 1:
            const name = document.getElementById('name').value.trim();
            return name.length >= 2;
        case 2:
            return document.querySelector('input[name="goal"]:checked') !== null;
        case 3:
            return document.querySelector('input[name="experience"]:checked') !== null;
case 4:
  const checkedTopics = document.querySelectorAll('input[name="topics"]:checked').length;
  return checkedTopics >= 1 && checkedTopics <= 5;

        default:
            return true;
    }
}

function updateUI() {
    // Update progress bar
    progressSteps.forEach((step, index) => {
        step.classList.toggle("active", index < currentStep);
    });

    // Update step label
    stepText.textContent = `${currentStep} of ${totalSteps}`;

    // Animate form steps
    formSteps.forEach((formStep) => {
        const stepNumber = parseInt(formStep.getAttribute("data-step"));
        if (stepNumber === currentStep) {
            formStep.classList.remove("fade-out");
            formStep.classList.add("fade-in");
            formStep.style.display = "block";
        } else {
            formStep.classList.remove("fade-in");
            formStep.classList.add("fade-out");
            setTimeout(() => {
                formStep.style.display = "none";
            }, 300);
        }
    });

    // Toggle back button
    backBtn.style.display = currentStep > 1 ? "inline-block" : "none";

    // Update next button text
    nextBtn.textContent = currentStep === totalSteps ? "Complete →" : "Continue →";

    // Animate illustration
    const illustration = document.getElementById("stepIllustration");
    illustration.classList.remove("fade-in");
    illustration.classList.add("fade-out");

    setTimeout(() => {
        illustration.src = `/img/step${currentStep}.svg`;
        illustration.classList.remove("fade-out");
        illustration.classList.add("fade-in");
    }, 250);
}

nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
        if (validateStep(currentStep)) {
            currentStep++;
            updateUI();
        } else {
            // Show validation message
            const stepElement = document.querySelector(`[data-step="${currentStep}"]`);
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please complete this step before continuing.';
            errorMsg.style.color = '#e74c3c';
            errorMsg.style.fontSize = '14px';
            errorMsg.style.marginTop = '10px';

            // Remove existing error messages
            stepElement.querySelectorAll('.error-message').forEach(msg => msg.remove());
            stepElement.appendChild(errorMsg);

            setTimeout(() => errorMsg.remove(), 3000);
        }
    } else {
        if (validateStep(currentStep)) {
            // Collect user data
            const name = document.getElementById('name').value.trim();
            const goal = document.querySelector('input[name="goal"]:checked')?.value;
            const experience = document.querySelector('input[name="experience"]:checked')?.value;
            const topics = Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(cb => cb.value);

            // Store in localStorage
            const userProfile = {
                name,
                goal,
                experience,
                topics
            };
            localStorage.setItem("userProfile", JSON.stringify(userProfile));

            // Redirect
            window.location.href = "/me/recommendation.html";
        } else {
            // Optionally show validation message here if final step incomplete
            const stepElement = document.querySelector(`[data-step="${currentStep}"]`);
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please complete this step before continuing.';
            errorMsg.style.color = '#e74c3c';
            errorMsg.style.fontSize = '14px';
            errorMsg.style.marginTop = '10px';

            stepElement.querySelectorAll('.error-message').forEach(msg => msg.remove());
            stepElement.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 3000);
        }
    }
});


backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
});

// Handle label selection for radios
document.querySelectorAll("label.ds2 input[type='radio']").forEach(input => {
    input.addEventListener("change", () => {
        // Remove from all
        document.querySelectorAll("label.ds2").forEach(label => label.classList.remove("selected"));
        // Add to selected
        input.parentElement.classList.add("selected");
    });
});

document.querySelectorAll("label.ds3 input[type='radio']").forEach(input => {
    input.addEventListener("change", () => {
        // Remove from all
        document.querySelectorAll("label.ds3").forEach(label => label.classList.remove("selected"));
        // Add to selected
        input.parentElement.classList.add("selected");
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        nextBtn.click();
    }
    if (e.key === 'ArrowLeft' && currentStep > 1) {
        backBtn.click();
    }
    if (e.key === 'ArrowRight' && currentStep < totalSteps) {
        nextBtn.click();
    }
});

// Initialize
updateUI();



const maxTopics = 5;
const topicCheckboxes = document.querySelectorAll('input[name="topics"]');
const topicsCounter = document.getElementById('selectedCount');

function updateTopicsCounter() {
  const selectedCheckboxes = document.querySelectorAll('input[name="topics"]:checked');
  const selectedCount = selectedCheckboxes.length;

  // Update counter text
  topicsCounter.textContent = `${selectedCount}/5`;

  // Update visual class
  topicsCounter.parentElement.classList.toggle("limit-reached", selectedCount === maxTopics);

  // Update label .selected class
  topicCheckboxes.forEach(cb => {
    cb.parentElement.classList.toggle('selected', cb.checked);
  });

  // Enforce selection limit
  topicCheckboxes.forEach(cb => {
    if (!cb.checked) {
      cb.disabled = selectedCount >= maxTopics;
    } else {
      cb.disabled = false;
    }
  });
}

// Attach event listeners
topicCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateTopicsCounter);
});

// Initial run
updateTopicsCounter();





if (selectedCount > maxTopics) {
  topicsCounter.classList.add("limit-reached");
} else {
  topicsCounter.classList.remove("limit-reached");
}



// this is for making the selection stuff to work
