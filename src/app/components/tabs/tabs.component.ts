import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsStore } from '../../state/films.store';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})

export class TabsComponent {

  @Output() notify: EventEmitter<string> = new EventEmitter();

  tabs = signal([
    { id: 1, name: 'movies' },
    { id: 2, name: 'series' }
  ]);

  selectedTab = signal(1);

  selectTab(tab: { id: number, name: string }) {
    this.selectedTab.set(tab.id);
    localStorage.setItem('tab', tab.name);
    this.notify.emit(tab.name);
  }
}
