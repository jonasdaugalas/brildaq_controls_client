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
            const payload = (<editorActions.RequestFinalXMLAction>action).payload;
            return this.configService.buildFinalXML(
                payload.path, payload.version, payload.xml, payload.executive)
                .map(response => new editorActions.SuccessRequestXMLAction({
                    xml: response
                }))
                .catch((err, caught) => Observable.of(
                    new editorActions.FailRequestXMLAction({
                        response: err
                    })
                ));
        });

    @Effect()
    fromFieldsXML$: Observable<Action> = this.actions$
        .ofType(editorActions.REQUEST_XML_FROM_FIELDS, editorActions.CLOSE_RESPONSE_MODAL)
        .switchMap((action) => {
            if (action.type === editorActions.CLOSE_RESPONSE_MODAL) {
                return Observable.empty();
            }
            const payload = (<editorActions.RequestXMLFromFieldsAction>action).payload;
            return this.configService.buildXML(
                payload.path, payload.version, payload.fields)
                .map(response => new editorActions.SuccessRequestXMLAction({
                    xml: response
                }))
                .catch((err, caught) => Observable.of(
                    new editorActions.FailRequestXMLAction({
                        response: err
                    })
                ));
        });

    @Effect()
    submitFields$: Observable<Action> = this.actions$
        .ofType(editorActions.SUBMIT_FIELDS, editorActions.CLOSE_RESPONSE_MODAL)
        .switchMap((action) => {
            if (action.type === editorActions.CLOSE_RESPONSE_MODAL) {
                return Observable.empty();
            }
            const payload = (<editorActions.SubmitFieldsAction>action).payload;
            return this.configService.submitFields(
                payload.comment, payload.path, payload.version, payload.fields)
                .map(response => new editorActions.SuccessSubmitAction({
                    response: response
                }))
                .catch((err, caught) => Observable.of(
                    new editorActions.FailSubmitAction({
                        response: err
                    })
                ));
        });

    @Effect()
    submitXML$: Observable<Action> = this.actions$
        .ofType(editorActions.SUBMIT_XML, editorActions.CLOSE_RESPONSE_MODAL)
        .switchMap((action) => {
            if (action.type === editorActions.CLOSE_RESPONSE_MODAL) {
                return Observable.empty();
            }
            const payload = (<editorActions.SubmitXMLAction>action).payload;
            return this.configService.submitXML(
                payload.comment, payload.path, payload.version, payload.xml, payload.executive)
                .map(response => new editorActions.SuccessSubmitAction({
                    response: response
                }))
                .catch((err, caught) => Observable.of(
                    new editorActions.FailSubmitAction({
                        response: err
                    })
                ));
        });

    constructor(protected actions$: Actions,
                protected configService: ConfigurationsService) {};
}
