import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ControlPanelComponent } from './control-panel.component';



const routes: Routes = [
    { path: 'Welcome', component: ControlPanelComponent },
    {path: '**', redirectTo:'Welcome'}
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ControlPanelRoutingModule {}
