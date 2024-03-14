<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h1 class="text-center text-uppercase">Add Semester</h1>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="" class="form-label">Semester Name</label>
                    <input type="text" name="" id="" class="form-control" v-model="semesterName">
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary" @click="addSemester()">Add Semester</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../main';
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

export default {
    name: 'AddSemester', // Corrected here
    data () {
        return {
            semesterName: ''
        }
    },
    methods: {
        async addSemester () {
            if(this.semesterName === '') {
                alert('Please enter semester name');
                return;
            }
            const docRef = doc(db, "semesters", this.semesterName);
            await setDoc(docRef, {
                Semestername: this.semesterName,
                time: new Date().toLocaleString(),
            });
            if(docRef) {
                Swal.fire({
                    title: 'Success',
                    text: 'Semester added successfully!',
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
                    title: 'Semester added successfully'
                });
                this.semesterName = '';
            }
        }
    }
}
</script>

<style>

</style>