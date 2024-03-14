<template>
  <div class="container mt-5">
    <div class="card">
        <div class="card-header">
            <h1 class="text-center text-uppercase">Add School Year</h1>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label for="" class="form-label">School Year</label>
                <input type="text" name="" id="" class="form-control" v-model="addYear">
            </div>
        </div>
        <div class="card-footer d-flex justify-content-center">
            <button class="btn btn-primary" @click="addSchoolYear">Submit</button>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { db } from '../main';
import { doc, setDoc } from "firebase/firestore";
export default {
    name: 'AddSchoolYears',
    data () {
        return {
            addYear: ''
        }
    },
    methods: {
        async addSchoolYear () {
            if(this.addYear === '' ) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please enter school year',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

            const docRef = doc(db, "schoolYears", this.addYear);
            
            await setDoc(docRef, {
                schoolYear: this.addYear,
                time: new Date().toLocaleString(),
            });

            if(docRef) {
                Swal.fire({
                    title: 'Success',
                    text: 'School year added successfully!',
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
                    title: 'School year added successfully'
                });

                this.addYear = '';
            }
        }
    }
}
</script>

<style>

</style>