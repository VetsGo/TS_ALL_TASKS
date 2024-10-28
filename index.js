'use strict';
//Робота з масивами даних
const professors = [];
const classrooms = [];
const courses = [];
const schedule = [];
function addProfessor(professor) {
	professors.push(professor);
}
function addLesson(lesson) {
	if (!validateLesson(lesson)) {
		schedule.push(lesson);
		return true;
	}
	alert(`Conflicts between lessons`);
	return false;
}
//Функції пошуку та фільтрації
function findAvailableClassrooms(timeSlot, dayOfWeek) {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
		.map((lesson) => lesson.classroomNumber);
	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}
function getProfessorSchedule(professorId) {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}
function validateLesson(lesson) {
	const professorConflict = schedule.find(
		(l) =>
			l.professorId === lesson.professorId &&
			l.dayOfWeek === lesson.dayOfWeek &&
			l.timeSlot === lesson.timeSlot &&
			l.id != lesson.id,
	);
	if (professorConflict) {
		return { type: 'ProfessorConflict', lessonDetails: professorConflict };
	}
	const classroomConflict = schedule.find(
		(l) =>
			l.classroomNumber === lesson.classroomNumber &&
			l.dayOfWeek === lesson.dayOfWeek &&
			l.timeSlot === lesson.timeSlot &&
			l.id != lesson.id,
	);
	if (classroomConflict) {
		return { type: 'ClassroomConflict', lessonDetails: classroomConflict };
	}
	return null;
}
//Аналіз та звіти
function getClassroomUtilization(classroomNumber) {
	const totalSlots = 25;
	const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
	return (occupiedSlots / totalSlots) * 100;
}
//Вивід популярного типу предмета
function getMostPopularCourseType() {
	const courseTypeCount = {
		Lecture: 0,
		Seminar: 0,
		Lab: 0,
		Practice: 0,
	};
	schedule.forEach((lesson) => {
		const course = courses.find((course) => course.id === lesson.courseId);
		if (course) {
			courseTypeCount[course.type]++;
		}
	});
	let mostPopularType = 'Lecture';
	let maxCount = 0;
	for (const type in courseTypeCount) {
		if (courseTypeCount[type] > maxCount) {
			maxCount = courseTypeCount[type];
			mostPopularType = type;
		}
	}
	return mostPopularType;
}
document.getElementById('mostPopularCourseTypeBtn')?.addEventListener('click', () => {
	const popularCourseType = getMostPopularCourseType();
	document.getElementById('mostPopularCourseType').innerText = `Most popular course type: ${popularCourseType}`;
});
//Модифікація даних
function reassignClassroom(lessonId, newClassroomNumber) {
	const lesson = schedule.find((l) => l.id === lessonId);
	if (lesson) {
		lesson.classroomNumber = newClassroomNumber;
		return true;
	}
	return false;
}
function cancelLesson(lessonId) {
	const lessonIndex = schedule.findIndex((lesson) => lesson.id === lessonId);
	if (lessonIndex !== -1) {
		schedule.splice(lessonIndex, 1);
		populateScheduleTable();
	} else {
		alert('Lesson was not found');
	}
}
//Функція для заповнення таблиці розкладом
function populateScheduleTable() {
	const tableBody = document.getElementById('scheduleBody');
	tableBody.innerHTML = '';
	const timeSlots = ['8:30-10:00', '10:15-11:45', '12:15-13:45', '14:00-15:30', '15:45-17:15'];
	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	timeSlots.forEach((timeSlot) => {
		const row = document.createElement('tr');
		const timeSlotCell = document.createElement('td');
		timeSlotCell.textContent = timeSlot;
		row.appendChild(timeSlotCell);
		daysOfWeek.forEach((day) => {
			const lessonsForSlot = schedule.filter((l) => l.dayOfWeek === day && l.timeSlot === timeSlot);
			const cell = document.createElement('td');
			if (lessonsForSlot.length > 0) {
				lessonsForSlot.forEach((lesson) => {
					const course = courses.find((c) => c.id === lesson.courseId);
					const professor = professors.find((p) => p.id === lesson.professorId);
					const classroom = classrooms.find((cl) => cl.number === lesson.classroomNumber);
					const lessonInfo = document.createElement('div');
					lessonInfo.innerHTML = `<div class="lesson-container">
                            <div>Course: ${course?.name}<br>Professor: ${professor?.name}<br>Classroom: ${classroom?.number}</div>
                            <button class="changeButton" data-lesson-id="${lesson.id}">Reassign</button>
                            <button class="deleteButton" data-lesson-id="${lesson.id}" onclick="cancelLesson(${lesson.id})">Delete</button>
                        </div>`;
					cell.appendChild(lessonInfo);
				});
			} else {
				cell.textContent = '-';
			}
			row.appendChild(cell);
		});
		tableBody.appendChild(row);
	});
	const changeButtons = document.querySelectorAll('.changeButton');
	changeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const lessonId = parseInt(button.getAttribute('data-lesson-id'));
			openChangeClassroomModal(lessonId);
		});
	});
}
//Функція для зміни аудиторії
function openChangeClassroomModal(lessonId) {
	const modal = document.getElementById('changeClassroomModal');
	const newClassroomSelect = document.getElementById('newClassroomSelect');
	newClassroomSelect.innerHTML = '';
	classrooms.forEach((classroom) => {
		const option = document.createElement('option');
		option.value = classroom.number;
		option.textContent = `Classroom ${classroom.number}`;
		newClassroomSelect.appendChild(option);
	});
	modal.style.display = 'block';
	const confirmButton = document.getElementById('confirmChangeBtn');
	confirmButton.onclick = () => {
		const newClassroomNumber = newClassroomSelect.value;
		reassignClassroom(lessonId, newClassroomNumber);
		populateScheduleTable();
		modal.style.display = 'none';
	};
	const closeModalButton = document.getElementById('closeChangeModalBtn');
	closeModalButton.onclick = () => {
		modal.style.display = 'none';
	};
}
//Створення курсів
document.getElementById('createCourseBtn')?.addEventListener('click', () => {
	document.getElementById('courseModal').style.display = 'block';
	document.getElementById('modalBackground').style.display = 'block';
});
document.getElementById('closeModalBtn')?.addEventListener('click', () => {
	document.getElementById('courseModal').style.display = 'none';
	document.getElementById('modalBackground').style.display = 'none';
});
document.getElementById('submitCourseBtn')?.addEventListener('click', () => {
	const courseNameInput = document.getElementById('courseName').value;
	const courseTypeInput = document.getElementById('courseType').value;
	if (courseNameInput) {
		const newCourse = {
			id: courses.length + 1,
			name: courseNameInput,
			type: courseTypeInput,
		};
		courses.push(newCourse);
		populateScheduleTable();
		document.getElementById('courseModal').style.display = 'none';
		document.getElementById('modalBackground').style.display = 'none';
		document.getElementById('courseName').value = '';
		document.getElementById('courseType').selectedIndex = 0;
	}
});
//Створення викладачів
document.getElementById('createProfessorBtn')?.addEventListener('click', () => {
	document.getElementById('professorModal').style.display = 'block';
	document.getElementById('professorModalBackground').style.display = 'block';
});
document.getElementById('closeProfessorModalBtn')?.addEventListener('click', () => {
	document.getElementById('professorModal').style.display = 'none';
	document.getElementById('professorModalBackground').style.display = 'none';
});
document.getElementById('submitProfessorBtn')?.addEventListener('click', () => {
	const professorNameInput = document.getElementById('professorName').value;
	const departmentNameInput = document.getElementById('departmentName').value;
	if (professorNameInput && departmentNameInput) {
		const newProfessor = {
			id: professors.length + 1,
			name: professorNameInput,
			department: departmentNameInput,
		};
		addProfessor(newProfessor);
		populateProfessorSelect('professorScheduleSelect');
		populateScheduleTable();
		document.getElementById('professorModal').style.display = 'none';
		document.getElementById('professorModalBackground').style.display = 'none';
		document.getElementById('professorName').value = '';
		document.getElementById('departmentName').value = '';
	}
});
//Створення завдань
document.getElementById('createLessonBtn')?.addEventListener('click', () => {
	populateCourseSelect();
	populateProfessorSelect('professorSelect');
	populateClassroomSelect();
	document.getElementById('lessonModal').style.display = 'block';
	document.getElementById('modalBackground').style.display = 'block';
});
document.getElementById('closeLessonModalBtn')?.addEventListener('click', () => {
	document.getElementById('lessonModal').style.display = 'none';
	document.getElementById('modalBackground').style.display = 'none';
});
let nextLessonId = 6;
document.getElementById('submitLessonBtn')?.addEventListener('click', () => {
	const courseId = Number(document.getElementById('courseSelect').value);
	const professorId = Number(document.getElementById('professorSelect').value);
	const classroomNumber = document.getElementById('classroomSelect').value;
	const dayOfWeek = document.getElementById('daySelect').value;
	const timeSlot = document.getElementById('timeSelect').value;
	const newLesson = {
		id: nextLessonId,
		courseId: courseId,
		professorId: professorId,
		classroomNumber: classroomNumber,
		dayOfWeek: dayOfWeek,
		timeSlot: timeSlot,
	};
	addLesson(newLesson);
	populateScheduleTable();
	nextLessonId++;
	document.getElementById('lessonModal').style.display = 'none';
	document.getElementById('modalBackground').style.display = 'none';
});
//Заповнення списку курсів
function populateCourseSelect() {
	const courseSelect = document.getElementById('courseSelect');
	courseSelect.innerHTML = '';
	courses.forEach((course) => {
		const option = document.createElement('option');
		option.value = course.id.toString();
		option.textContent = course.name;
		courseSelect.appendChild(option);
	});
}
//Заповнення списку викладачів
function populateProfessorSelect(selectElementId) {
	const professorSelect = document.getElementById(selectElementId);
	professorSelect.innerHTML = '';
	professors.forEach((professor) => {
		const option = document.createElement('option');
		option.value = professor.id.toString();
		option.textContent = professor.name;
		professorSelect.appendChild(option);
	});
}
//Заповнення списку кабінетів
function populateClassroomSelect() {
	const classroomSelect = document.getElementById('classroomSelect');
	classroomSelect.innerHTML = '';
	classrooms.forEach((classroom) => {
		const option = document.createElement('option');
		option.value = classroom.number;
		option.textContent = classroom.number;
		classroomSelect.appendChild(option);
	});
}
//Відображення вільних аудиторій
document.getElementById('findClassroomsBtn')?.addEventListener('click', () => {
	const daySelect = document.getElementById('availableDaySelect');
	const timeSelect = document.getElementById('availableTimeSelect');
	const selectedDay = daySelect.value;
	const selectedTime = timeSelect.value;
	const availableClassroomsList = findAvailableClassrooms(selectedTime, selectedDay);
	displayAvailableClassrooms(availableClassroomsList);
});
function displayAvailableClassrooms(availableClassrooms) {
	const availableClassroomsDiv = document.getElementById('availableClassrooms');
	if (availableClassroomsDiv) {
		availableClassroomsDiv.innerHTML = '';
		if (availableClassrooms.length > 0) {
			const list = document.createElement('ul');
			availableClassrooms.forEach((classroom) => {
				const listItem = document.createElement('li');
				listItem.textContent = classroom;
				list.appendChild(listItem);
			});
			availableClassroomsDiv.appendChild(list);
		} else {
			availableClassroomsDiv.textContent = 'No available classrooms';
		}
	}
}
//Відображення завантаженості аудиторій
function showClassroomUtilization() {
	const utilizationDiv = document.getElementById('classroomUtilization');
	if (utilizationDiv) {
		const utilizationResults = classrooms.map((classroom) => {
			const utilization = getClassroomUtilization(classroom.number);
			return `Сlassroom ${classroom.number}: ${utilization.toFixed(0)}%`;
		});
		utilizationDiv.innerHTML = utilizationResults.join(', ');
	}
}
const showUtilizationBtn = document.getElementById('showUtilizationBtn');
if (showUtilizationBtn) {
	showUtilizationBtn.addEventListener('click', showClassroomUtilization);
}
//Функція для виведення розкладу викладача
function showProfessorSchedule() {
	const professorSelect = document.getElementById('professorScheduleSelect');
	const selectedProfessorId = professorSelect.value;
	const professorId = parseInt(selectedProfessorId);
	const scheduleDiv = document.getElementById('professorSchedule');
	const professorLessons = getProfessorSchedule(professorId);
	if (professorLessons.length > 0) {
		let scheduleHTML =
			'<table><thead><tr><th>Course</th><th>Day</th><th>Time</th><th>Classroom</th></tr></thead><tbody>';
		professorLessons.forEach((lesson) => {
			const course = courses.find((c) => c.id === lesson.courseId);
			scheduleHTML += `<tr>
                <td>${course?.name}</td>
                <td>${lesson.dayOfWeek}</td>
                <td>${lesson.timeSlot}</td>
                <td>${lesson.classroomNumber}</td>
            </tr>`;
		});
		scheduleHTML += '</tbody></table>';
		scheduleDiv.innerHTML = scheduleHTML;
	} else {
		scheduleDiv.innerHTML = '<p>This professor is free</p>';
	}
}
const showProfessorScheduleBtn = document.getElementById('showProfessorScheduleBtn');
showProfessorScheduleBtn.addEventListener('click', showProfessorSchedule);
window.onload = () => {
	populateProfessorSelect('professorScheduleSelect');
};
//Додані аудиторії
classrooms.push(
	{ number: '101', capacity: 50, hasProjector: true },
	{ number: '104', capacity: 30, hasProjector: false },
	{ number: '202', capacity: 35, hasProjector: false },
	{ number: '215', capacity: 40, hasProjector: true },
	{ number: '326', capacity: 45, hasProjector: true },
	{ number: '335', capacity: 40, hasProjector: false },
);
//Додані предмети
courses.push(
	{ id: 1, name: 'Algorithms', type: 'Lab' },
	{ id: 2, name: 'Discrete Math', type: 'Practice' },
	{ id: 3, name: 'Data Structures', type: 'Lab' },
);
//Додані викладачі
addProfessor({ id: 1, name: 'James Williams', department: 'Mathematics' });
addProfessor({ id: 2, name: 'Michael Johnson', department: 'Computer Science' });
addProfessor({ id: 3, name: 'William Martinez', department: 'Engineering' });
addProfessor({ id: 4, name: 'Mia Anderson', department: 'Philosophy' });
//Додані завдання
addLesson({ id: 1, courseId: 1, professorId: 1, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '8:30-10:00' });
addLesson({ id: 2, courseId: 2, professorId: 2, classroomNumber: '202', dayOfWeek: 'Monday', timeSlot: '14:00-15:30' });
addLesson({
	id: 3,
	courseId: 2,
	professorId: 4,
	classroomNumber: '326',
	dayOfWeek: 'Wednesday',
	timeSlot: '10:15-11:45',
});
addLesson({ id: 4, courseId: 3, professorId: 4, classroomNumber: '215', dayOfWeek: 'Friday', timeSlot: '15:45-17:15' });
addLesson({
	id: 5,
	courseId: 1,
	professorId: 4,
	classroomNumber: '335',
	dayOfWeek: 'Thursday',
	timeSlot: '12:15-13:45',
});
populateScheduleTable();
