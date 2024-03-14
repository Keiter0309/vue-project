<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1 class="text-center text-uppercase">Add Courses</h1>
      </div>
      <div class="card-body">
            <div class="mb-3">
            <label for="" class="form-label">Course Name</label>
            <input type="text" name="" id="" class="form-control" v-model="courseName">
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Course Code</label>
                <input type="text" name="" id="" class="form-control" v-model="courseCode">
            </div>
        </div>
        <div class="card-footer d-flex justify-content-center">
            <button class="btn btn-primary" @click="addCourse()">Add course</button>
        </div>
    </div>
  </div>
</template>

<script>
import { db } from '../main';
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

export default {
    name: 'AddCourses',
    data() {
        return {
            courseName: '',
            courseCode: ''
        }
    },
    methods: {
        async addCourse () {
            if(this.courseName === '' || this.courseCode === '') {
                alert('Please enter course name and course code');
                return;
            }

            const courseId = `${this.courseName}-${this.courseCode}`;
            const docRef = doc(db, "courses", courseId);
            await setDoc(docRef, {
                courseName: this.courseName,
                courseCode: this.courseCode,
                time: new Date().toLocaleString(),
            });

            if(docRef) {
                Swal.fire({
                    title: 'Success',
                    text: 'Course added successfully!',
                    icon: 'success',
                });

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
                    title: 'Course added successfully'
                });

                this.courseName = '';
                this.courseCode = '';
            }
        }
    }
}
</script>

<style>

</style>