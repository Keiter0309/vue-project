<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h1 class="text-center text-uppercase">Register Courses</h1>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="" class="form-label">Student ID</label>
                    <input type="text" name="" id=""  class="form-control" :value="studentData?.studentId" disabled>
                </div>
                <div class="mb03">
                    <label for="" class="form-label">School Year</label>
                    <select name="" id="" class="form-select" v-model="selectedSchoolYears">
                        <option value="">Select School Year</option>
                        <option v-for="schoolYear in schoolYears" :key="schoolYear.id" :value="schoolYear.schoolYear">{{ schoolYear.schoolYear }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Semester</label>
                    <select name="" id="" class="form-select" v-model="selectedSemester">
                        <option value="">Select Semester</option>
                        <option v-for="semester in semesters" :key="semester.id" :value="semester.Semestername">{{ semester.Semestername }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Courses</label>
                    <select name="" id="" class="form-select" v-model="selectedCourse">
                        <option value="">Select Course</option>
                        <option v-for="course in filteredCourses" :key="course.id" :value="course.courseName">{{ course.courseName }}</option>
                    </select>
                </div>

            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary" @click="registerCourses">Register</button>
            </div>
        </div>
    </div>
</template>



<script>
import { db } from '../main';
import { doc, setDoc, getDoc, collection, getDocs, arrayUnion } from "firebase/firestore";
import Swal from 'sweetalert2';

export default {
    name: 'UserDashboard',
    data() {
        return {
            studentData: null,
            selectedCourse: '',
            selectedSemester: '',
            selectedSchoolYears: '',
            courses: [],
            semesters: [],
            schoolYears: [],
        }
    },
    computed: {
        filteredCourses() {
            if (!this.selectedSemester || !this.semesters.length) {
                return [];
            }

            const courses = this.courses.filter(course => course.Semestername === this.selectedSemester);
            return courses;
        },
    },
    methods: {
        async getStudentData() {
            const studentId = localStorage.getItem('studentId');
            if (!studentId) {
                console.log("Student ID is not set");
                return;
            }

            const docRef = doc(db, "students", studentId);

            // Create the document if it doesn't exist
            await setDoc(docRef, { studentId: studentId }, { merge: true });

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.studentData = docSnap.data();
            } else {
                console.log("No such document!");
            }
        },

        async getCourseData() {
            const querySnapshot = await getDocs(collection(db, "courses"));
            this.courses = querySnapshot.docs.map(doc => doc.data());
        },

        async getSemesterData() {
            const querySnapshot = await getDocs(collection(db, "semesters"));
            this.semesters = querySnapshot.docs.map(doc => doc.data());
        },

        async getSchoolYearsData() {
            const querySnapShot = await getDocs(collection(db, "schoolYears"));
            this.schoolYears = querySnapShot.docs.map(doc => doc.data());
        },

        async registerCourses() {
            if (!this.selectedCourse || !this.selectedSemester) {
                Swal.fire({
                    title: 'Error',
                    text: 'Please select a course and a semester',
                    icon: 'error',
                });
                return;
            }


            const studentId = localStorage.getItem('studentId');
            const docRef = doc(db, "students", studentId);

            await setDoc(docRef, {
                courses: arrayUnion(this.selectedCourse),
                semesters: this.selectedSemester,
                schoolYears: this.selectedSchoolYears
            }, { merge: true });

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }); 

            Toast.fire({
                icon: 'success',
                title: 'Course registered successfully'
            });
            
            this.selectedCourse = '';
            this.selectedSemester = '';
            this.selectedSchoolYears = '';
            
            await this.getStudentData();
        }
    },
    mounted() {
        this.getStudentData();
        this.getCourseData();
        this.getSemesterData();
        this.getSchoolYearsData();
    }
}
</script>

<style>

</style>
