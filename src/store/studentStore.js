import { create } from "zustand"

// Zustand store for managing students with localStorage persistence
const useStudentStore = create((set, get) => ({
  students: [
  {
    "id": "1",
    "firstName": "Aarav",
    "middleName": "",
    "lastName": "Sharma",
    "email": "aarav.sharma@example.com",
    "course": "Computer Science",
    "profileImage": null
  },
  {
    "id": "2",
    "firstName": "Ishita",
    "middleName": "Raj",
    "lastName": "Patel",
    "email": "ishita.patel@example.com",
    "course": "Information Technology",
    "profileImage": "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    "id": "3",
    "firstName": "Rohan",
    "middleName": "Kumar",
    "lastName": "Verma",
    "email": "rohan.verma@example.com",
    "course": "Electronics",
    "profileImage": "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    "id": "4",
    "firstName": "Sneha",
    "middleName": "",
    "lastName": "Nair",
    "email": "sneha.nair@example.com",
    "course": "Mechanical Engineering",
    "profileImage": "https://randomuser.me/api/portraits/men/49.jpg"
  },
  {
    "id": "5",
    "firstName": "Aditya",
    "middleName": "",
    "lastName": "Gupta",
    "email": "aditya.gupta@example.com",
    "course": "Civil Engineering",
    "profileImage": "https://randomuser.me/api/portraits/men/46.jpg"
  }
]
,
  courses: [
    { id: 1, name: "Computer Science", instructor: "Dr. Smith", duration: "4 years" },
    { id: 2, name: "Mathematics", instructor: "Prof. Johnson", duration: "3 years" },
    { id: 3, name: "Physics", instructor: "Dr. Brown", duration: "4 years" },
    { id: 4, name: "Chemistry", instructor: "Prof. Davis", duration: "3 years" },
  ],
  teachers: [
    { id: 1, name: "Dr. Smith", email: "smith@university.edu", courses: ["Computer Science"] },
    { id: 2, name: "Prof. Johnson", email: "johnson@university.edu", courses: ["Mathematics"] },
    { id: 3, name: "Dr. Brown", email: "brown@university.edu", courses: ["Physics"] },
    { id: 4, name: "Prof. Davis", email: "davis@university.edu", courses: ["Chemistry"] },
  ],

  // Load data from localStorage on initialization
  loadFromStorage: () => {
    try {
      const savedStudents = localStorage.getItem("students")
      const savedCourses = localStorage.getItem("courses")
      const savedTeachers = localStorage.getItem("teachers")

      if (savedStudents) {
        set({ students: JSON.parse(savedStudents) })
      }
      if (savedCourses) {
        set({ courses: JSON.parse(savedCourses) })
      }
      if (savedTeachers) {
        set({ teachers: JSON.parse(savedTeachers) })
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  },

  // Save to localStorage helper
  saveToStorage: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  // Student actions
  addStudent: (student) => {
    const newStudent = {
      ...student,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
    }
    const updatedStudents = [...get().students, newStudent]
    set({ students: updatedStudents })
    get().saveToStorage("students", updatedStudents)
  },

  updateStudent: (id, updatedStudent) => {
    const updatedStudents = get().students.map((student) =>
      student.id === id ? { ...student, ...updatedStudent } : student,
    )
    set({ students: updatedStudents })
    get().saveToStorage("students", updatedStudents)
  },

  deleteStudent: (id) => {
    const updatedStudents = get().students.filter((student) => student.id !== id)
    set({ students: updatedStudents })
    get().saveToStorage("students", updatedStudents)
  },

  // Course actions
  addCourse: (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    const updatedCourses = [...get().courses, newCourse]
    set({ courses: updatedCourses })
    get().saveToStorage("courses", updatedCourses)
  },

  updateCourse: (id, updatedCourse) => {
    const updatedCourses = get().courses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course))
    set({ courses: updatedCourses })
    get().saveToStorage("courses", updatedCourses)
  },

  deleteCourse: (id) => {
    const updatedCourses = get().courses.filter((course) => course.id !== id)
    set({ courses: updatedCourses })
    get().saveToStorage("courses", updatedCourses)
  },

  refreshStudentTable: false,
  refreshCourseTable: false,

  // Set individual flags
  setRefreshStudentTable: (value) => set({ refreshStudentTable: value }),
  setRefreshCourseTable: (value) => set({ refreshCourseTable: value }),

   query: '',
  setQuery: (q) => set({ query: q }),
 

}))

// Initialize store with localStorage data
useStudentStore.getState().loadFromStorage()

export default useStudentStore
