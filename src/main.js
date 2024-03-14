import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPj9hQ78k6PIrjhNDZ2CcNF4pfDvu2hSQ",
  authDomain: "vue-project-7fc05.firebaseapp.com",
  projectId: "vue-project-7fc05",
  storageBucket: "vue-project-7fc05.appspot.com",
  messagingSenderId: "476530648994",
  appId: "1:476530648994:web:774070bd9f3a9f2517b4fb",
  measurementId: "G-6L0D496N1G"
};


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '',
          name: 'UserLogin',
          component: () => import('./components/UserLogin.vue'),
        },
        {
            path: '/dashboard',
            name: 'UserDashboard',
            component: () => import('./components/UserDashboard.vue')
        },
        {
          path: '/addcourse',
          name: 'AddCourses',
          component: () => import('./components/AddCourses.vue')
        },
        {
          path: '/addsemester',
          name: 'AddSemester',
          component: () => import('./components/AddSemester.vue')
        },
        {
          path: '/addschoolyears',
          name: 'AddSchoolYears',
          component: () => import('./components/AddSchoolYear.vue')
        },
        {
          path: '/registered-courses',
          name: 'RegisteredCourses',
          component: () => import('./components/Registered-Courses.vue')
        }
    ]
});
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
logEvent(analytics, 'screen_view');
createApp(App).use(router).mount('#app')
export { db };