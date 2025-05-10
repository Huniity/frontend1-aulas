const nameInput = document.getElementById('name_2');
    const gradeInput = document.getElementById('grade');
    const saveButton = document.getElementById('save');
    const studentList = document.getElementById('student-list');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    function renderList() {
      studentList.innerHTML = '';
      students.forEach(({ name, grade }) => {
        const li = document.createElement('li');
        li.textContent = `Student: ${name} — Grade: ${grade}`;
        studentList.appendChild(li);
      });
    }

    saveButton.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const grade = parseFloat(gradeInput.value);

      students.push({ name, grade });
      localStorage.setItem('students', JSON.stringify(students));
      renderList();

      nameInput.value = '';
      gradeInput.value = '';
    });

    renderList();