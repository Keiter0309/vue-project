<template>
    <div class="container mt-5">
      <div class="card">
        <form action="" class="form-group">
            <div class="card-header">
                <h1 class="text-center text-uppercase">Login</h1>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="" class="form-label">Your Student Id</label>
                    <input type="number" name="" v-model="studentId" id="" class="form-control">
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary" type="button" @click="login()">Submit</button>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { db } from '../main';
import { doc, setDoc } from "firebase/firestore";


export default {
    name: 'UserLogin',
    data() {
        return {
            studentId: ''
        }
    },
    methods: {
        async login () {
        if(this.studentId == '501220327') {
            Swal.fire({
                title: 'Success',
                text: 'Welcome to the system!',
                icon: 'success',
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            Toast.fire({
                icon: 'success',
                title: 'Welcome to the system',
            });
            this.$router.push('/registered-courses');
        } else {
            if(this.studentId === '' || typeof this.studentId === 'string') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please enter your student id',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            return;
        }
        localStorage.setItem('studentId', this.studentId);
        const docRef = doc(db, "students", this.studentId.toString());
        await setDoc(docRef, {
            studentId: this.studentId,
            time: new Date().toLocaleString(),
        });

        if(docRef) {
            Swal.fire({
                title: 'Success',
                text: 'Welcome to the system!',
                icon: 'success',
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            Toast.fire({
                icon: 'success',
                title: 'Welcome to the system',
            });

            this.$router.push('/dashboard');
        } else {
            alert('An error occurred');
        }
        }
        }   

    }
}
</script>

<style>

</style>
