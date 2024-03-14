<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-9">
                <div class="m-5" v-if="studentData && studentData.length > 0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="text-primary">Registered Courses</h4>
          <div class="form-check">
            <input type="checkbox" id="showMostCheckbox" class="form-check-input" v-model="showMost">
            <label for="showMostCheckbox" class="form-check-label">Show Most Registered Courses</label>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student ID</th>
              <th scope="col">Semester</th>
              <th scope="col">School Years</th>
              <th scope="col">Registered Courses</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in studentData" :key="student.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ student.id }}</td>
              <td>{{ student.semesters }}</td>
              <td>{{ student.schoolYears }}</td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="course in student.courses" :key="course.id">{{ course }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
            </div>
            <div v-if="showMost" class="col-lg-3 mt-5">
        <div class="col-md-8 offset-md-2">
          <h4 v-if="mostRegisteredCourse.length > 0" class="text-primary">Most Registered Courses</h4>
          <ul v-if="mostRegisteredCourse.length > 0" class="list-group">
            <li v-for="(course, index) in mostRegisteredCourse" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              <span class="badge bg-primary rounded-pill">{{ course.count }}</span>
              {{ course.courseName }}
            </li>
          </ul>
        </div>
      </div>
        </div>
    </div>
  </template>

<script>
import { db } from '../main';
import { collection, getDocs } from "firebase/firestore";

export default {
    name: 'RegisteredCourses',
    data () {
        return {
            studentData: null,
            showMost: false
        }
    },
    computed: {
        mostRegisteredCourse () {
            if (!this.studentData || this.studentData.length === 0) return [];

            const courseCount = {};

            this.studentData.forEach(student => {
                if (student.courses && Array.isArray(student.courses)) {
                    student.courses.forEach(course => {
                        if (!courseCount[course]) {
                            courseCount[course] = 1;
                        } else {
                            courseCount[course]++;
                        }
                    });
                }
            });

            const sortedCourses = Object.keys(courseCount).sort((a, b) => courseCount[b] - courseCount[a]);
            return sortedCourses.slice(0, 5).map(course => ({ courseName: course, count: courseCount[course] }));
        }
    },
    methods: {
        async getAllStudentData() {
            const collectionRef = collection(db, "students");
            const querySnapShot = await getDocs(collectionRef);

            this.studentData = querySnapShot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
        },

        showMostRegisteredCourses() {
            this.showMost = !this.showMost;
        }
    },
    mounted() {
        this.getAllStudentData();
    }
}
</script>

<style scoped>
.table {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.list-group-item {
  transition: all 0.3s ease;
}

.list-group-item:hover {
  transform: scale(1.02);
}
</style>