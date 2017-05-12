import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ClarityModule } from 'clarity-angular';


// import { RouterModule } from '@angular/router';



// import { SharedModule } from '@app/shared/shared.module';

// import { OverviewRouting } from './overview.routing';

import { OverviewComponent } from './overview.component';
// import { OverviewHeaderComponent } from './overview-header/overview-header.component';
// import { OverviewTreeComponent } from './overview-tree/overview-tree.component';
// import { TreeNodeComponent } from './overview-tree/tree-node/tree-node.component';
// import { OverviewActivePanelComponent } from './overview-active-panel/overview-active-panel.component';
// import { ActionMenuComponent } from './action-menu/action-menu.component';

@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // ClarityModule,
        // RouterModule,
        // OverviewRouting
    ],
    declarations: [
        OverviewComponent,
        // OverviewActivePanelComponent,
        // OverviewTreeComponent,
        // OverviewHeaderComponent,
        // ActionMenuComponent,
        // TreeNodeComponent
    ],
    providers: [
        OverviewComponent
    ]
})
export class OverviewModule { }
