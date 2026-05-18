document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // ===== NAVIGATION LOGIC =====
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all views
            views.forEach(view => view.classList.remove('active'));

            // Show target view
            const targetId = item.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    const topbarProfileBtn = document.getElementById('topbar-profile-btn');
    if (topbarProfileBtn) {
        topbarProfileBtn.addEventListener('click', () => {
            const profileNav = document.querySelector('.nav-item[data-target="profile"]');
            if (profileNav) profileNav.click();
        });
    }

    // ===== ROLE SWITCHING LOGIC =====
    const roleToggle = document.getElementById('role-toggle');
    const roleLabel = document.getElementById('current-role');
    const studentHideElements = document.querySelectorAll('.student-hide');
    const teacherShowElements = document.querySelectorAll('.teacher-show');

    roleToggle.addEventListener('change', (e) => {
        const isTeacher = e.target.checked;
        
        if (isTeacher) {
            roleLabel.textContent = 'Teacher View';
            studentHideElements.forEach(el => el.style.display = 'flex');
            
            document.querySelector('#dashboard .view-header h1').textContent = 'Welcome back, Prof. Nadar Kaur';
            document.querySelector('#dashboard .subtitle').textContent = 'Here is your teaching overview for today.';
            
            document.querySelector('#attendance .view-header h1').textContent = 'Course Attendance';
            document.querySelector('#attendance .subtitle').textContent = 'Monitor student attendance across your courses.';

            document.querySelector('#assignments .view-header h1').textContent = 'Manage Assignments';
            document.querySelector('#assignments .subtitle').textContent = 'Create and grade course assignments.';

            // Profile Teacher View
            document.querySelector('#profile .view-header h1').textContent = 'Professor Profile';
            document.querySelector('#profile .subtitle').textContent = 'Your teaching portfolio and accomplishments.';
            const profileCard = document.querySelector('.profile-card');
            if(profileCard) {
                profileCard.querySelector('h2').textContent = 'Prof. Nadar Kaur';
                profileCard.querySelector('.major').textContent = 'Computer Science Department';
                const stats = profileCard.querySelectorAll('.p-stat-value');
                const labels = profileCard.querySelectorAll('.p-stat-label');
                if (stats.length >= 3) {
                    stats[0].textContent = '4.9'; labels[0].textContent = 'Rating';
                    stats[1].textContent = '5'; labels[1].textContent = 'Courses';
                    stats[2].textContent = '3.2k'; labels[2].textContent = 'Students';
                }
                const bio = profileCard.querySelector('.profile-bio p');
                if (bio) bio.textContent = 'Associate Professor focusing on Database Systems and HCI. Always happy to discuss research opportunities.';
            }
            const streaksCard = document.querySelector('.streaks-card');
            if (streaksCard) {
                streaksCard.querySelector('h3').innerHTML = 'Teaching Streak <i data-lucide="flame" class="flame-icon"></i>';
                streaksCard.querySelector('p').innerHTML = '<strong>5 Semesters!</strong> Consistently high ratings.';
            }
            const skillsCard = document.querySelector('.skills-card');
            if(skillsCard) {
                skillsCard.querySelector('h3').textContent = 'Teaching Expertise';
            }

        } else {
            roleLabel.textContent = 'Student View';
            studentHideElements.forEach(el => el.style.display = 'none');
            
            document.querySelector('#dashboard .view-header h1').textContent = 'Welcome back, Nadar Kaur';
            document.querySelector('#dashboard .subtitle').textContent = "Here's what's happening in your classes today.";

            document.querySelector('#attendance .view-header h1').textContent = 'Attendance Records';
            document.querySelector('#attendance .subtitle').textContent = 'Track your presence across all enrolled courses.';

            document.querySelector('#assignments .view-header h1').textContent = 'Assignments';
            document.querySelector('#assignments .subtitle').textContent = 'Manage your coursework and submissions.';

            // Profile Student View
            document.querySelector('#profile .view-header h1').textContent = 'Student Profile';
            document.querySelector('#profile .subtitle').textContent = 'Your living skill portfolio and achievements.';
            const profileCard = document.querySelector('.profile-card');
            if(profileCard) {
                profileCard.querySelector('h2').textContent = 'Nadar Kaur';
                profileCard.querySelector('.major').textContent = 'Computer Science, Junior';
                const stats = profileCard.querySelectorAll('.p-stat-value');
                const labels = profileCard.querySelectorAll('.p-stat-label');
                if (stats.length >= 3) {
                    stats[0].textContent = '3.8'; labels[0].textContent = 'GPA';
                    stats[1].textContent = '12'; labels[1].textContent = 'Courses';
                    stats[2].textContent = '142'; labels[2].textContent = 'Karma';
                }
                const bio = profileCard.querySelector('.profile-bio p');
                if (bio) bio.textContent = 'Passionate about human-computer interaction and building scalable databases. Looking for summer internships.';
            }
            const streaksCard = document.querySelector('.streaks-card');
            if (streaksCard) {
                streaksCard.querySelector('h3').innerHTML = 'Learning Streak <i data-lucide="flame" class="flame-icon"></i>';
                streaksCard.querySelector('p').innerHTML = '<strong>14 Day Streak!</strong> You\'re on fire.';
            }
            const skillsCard = document.querySelector('.skills-card');
            if(skillsCard) {
                skillsCard.querySelector('h3').textContent = 'Verified Skills';
            }
        }
    });

    // ===== NOTIFICATION DROPDOWN =====
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        notifDropdown.classList.remove('active');
    });

    notifDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Clear notifications
    const clearBtn = notifDropdown.querySelector('.clear-btn');
    clearBtn.addEventListener('click', () => {
        const items = notifDropdown.querySelectorAll('.notification-item');
        items.forEach(item => item.remove());
        const badge = document.querySelector('.notification-badge');
        if (badge) badge.remove();
    });

    // ===== TASK COMPLETION =====
    const taskList = document.getElementById('task-list');
    
    taskList.addEventListener('change', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.closest('.task-item');
            if (e.target.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        }
    });

    // ===== ASSIGNMENT FILTERING & SEARCH =====
    const searchInput = document.getElementById('assignment-search');
    const courseFilter = document.getElementById('course-filter');
    const assignmentCards = document.querySelectorAll('.assignment-card');

    function filterAssignments() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCourse = courseFilter.value;

        assignmentCards.forEach(card => {
            const cardCourse = card.getAttribute('data-course');
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            const cardDesc = card.querySelector('.description').textContent.toLowerCase();

            const matchesSearch = cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);
            const matchesCourse = !selectedCourse || cardCourse === selectedCourse;

            if (matchesSearch && matchesCourse) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterAssignments);
    courseFilter.addEventListener('change', filterAssignments);

    // ===== ASSIGNMENT CARD HOVER (Detail Modal Placeholder) =====
    assignmentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            const course = card.querySelector('.course-tag').textContent;
            const desc = card.querySelector('.description').textContent;
            
            // Show a simple alert (replace with modal in production)
            alert(`${course}\n\n${title}\n\n${desc}\n\nClick "Submit" or "Resume" button to proceed.`);
        });
    });

    // ===== CREATE ASSIGNMENT =====
    const createAssignmentBtn = document.getElementById('create-assignment-btn');
    const dashboardCreateBtn = document.getElementById('dashboard-create-assignment-btn');
    const assignmentModal = document.getElementById('assignment-modal');
    const cancelAssignmentBtn = document.getElementById('cancel-assignment-btn');
    const saveAssignmentBtn = document.getElementById('save-assignment-btn');
    const todoColumn = document.getElementById('todo-column');

    if (assignmentModal) {
        const closeAssignmentIcon = document.getElementById('close-assignment-icon');
        
        if (createAssignmentBtn) {
            createAssignmentBtn.addEventListener('click', () => {
                assignmentModal.classList.add('active');
            });
        }
        
        if (dashboardCreateBtn) {
            dashboardCreateBtn.addEventListener('click', () => {
                assignmentModal.classList.add('active');
            });
        }

        const closeModal = () => assignmentModal.classList.remove('active');

        cancelAssignmentBtn.addEventListener('click', closeModal);
        if(closeAssignmentIcon) closeAssignmentIcon.addEventListener('click', closeModal);

        saveAssignmentBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('new-assign-title');
            const courseInput = document.getElementById('new-assign-course');
            const deadlineInput = document.getElementById('new-assign-deadline');
            const descInput = document.getElementById('new-assign-desc');

            const title = titleInput.value.trim();
            if (!title) {
                alert("Please enter a title");
                return;
            }
            const course = courseInput.value.trim() || 'General';
            const description = descInput.value.trim();
            
            let deadlineText = 'No deadline';
            if (deadlineInput && deadlineInput.value) {
                const dateObj = new Date(deadlineInput.value);
                deadlineText = dateObj.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
            }

            const card = document.createElement('div');
            card.className = 'card assignment-card normal';
            card.setAttribute('data-course', course);
            
            card.innerHTML = `
                <div class="card-meta">
                    <span class="course-tag">${course}</span>
                    <i data-lucide="more-horizontal" class="more-icon"></i>
                </div>
                <h4>${title}</h4>
                <p class="description">${description}</p>
                <div class="card-footer">
                    <span class="deadline"><i data-lucide="clock"></i> ${deadlineText}</span>
                    <button class="secondary-btn small">Edit</button>
                </div>
            `;
            
            // Add click listener to the new card
            card.addEventListener('click', () => {
                const cTitle = card.querySelector('h4').textContent;
                const cCourse = card.querySelector('.course-tag').textContent;
                const cDesc = card.querySelector('.description').textContent;
                alert(`${cCourse}\n\n${cTitle}\n\n${cDesc}\n\nClick "Submit" or "Resume" button to proceed.`);
            });

            if (todoColumn) {
                todoColumn.prepend(card);
            }
            lucide.createIcons();
            
            // Update counter
            const columnHeader = todoColumn.closest('.kanban-column').querySelector('.column-header .count');
            if (columnHeader) {
                columnHeader.textContent = parseInt(columnHeader.textContent || 0) + 1;
            }

            // Create dashboard task item
            const taskList = document.getElementById('task-list');
            if (taskList) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item normal';
                taskItem.innerHTML = `
                    <div class="task-info">
                        <input type="checkbox" class="task-checkbox">
                        <div>
                            <h4>${course} - ${title}</h4>
                            <p>${deadlineText}</p>
                        </div>
                    </div>
                `;
                taskList.prepend(taskItem);
            }

            // Cleanup and close
            titleInput.value = '';
            courseInput.value = '';
            if(deadlineInput) deadlineInput.value = '';
            descInput.value = '';
            assignmentModal.classList.remove('active');
        });

        assignmentModal.addEventListener('click', (e) => {
            if (e.target === assignmentModal) {
                assignmentModal.classList.remove('active');
            }
        });
    }

    // ===== CREATE EVENT =====
    const addEventBtn = document.getElementById('add-event-btn');
    const eventModal = document.getElementById('event-modal');
    const closeEventIcon = document.getElementById('close-event-icon');
    const cancelEventBtn = document.getElementById('cancel-event-btn');
    const saveEventBtn = document.getElementById('save-event-btn');

    if (eventModal && addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            eventModal.classList.add('active');
        });

        const closeEventModal = () => eventModal.classList.remove('active');
        cancelEventBtn.addEventListener('click', closeEventModal);
        if (closeEventIcon) closeEventIcon.addEventListener('click', closeEventModal);

        saveEventBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('new-event-title');
            const dateInput = document.getElementById('new-event-date');
            const typeInput = document.getElementById('new-event-type');

            const title = titleInput.value.trim();
            if (!title) {
                alert("Please enter an event title");
                return;
            }
            if (!dateInput.value) {
                alert("Please select a date");
                return;
            }

            // In some environments, Date might parse differently depending on timezone,
            // taking the string and splitting is safer to get the exact day selected
            const dateParts = dateInput.value.split('-');
            const dayString = parseInt(dateParts[2]).toString();
            const eventColor = typeInput.value;

            // Find the calendar day cell
            const calDays = document.querySelectorAll('.cal-day:not(.disabled)');
            let targetDay = null;
            calDays.forEach(day => {
                if (day.childNodes[0] && day.childNodes[0].nodeValue.trim() === dayString) {
                    targetDay = day;
                }
            });

            if (targetDay) {
                const eventDiv = document.createElement('div');
                eventDiv.className = `cal-event ${eventColor}`;
                eventDiv.textContent = title;
                targetDay.appendChild(eventDiv);
            } else {
                alert("Selected date is outside the currently displayed month view.");
            }

            // Cleanup and close
            titleInput.value = '';
            dateInput.value = '';
            typeInput.value = 'blue';
            eventModal.classList.remove('active');
        });

        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                eventModal.classList.remove('active');
            }
        });
    }

    // ===== INTERACTIVE ELEMENTS =====
    // Add smooth transitions to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== FOCUS MODE =====
    const focusBtn = document.getElementById('focus-btn');
    const pomodoroTimer = document.getElementById('pomodoro-timer');
    const pomoTime = document.getElementById('pomo-time');
    const pomoToggle = document.getElementById('pomo-toggle');
    let isFocusMode = false;
    let pomoInterval;
    let timeRemaining = 25 * 60;
    let isPomoRunning = false;

    if(focusBtn) {
        focusBtn.addEventListener('click', () => {
            isFocusMode = !isFocusMode;
            if (isFocusMode) {
                document.body.classList.add('focus-mode');
                focusBtn.classList.add('active');
                focusBtn.innerHTML = '<i data-lucide="minimize-2"></i>';
            } else {
                document.body.classList.remove('focus-mode');
                focusBtn.classList.remove('active');
                focusBtn.innerHTML = '<i data-lucide="headphones"></i>';
                stopPomodoro();
            }
            lucide.createIcons();
        });
    }

    function updatePomoDisplay() {
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        pomoTime.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startPomodoro() {
        if (!isPomoRunning) {
            isPomoRunning = true;
            pomoToggle.innerHTML = '<i data-lucide="pause"></i>';
            lucide.createIcons();
            pomoInterval = setInterval(() => {
                if (timeRemaining > 0) {
                    timeRemaining--;
                    updatePomoDisplay();
                } else {
                    stopPomodoro();
                    alert("Focus session complete!");
                    timeRemaining = 25 * 60;
                    updatePomoDisplay();
                }
            }, 1000);
        }
    }

    function stopPomodoro() {
        isPomoRunning = false;
        clearInterval(pomoInterval);
        pomoToggle.innerHTML = '<i data-lucide="play"></i>';
        lucide.createIcons();
    }

    if(pomoToggle) {
        pomoToggle.addEventListener('click', () => {
            if (isPomoRunning) {
                stopPomodoro();
            } else {
                startPomodoro();
            }
        });
    }

    // ===== OMNI-BAR (Cmd+K) =====
    const omniModal = document.getElementById('omni-modal');
    const omniInput = document.getElementById('omni-input');
    
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if(omniModal) {
                omniModal.classList.add('active');
                omniInput.focus();
            }
        }
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            if(focusBtn) focusBtn.click();
        }
        if (e.key === 'Escape') {
            if(omniModal) omniModal.classList.remove('active');
        }
    });

    if(omniModal) {
        omniModal.addEventListener('click', (e) => {
            if (e.target === omniModal) {
                omniModal.classList.remove('active');
            }
        });
    }

    const omniItems = document.querySelectorAll('.omni-item');
    omniItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const nav = item.getAttribute('data-nav');
            
            if (nav) {
                const targetNav = document.querySelector(`.nav-item[data-target="${nav}"]`);
                if(targetNav) targetNav.click();
            } else if (action === 'focus') {
                if(focusBtn) focusBtn.click();
            } else if (action === 'message') {
                alert("Opening message composer to Professor Smith...");
            } else if (action === 'submit') {
                alert("Opening submission modal for Database Systems...");
            }
            
            if(omniModal) omniModal.classList.remove('active');
            if(omniInput) omniInput.value = '';
        });
    });

    // ===== SOCRATIC AI MENTOR =====
    const socraticFab = document.getElementById('socratic-fab');
    const socraticChat = document.getElementById('socratic-chat');
    const socraticClose = document.getElementById('socratic-close');
    const socraticInput = document.getElementById('socratic-input');
    const socraticSend = document.getElementById('socratic-send');
    const chatBody = document.getElementById('chat-body');

    if(socraticFab) {
        socraticFab.addEventListener('click', () => {
            socraticChat.classList.add('active');
            socraticFab.style.transform = 'scale(0)';
            socraticInput.focus();
        });
    }

    if(socraticClose) {
        socraticClose.addEventListener('click', () => {
            socraticChat.classList.remove('active');
            socraticFab.style.transform = 'scale(1)';
        });
    }

    function sendAiMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ai-msg';
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendUserMessage() {
        const text = socraticInput.value.trim();
        if (text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message user-msg';
            msgDiv.innerHTML = `<p>${text}</p>`;
            chatBody.appendChild(msgDiv);
            socraticInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Mock Socratic Response
            setTimeout(() => {
                const responses = [
                    "That's an interesting point. What happens if we consider the edge cases?",
                    "I can't give you the exact answer, but think about the primary key constraints.",
                    "Why do you think that approach is better than using a JOIN?",
                    "Let's break that down. First, what does the syllabus say about recursive functions?",
                    "What would happen if the database suddenly scaled up to a million users?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                sendAiMessage(randomResponse);
            }, 1000);
        }
    }

    if(socraticSend) {
        socraticSend.addEventListener('click', sendUserMessage);
    }
    if(socraticInput) {
        socraticInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendUserMessage();
        });
    }

    // ===== THEME TOGGLE =====
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.innerHTML = '<i data-lucide="moon"></i>';
                themeBtn.setAttribute('title', 'Toggle Dark Mode');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeBtn.innerHTML = '<i data-lucide="sun"></i>';
                themeBtn.setAttribute('title', 'Toggle Light Mode');
            }
            lucide.createIcons();
        });
    }
});
