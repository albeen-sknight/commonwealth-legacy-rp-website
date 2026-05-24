/**
 * Commonwealth Legacy RP - Interactive Whitelist Wizard Controller
 * State-machine for progress nodes, word-counts, dynamic scenarios, and hash loaders.
 */

let currentStep = 1;
const totalSteps = 5;

// Dynamic Scenarios Content Library
const Scenarios = {
  civilian: `
    <div class="form-group">
      <label class="form-label" for="scen-civ-1">Scenario: held at Gunpoint (Min. 40 Characters)</label>
      <textarea id="scen-civ-1" class="form-control scenario-field" placeholder="Explain in detail how your civilian character would react to being held at gunpoint in a remote alleyway. Draft the dialogue and physical actions..." required></textarea>
    </div>
    <div class="form-group">
      <label class="form-label" for="scen-civ-2">Aspirations & Limits (Min. 40 Characters)</label>
      <textarea id="scen-civ-2" class="form-control scenario-field" placeholder="What is your character's primary legal dream? What moral limits or desperation would drive them into underworld progression?" required></textarea>
    </div>
  `,
  police: `
    <div class="form-group">
      <label class="form-label" for="scen-leo-1">Scenario: Tactical FearRP (Min. 40 Characters)</label>
      <textarea id="scen-leo-1" class="form-control scenario-field" placeholder="Describe the concept of FearRP. How should a Trooper react if ambushed and held at gunpoint during a routine traffic stop?" required></textarea>
    </div>
    <div class="form-group">
      <label class="form-label" for="scen-leo-2">Legal Boundaries (Min. 40 Characters)</label>
      <textarea id="scen-leo-2" class="form-control scenario-field" placeholder="Explain the legal difference between a simple traffic stop, a temporary detention, and a full arrest under the penal code." required></textarea>
    </div>
  `,
  ems: `
    <div class="form-group">
      <label class="form-label" for="scen-ems-1">Scenario: Structural Triage (Min. 40 Characters)</label>
      <textarea id="scen-ems-1" class="form-control scenario-field" placeholder="A structural apartment fire is active with heavy smoke and trapped civilians. Detail your medical rescue entries and triage priorities..." required></textarea>
    </div>
    <div class="form-group">
      <label class="form-label" for="scen-ems-2">Trauma Care Protocol (Min. 40 Characters)</label>
      <textarea id="scen-ems-2" class="form-control scenario-field" placeholder="Explain the trauma steps (triage, stabilization, transport) for treating a patient with severe bone fractures and heavy arterial bleeding." required></textarea>
    </div>
  `,
  doj: `
    <div class="form-group">
      <label class="form-label" for="scen-doj-1">Constitutional Warrants (Min. 40 Characters)</label>
      <textarea id="scen-doj-1" class="form-control scenario-field" placeholder="Explain the constitutional criteria required for a Magistrate Judge to authorize and sign an emergency warrant..." required></textarea>
    </div>
    <div class="form-group">
      <label class="form-label" for="scen-doj-2">Bail & Defense duties (Min. 40 Characters)</label>
      <textarea id="scen-doj-2" class="form-control scenario-field" placeholder="Detail the core duties of a Public Defender in ensuring a fair trial during District Attorney prosecution disputes." required></textarea>
    </div>
  `
};

document.addEventListener('DOMContentLoaded', () => {
  // Injections
  const beaconPlaceholder = document.getElementById('wizard-beacon-placeholder');
  if (beaconPlaceholder && typeof SVGIcons !== 'undefined') {
    beaconPlaceholder.innerHTML = SVGIcons.beacon;
  }
  
  const checkIconPlaceholder = document.getElementById('success-icon-box');
  if (checkIconPlaceholder) {
    checkIconPlaceholder.innerHTML = `<svg viewBox="0 0 24 24" style="width: 40px; height: 40px; fill: currentColor;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;
  }

  // Setup Backstory word counter
  const backstoryField = document.getElementById('ic-backstory');
  const countBadge = document.getElementById('word-count-badge');
  if (backstoryField && countBadge) {
    backstoryField.addEventListener('input', () => {
      const words = backstoryField.value.trim().split(/\s+/).filter(w => w.length > 0);
      const count = words.length;
      countBadge.innerText = `Word Count: ${count} / 100`;
      if (count >= 100) {
        countBadge.style.color = 'var(--green)';
      } else {
        countBadge.style.color = 'var(--muted)';
      }
    });
  }

  // Setup age validation warning
  const ageInput = document.getElementById('ooc-age');
  const ageWarning = document.getElementById('age-warning-alert');
  if (ageInput && ageWarning) {
    ageInput.addEventListener('input', () => {
      if (parseInt(ageInput.value) < 18) {
        ageWarning.style.display = 'block';
      } else {
        ageWarning.style.display = 'none';
      }
    });
  }

  // Initialize dynamic scenarios on first load
  updateScenarioQuestions();
});

// Dynamic Injections based on Selected Interest
function updateScenarioQuestions() {
  const container = document.getElementById('dynamic-scenarios-container');
  const selector = document.getElementById('ic-interest');
  if (!container || !selector) return;

  const value = selector.value;
  container.innerHTML = Scenarios[value] || Scenarios['civilian'];
}

// Step navigation
function changeStep(direction) {
  if (direction === 1 && !validateCurrentStep()) return; // Block step forward if invalid

  // Move step index
  currentStep += direction;
  
  // Render step visible states
  const contents = document.querySelectorAll('.wizard-step-content');
  contents.forEach((el, index) => {
    if (index + 1 === currentStep) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  updateWizardControls();

  // If moving into Step 5 (Submit hashing progress)
  if (currentStep === 5) {
    runSubmissionLoader();
  }
}

// Checkbox labels triggers
function toggleCheckbox(id) {
  const box = document.getElementById(id);
  if (box) {
    box.checked = !box.checked;
  }
}

// Form validations
function validateCurrentStep() {
  if (currentStep === 1) {
    const discord = document.getElementById('ooc-discord').value.trim();
    const age = document.getElementById('ooc-age').value.trim();
    const hours = document.getElementById('ooc-hours').value.trim();

    if (!discord || !age || !hours) {
      alert("Please fill out all Out-of-Character player details before proceeding.");
      return false;
    }
    return true;
  }

  if (currentStep === 2) {
    const name = document.getElementById('ic-name').value.trim();
    const backstory = document.getElementById('ic-backstory').value.trim();
    const words = backstory.split(/\s+/).filter(w => w.length > 0);

    if (!name || !backstory) {
      alert("Please fill out all In-Character profile details.");
      return false;
    }
    if (words.length < 100) {
      alert(`Your character backstory must be at least 100 words. Currently: ${words.length} words.`);
      return false;
    }
    return true;
  }

  if (currentStep === 3) {
    const fields = document.querySelectorAll('.scenario-field');
    let allValid = true;

    fields.forEach(field => {
      if (field.value.trim().length < 40) {
        allValid = false;
      }
    });

    if (!allValid) {
      alert("Please answer both roleplay scenarios in detail (minimum 40 characters each).");
      return false;
    }
    return true;
  }

  if (currentStep === 4) {
    const check1 = document.getElementById('check-etiquette').checked;
    const check2 = document.getElementById('check-metagaming').checked;
    const check3 = document.getElementById('check-voice').checked;

    if (!check1 || !check2 || !check3) {
      alert("You must affirm and agree to all server guidelines before submitting your whitelisting application.");
      return false;
    }
    return true;
  }

  return true;
}

// Update wizard progress lines and nodes
function updateWizardControls() {
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const header = document.getElementById('app-wizard-header');
  const actions = document.getElementById('app-wizard-actions');

  // Node classes
  for (let i = 1; i <= totalSteps; i++) {
    const node = document.getElementById(`node-${i}`);
    if (node) {
      if (i === currentStep) {
        node.className = "wizard-step-node active";
      } else if (i < currentStep) {
        node.className = "wizard-step-node completed";
      } else {
        node.className = "wizard-step-node";
      }
    }
  }

  // Progress line width
  const progressBar = document.getElementById('wizard-progress-bar');
  if (progressBar) {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  // Button labels
  if (currentStep === 1) {
    if (prevBtn) prevBtn.style.visibility = 'hidden';
  } else {
    if (prevBtn) prevBtn.style.visibility = 'visible';
  }

  if (currentStep === 4) {
    if (nextBtn) nextBtn.innerText = "Submit Application";
  } else {
    if (nextBtn) nextBtn.innerText = "Next Step";
  }

  // Lock form header & actions on step 5 (success processing)
  if (currentStep === 5) {
    if (header) header.style.display = 'none';
    if (actions) actions.style.display = 'none';
  }
}

// Hash loader transmittal simulation
function runSubmissionLoader() {
  const progressFill = document.getElementById('submission-progress-fill');
  const percentText = document.getElementById('submission-percent');
  const loaderSection = document.getElementById('submission-loader');
  const successSection = document.getElementById('submission-success');

  if (!progressFill || !percentText) return;

  let percent = 0;
  const interval = setInterval(() => {
    percent += 5;
    progressFill.style.width = `${percent}%`;
    percentText.innerText = `${percent}%`;

    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        // Hide loader, show success screen
        if (loaderSection) loaderSection.style.display = 'none';
        if (successSection) successSection.style.display = 'block';
      }, 400);
    }
  }, 120); // Takes ~2.4 seconds to hash transmission completely
}

// Skeletal submit preventer
function handleAppSubmit(event) {
  event.preventDefault();
}
