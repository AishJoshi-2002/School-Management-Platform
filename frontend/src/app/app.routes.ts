import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admission } from './features/admission/admission';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Notices } from './features/notices/notices';
import {Teachers} from './features/teachers/teachers';
import {Contact} from './pages/contact/contact';
import {About} from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';

export const routes: Routes = [
    {
        path : '',
        component: Home
    },
    {
        path : 'admission',
        component: Admission
    },
    {
        path : 'events',
        component: Events
    },
    {
        path : 'gallery',
        component: Gallery
    },
    {
        path : 'notices',
        component: Notices
    },
    {
        path : 'teachers',
        component: Teachers
    },
    {
        path : 'contact-us',
        component: Contact
    },
    {
        path : 'about-us',
        component: About
    },
    {
        path : 'privacy-policy',
        component: PrivacyPolicy
    },
    {
        path : 'about-is',
        component: About
    },
    {
        path : 'about-is',
        component: About
    }
];
