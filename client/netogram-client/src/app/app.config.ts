import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {environment} from "../environments/environment";
import { provideEffects } from '@ngrx/effects';
import {AuthEffects} from "./ngrx/auth/auth.effects";
import {ProfileEffects} from "./ngrx/profile/profile.effects";
import {profileReducer} from "./ngrx/profile/profile.reducer";
import {authReducer} from "./ngrx/auth/auth.reducer";
import {provideHttpClient} from "@angular/common/http";
import {HttpClientAuth} from "./util/http-client-auth";
import {PostReducer} from "./ngrx/post/post.reducer";
import {PostEffects} from "./ngrx/post/post.effects";
import {StorageEffects} from "./ngrx/storage/storage.effects";
import {StorageReducer} from "./ngrx/storage/storage.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), provideStorage(() => getStorage()),
    provideEffects(AuthEffects, ProfileEffects, PostEffects, StorageEffects),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'post', reducer: PostReducer }),
    provideState({ name: 'storage', reducer: StorageReducer }),
    HttpClientAuth,
    provideHttpClient(),
    provideAnimationsAsync(),
]
};
