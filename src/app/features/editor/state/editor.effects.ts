import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ConfigurationsService } from '@app/core/services/configurations.service';
import * as editorActions from './editor.actions';

@Injectable()
export class EditorEffects {

    @Effect()
    finalXML$: Observable<Action> = this.actions$
        .ofType(editorActions.REQUEST_FINAL_XML, editorActions.CLOSE_RESPONSE_MODAL)
        .switchMap((action) => {
            if (action.type === editorActions.CLOSE_RESPONSE_MODAL) {
                return Observable.empty();
            }
            // return Observable.timer(2000).map(val => {
            //     if (Math.random() < 0.5) {
            //         return new editorActions.FailRequestXMLAction({code: 555, message: "oops"});
            //     } else {
            //         return new editorActions.SuccessRequestXMLAction({xml: '<bla>new xml </bla>'});
            //     }
            // });
            const payload = (<editorActions.RequestFinalXMLAction>action).payload;
            return this.configService.buildFinalXML(
                payload.path, payload.version, payload.xml, payload.executive)
                .map(response => new editorActions.SuccessRequestXMLAction({
                    xml: response
                }))
                .catch((err, caught) => Observable.of(
                    new editorActions.FailRequestXMLAction({
                        code: err.status || -1,
                        message: JSON.stringify(err),
                    })
                ));
        });

    constructor(protected actions$: Actions,
                protected configService: ConfigurationsService) {};
}
