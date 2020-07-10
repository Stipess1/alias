import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.page#HomePage'},
  {path: 'igra', loadChildren: './igra/igra.page#IgraPage'},
  {path: 'postavke', loadChildren: './postavke/settings.page#SettingsPage'},
  {path: 'igra-play', loadChildren: './igra/igra-play/igra-play.page#IgraPlayPage'},
  {path: 'rezultati', loadChildren: './igra/rezultati/rezultati.page#RezultatiPage'},
  {path: 'odgovori', loadChildren: './igra/odgovori/odgovori.page#OdgovoriPage'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
