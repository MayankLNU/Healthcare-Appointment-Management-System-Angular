import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddAvailabilityComponent } from './add-availability/add-availability.component';
import { BookedTimeslotListComponent } from './timeslots/booked-timeslot-list/booked-timeslot-list.component';
import { RemoveTimeslotComponent } from './remove-timeslot/remove-timeslot.component';
import { AddPrescriptionsNotesComponent } from './prescriptions/add-prescriptions-notes/add-prescriptions-notes.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AvailableTimeslotListComponent } from './timeslots/available-timeslot-list/available-timeslot-list.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { GetPrescriptionsNotesComponent } from './prescriptions/get-prescriptions-notes/get-prescriptions-notes.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {path: 'add-availability', component: AddAvailabilityComponent},
            {path: 'booked-appointment', component: BookedTimeslotListComponent},
            {path: 'remove-timeslot', component: RemoveTimeslotComponent},
            {path: 'add-prescriptions-notes', component: AddPrescriptionsNotesComponent},
            {path: 'available-timeslot', component: AvailableTimeslotListComponent},
            {path: 'book-appointment', component: BookAppointmentComponent},
            {path: 'update-appointment', component: UpdateAppointmentComponent},
            {path: 'cancel-appointment', component: CancelAppointmentComponent},
            {path: 'get-prescriptions-notes', component: GetPrescriptionsNotesComponent}
        ]
    },
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
