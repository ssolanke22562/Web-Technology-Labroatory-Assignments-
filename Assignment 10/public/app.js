// Student Portal & Serverless Analytics Client
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Summary DOM
  const statTotalStudents = document.getElementById('statTotalStudents');
  const statAvgGPA = document.getElementById('statAvgGPA');
  const statGpaRange = document.getElementById('statGpaRange');
  const statHighestGPA = document.getElementById('statHighestGPA');
  const statTopStudentName = document.getElementById('statTopStudentName');
  const statAvgAttendance = document.getElementById('statAvgAttendance');
  const topPerformersBody = document.getElementById('topPerformersBody');
  const departmentStatsList = document.getElementById('departmentStatsList');
  const performanceTiersList = document.getElementById('performanceTiersList');
  const summaryLimitSelect = document.getElementById('summaryLimit');

  // Students CRUD DOM
  const searchInput = document.getElementById('searchInput');
  const filterDepartment = document.getElementById('filterDepartment');
  const filterSort = document.getElementById('filterSort');
  const studentsTableBody = document.getElementById('studentsTableBody');
  const studentsCountLabel = document.getElementById('studentsCountLabel');
  const btnOpenCreateModal = document.getElementById('btnOpenCreateModal');
  const btnRefreshAll = document.getElementById('btnRefreshAll');
  const btnSeedData = document.getElementById('btnSeedData');

  // Modal DOM
  const studentModal = document.getElementById('studentModal');
  const modalTitle = document.getElementById('modalTitle');
  const studentForm = document.getElementById('studentForm');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const modalAlert = document.getElementById('modalAlert');
  const studentIdInput = document.getElementById('studentId');
  const modalRollNumber = document.getElementById('modalRollNumber');
  const modalName = document.getElementById('modalName');
  const modalEmail = document.getElementById('modalEmail');
  const modalDepartment = document.getElementById('modalDepartment');
  const modalCourse = document.getElementById('modalCourse');
  const modalSemester = document.getElementById('modalSemester');
  const modalGpa = document.getElementById('modalGpa');
  const modalAttendance = document.getElementById('modalAttendance');
  const modalSkills = document.getElementById('modalSkills');

  // API Tester DOM
  const httpMethod = document.getElementById('httpMethod');
  const endpointUrl = document.getElementById('endpointUrl');
  const btnSendRequest = document.getElementById('btnSendRequest');
  const requestBodyContainer = document.getElementById('requestBodyContainer');
  const requestBodyInput = document.getElementById('requestBodyInput');
  const responseStatus = document.getElementById('responseStatus');
  const responseTime = document.getElementById('responseTime');
  const jsonOutput = document.getElementById('jsonOutput');
  const btnCopyJson = document.getElementById('btnCopyJson');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const toastContainer = document.getElementById('toastContainer');

  let currentStudents = [];

  // Initialize
  init();

  function init() {
    setupEventListeners();
    fetchSummary();
    fetchStudents();
  }

  function setupEventListeners() {
    // Tab switching
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.remove('active'));
        tabContents.forEach((c) => c.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = document.getElementById(`tab-${btn.dataset.tab}`);
        if (targetTab) targetTab.classList.add('active');
      });
    });

    // Summary limit change
    summaryLimitSelect.addEventListener('change', fetchSummary);

    // Refresh button
    btnRefreshAll.addEventListener('click', () => {
      fetchSummary();
      fetchStudents();
      showToast('Data refreshed successfully', 'success');
    });

    // Seed Data
    btnSeedData.addEventListener('click', handleSeedSampleData);

    // Search & Filter
    searchInput.addEventListener('input', debounce(fetchStudents, 300));
    filterDepartment.addEventListener('change', fetchStudents);
    filterSort.addEventListener('change', fetchStudents);

    // Modal Controls
    btnOpenCreateModal.addEventListener('click', () => openModal('create'));
    btnCloseModal.addEventListener('click', closeModal);
    btnCancelModal.addEventListener('click', closeModal);
    studentModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    studentForm.addEventListener('submit', handleFormSubmit);

    // API Tester
    httpMethod.addEventListener('change', () => {
      const isBodyAllowed = ['POST', 'PUT', 'PATCH'].includes(httpMethod.value);
      requestBodyContainer.style.display = isBodyAllowed ? 'block' : 'none';
    });

    btnSendRequest.addEventListener('click', executeApiTesterRequest);
    btnCopyJson.addEventListener('click', copyJsonOutput);

    presetButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        httpMethod.value = btn.dataset.method;
        endpointUrl.value = btn.dataset.url;
        httpMethod.dispatchEvent(new Event('change'));
        if (btn.dataset.method === 'POST') {
          requestBodyInput.value = JSON.stringify(
            {
              rollNumber: `CS${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
              name: 'Jane Doe',
              email: `jane.${Date.now()}@example.edu`,
              department: 'Computer Science',
              course: 'B.Tech',
              semester: 6,
              gpa: 9.35,
              attendance: 95,
              skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
            },
            null,
            2
          );
        }
        executeApiTesterRequest();
      });
    });
  }

  // Fetch Serverless Read-Only Summary
  async function fetchSummary() {
    try {
      const limit = summaryLimitSelect.value || 5;
      const res = await fetch(`/api/summary?limit=${limit}`);
      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      const { overview, topPerformers, departmentBreakdown, performanceTiers } = result;

      // Update overview metrics
      statTotalStudents.textContent = overview.totalStudents;
      statAvgGPA.textContent = overview.averageGPA ? overview.averageGPA.toFixed(2) : '0.00';
      statGpaRange.textContent = `${overview.lowestGPA || 0} - ${overview.highestGPA || 0}`;
      statHighestGPA.textContent = overview.highestGPA ? `${overview.highestGPA.toFixed(1)} / 10.0` : '--';
      statAvgAttendance.textContent = `${overview.averageAttendance || 0}%`;

      if (topPerformers && topPerformers.length > 0) {
        statTopStudentName.textContent = `🥇 ${topPerformers[0].name} (${topPerformers[0].department})`;
      } else {
        statTopStudentName.textContent = 'No records yet';
      }

      // Render Top Performers Table
      renderTopPerformers(topPerformers);

      // Render Department Breakdown
      renderDepartmentStats(departmentBreakdown, overview.totalStudents);

      // Render Performance Tiers
      renderPerformanceTiers(performanceTiers);
    } catch (error) {
      console.error('Error fetching summary:', error);
      topPerformersBody.innerHTML = `<tr><td colspan="6" class="loading-cell text-accent">Error loading summary: ${error.message}</td></tr>`;
    }
  }

  function renderTopPerformers(students) {
    if (!students || students.length === 0) {
      topPerformersBody.innerHTML = `<tr><td colspan="6" class="loading-cell">No students found. Click "Seed Sample Data" to start!</td></tr>`;
      return;
    }

    topPerformersBody.innerHTML = students
      .map((student, idx) => {
        const rank = idx + 1;
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
        const gpaClass = student.gpa >= 9.0 ? 'gpa-high' : student.gpa >= 7.5 ? 'gpa-mid' : 'gpa-low';
        return `
        <tr>
          <td><span class="rank-badge ${rankClass}">${rank}</span></td>
          <td>
            <strong>${escapeHtml(student.name)}</strong>
            <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(student.course || 'B.Tech')} (Sem ${student.semester || 1})</div>
          </td>
          <td><code>${escapeHtml(student.rollNumber)}</code></td>
          <td>${escapeHtml(student.department)}</td>
          <td><span class="gpa-pill ${gpaClass}">${student.gpa.toFixed(1)}</span></td>
          <td>${student.attendance ? (typeof student.attendance === 'number' ? `${student.attendance}%` : student.attendance) : 'N/A'}</td>
        </tr>
      `;
      })
      .join('');
  }

  function renderDepartmentStats(departments, total) {
    if (!departments || departments.length === 0) {
      departmentStatsList.innerHTML = `<div class="loading-cell">No department data available.</div>`;
      return;
    }

    departmentStatsList.innerHTML = departments
      .map((dept) => {
        const percentage = total > 0 ? Math.round((dept.count / total) * 100) : 0;
        return `
        <div class="dept-stat-row">
          <div class="dept-stat-header">
            <span>${escapeHtml(dept.department)} (${dept.count})</span>
            <span style="color: var(--accent-cyan);">Avg GPA: ${dept.averageGPA}</span>
          </div>
          <div class="dept-progress-bar">
            <div class="dept-progress-fill" style="width: ${percentage}%;"></div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  function renderPerformanceTiers(tiers) {
    if (!tiers || tiers.length === 0) {
      performanceTiersList.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">No distribution data.</div>`;
      return;
    }

    performanceTiersList.innerHTML = tiers
      .map(
        (t) => `
      <div class="tier-tag">
        <span>${escapeHtml(t.tier)}:</span>
        <strong>${t.count}</strong>
      </div>
    `
      )
      .join('');
  }

  // Fetch Students for CRUD Directory
  async function fetchStudents() {
    try {
      const search = searchInput.value.trim();
      const department = filterDepartment.value;
      const sortVal = filterSort.value;

      let sortBy = 'createdAt';
      let order = 'desc';

      if (sortVal === 'gpa_desc') {
        sortBy = 'gpa';
        order = 'desc';
      } else if (sortVal === 'gpa_asc') {
        sortBy = 'gpa';
        order = 'asc';
      } else if (sortVal === 'name_asc') {
        sortBy = 'name';
        order = 'asc';
      }

      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (department !== 'All') params.append('department', department);
      params.append('sortBy', sortBy);
      params.append('order', order);

      const res = await fetch(`/api/students?${params.toString()}`);
      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      currentStudents = result.data || [];
      studentsCountLabel.textContent = `Showing ${currentStudents.length} of ${result.total || currentStudents.length} student records`;
      renderStudentsTable(currentStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      studentsTableBody.innerHTML = `<tr><td colspan="8" class="loading-cell text-accent">Error: ${error.message}</td></tr>`;
    }
  }

  function renderStudentsTable(students) {
    if (!students || students.length === 0) {
      studentsTableBody.innerHTML = `<tr><td colspan="8" class="loading-cell">No student records found.</td></tr>`;
      return;
    }

    studentsTableBody.innerHTML = students
      .map((st) => {
        const gpaClass = st.gpa >= 9.0 ? 'gpa-high' : st.gpa >= 7.5 ? 'gpa-mid' : 'gpa-low';
        const skillsHtml = (st.skills || [])
          .slice(0, 3)
          .map((sk) => `<span class="skill-badge">${escapeHtml(sk)}</span>`)
          .join('');

        return `
        <tr>
          <td><code>${escapeHtml(st.rollNumber)}</code></td>
          <td><strong>${escapeHtml(st.name)}</strong></td>
          <td style="color:var(--text-secondary);">${escapeHtml(st.email)}</td>
          <td>${escapeHtml(st.department)}</td>
          <td>${escapeHtml(st.course)} (Sem ${st.semester})</td>
          <td><span class="gpa-pill ${gpaClass}">${st.gpa.toFixed(1)}</span></td>
          <td>${skillsHtml || '<span style="color:var(--text-muted);">-</span>'}</td>
          <td class="text-right">
            <div class="action-buttons">
              <button class="btn btn-sm btn-secondary" onclick="window.editStudent('${st._id}')">✏️ Edit</button>
              <button class="btn btn-sm btn-danger" onclick="window.deleteStudent('${st._id}', '${escapeHtml(st.name)}')">🗑️ Delete</button>
            </div>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  // Modal Handlers (Create / Edit)
  window.editStudent = function (id) {
    const student = currentStudents.find((s) => s._id === id);
    if (!student) return;
    openModal('edit', student);
  };

  window.deleteStudent = async function (id, name) {
    if (!confirm(`Are you sure you want to delete student "${name}"?`)) return;

    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      showToast(`Student ${name} deleted successfully`, 'success');
      fetchStudents();
      fetchSummary();
    } catch (error) {
      showToast(`Failed to delete: ${error.message}`, 'error');
    }
  };

  function openModal(mode, student = null) {
    studentForm.reset();
    modalAlert.style.display = 'none';

    if (mode === 'create') {
      modalTitle.textContent = '➕ Add New Student Record';
      studentIdInput.value = '';
      modalRollNumber.disabled = false;
      modalSemester.value = 5;
      modalAttendance.value = 85;
    } else {
      modalTitle.textContent = `✏️ Edit Student: ${student.name}`;
      studentIdInput.value = student._id;
      modalRollNumber.value = student.rollNumber;
      modalName.value = student.name;
      modalEmail.value = student.email;
      modalDepartment.value = student.department;
      modalCourse.value = student.course;
      modalSemester.value = student.semester;
      modalGpa.value = student.gpa;
      modalAttendance.value = student.attendance || 85;
      modalSkills.value = (student.skills || []).join(', ');
    }

    studentModal.classList.add('active');
  }

  function closeModal() {
    studentModal.classList.remove('active');
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    modalAlert.style.display = 'none';

    const id = studentIdInput.value;
    const isEdit = Boolean(id);

    const payload = {
      rollNumber: modalRollNumber.value.trim(),
      name: modalName.value.trim(),
      email: modalEmail.value.trim(),
      department: modalDepartment.value,
      course: modalCourse.value,
      semester: parseInt(modalSemester.value, 10),
      gpa: parseFloat(modalGpa.value),
      attendance: parseInt(modalAttendance.value, 10),
      skills: modalSkills.value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/students/${id}` : '/api/students';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || (result.errors ? result.errors.join(', ') : 'Operation failed'));
      }

      showToast(isEdit ? 'Student updated successfully!' : 'Student created successfully!', 'success');
      closeModal();
      fetchStudents();
      fetchSummary();
    } catch (error) {
      modalAlert.className = 'alert-box alert-error';
      modalAlert.textContent = `❌ ${error.message}`;
      modalAlert.style.display = 'block';
    }
  }

  // Seed sample data
  async function handleSeedSampleData() {
    if (!confirm('This will seed initial sample student data into your MongoDB database. Continue?')) {
      return;
    }

    const sampleData = [
      { rollNumber: 'CS2024-001', name: 'Aarav Sharma', email: 'aarav.sharma@example.edu', department: 'Computer Science', course: 'B.Tech', semester: 6, gpa: 9.6, attendance: 94, skills: ['React', 'Node.js', 'MongoDB'] },
      { rollNumber: 'IT2024-002', name: 'Ananya Iyer', email: 'ananya.iyer@example.edu', department: 'Information Technology', course: 'B.Tech', semester: 6, gpa: 9.4, attendance: 92, skills: ['Python', 'AWS'] },
      { rollNumber: 'AI2024-003', name: 'Rohan Patel', email: 'rohan.patel@example.edu', department: 'Data Science & AI', course: 'B.Tech', semester: 4, gpa: 9.8, attendance: 98, skills: ['PyTorch', 'TensorFlow', 'NLP'] },
      { rollNumber: 'EC2024-004', name: 'Pooja Verma', email: 'pooja.verma@example.edu', department: 'Electronics & Communication', course: 'B.Tech', semester: 6, gpa: 8.7, attendance: 88, skills: ['Embedded C', 'IoT'] },
      { rollNumber: 'ME2024-005', name: 'Siddharth Rao', email: 'siddharth.rao@example.edu', department: 'Mechanical Engineering', course: 'B.Tech', semester: 8, gpa: 8.2, attendance: 85, skills: ['AutoCAD', 'Robotics'] },
      { rollNumber: 'CS2024-006', name: 'Diya Sen', email: 'diya.sen@example.edu', department: 'Computer Science', course: 'M.Tech', semester: 2, gpa: 9.1, attendance: 90, skills: ['Kubernetes', 'Go'] }
    ];

    try {
      showToast('Seeding database...', 'success');
      for (const st of sampleData) {
        await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(st),
        });
      }
      showToast('Sample students successfully added!', 'success');
      fetchStudents();
      fetchSummary();
    } catch (err) {
      showToast(`Error seeding data: ${err.message}`, 'error');
    }
  }

  // API Tester Execution
  async function executeApiTesterRequest() {
    const method = httpMethod.value;
    const url = endpointUrl.value.trim();

    responseStatus.className = 'status-pill status-ready';
    responseStatus.textContent = 'Sending...';
    const startTime = performance.now();

    try {
      const options = { method, headers: {} };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.headers['Content-Type'] = 'application/json';
        const bodyText = requestBodyInput.value.trim();
        if (bodyText) {
          options.body = JSON.stringify(JSON.parse(bodyText));
        }
      }

      const res = await fetch(url, options);
      const elapsed = Math.round(performance.now() - startTime);
      responseTime.textContent = `${elapsed} ms`;

      const data = await res.json();
      responseStatus.textContent = `${res.status} ${res.statusText || (res.ok ? 'OK' : 'Error')}`;
      responseStatus.className = `status-pill ${res.ok ? 'status-200' : 'status-400'}`;

      jsonOutput.textContent = JSON.stringify(data, null, 2);

      // Auto refresh views if modifying data
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && res.ok) {
        fetchStudents();
        fetchSummary();
      }
    } catch (error) {
      const elapsed = Math.round(performance.now() - startTime);
      responseTime.textContent = `${elapsed} ms`;
      responseStatus.textContent = 'Network / JSON Error';
      responseStatus.className = 'status-pill status-500';
      jsonOutput.textContent = JSON.stringify({ error: error.message }, null, 2);
    }
  }

  function copyJsonOutput() {
    navigator.clipboard.writeText(jsonOutput.textContent).then(() => {
      showToast('JSON copied to clipboard!', 'success');
    });
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
