<template>
    <div class="container">
        <div class="m-5" v-if="studentData && studentData.length > 0">
            <div class="d-flex justify-content-between">
                <h4>Registered Courses</h4>
                <div class="form-g">
                    <input type="checkbox" name="" id="" class="form-check-input" v-model="showMost">
                    <label for="" class="form-label">Show most registerd courses</label>
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
                                <ol class="list-unstyled">
                                    <li v-for="course in student.courses" :key="course.id">{{ course }}</li>
                                </ol>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="showMost">
            <h4 v-if="mostRegisteredCourse.length > 0" class="mt-5">Most Registered Courses:</h4>
            <ul v-if="mostRegisteredCourse.length > 0" class="list-group">
                <li v-for="(course, index) in mostRegisteredCourse" :key="index" class="list-group-item">
                    <span class="badge bg-primary rounded-pill">{{ course.count }}</span>
                    {{ course.courseName }}
                </li>
            </ul>
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
/* Add custom scoped styles here */
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
