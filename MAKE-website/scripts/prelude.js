/*

Constants

*/

const API = '/api/v1';


/*

Global variables

*/

var state = {
    college_id: null,
    auth_keys: {
        checkout: null,
        student_storage: null,
        printer: null
    },
    user_object: null,
    settings: null,
    inventory: null,
    student_storage: null,
}

// Prelude function
function prelude() {
    loadState();

    if (state.college_id !== null) {
        displayLoggedIn();
    } else {
        displayLoggedOut();
    }
}


// Function to load/save state from localstorage
function loadState() {
    const new_state = JSON.parse(localStorage.getItem('state')) ?? state;
    state = validateState(new_state);
}

function validateState(new_state) {
    for (let key of Object.keys(state)) {
        if (new_state[key] === undefined) {
            new_state[key] = state[key];
        }
    }

    return new_state;
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(state));
}

function displayLoggedIn() {
    const show_elements = document.getElementsByClassName('id-r');
    const hide_elements = document.getElementsByClassName('id-n');

    for (let el of show_elements) {
        el.classList.remove('hidden');
    }

    for (let el of hide_elements) {
        el.classList.add('hidden');
    }

    const name_el = document.getElementById('logged-in-name');

    if (state.user_object !== null) {
        name_el.innerText = state.user_object.name;
    }

}

function displayLoggedOut() {
    const hide_elements = document.getElementsByClassName('id-r');
    const show_elements = document.getElementsByClassName('id-n');

    for (let el of hide_elements) {
        el.classList.add('hidden');
    }

    for (let el of show_elements) {
        el.classList.remove('hidden');
    }
}

prelude();