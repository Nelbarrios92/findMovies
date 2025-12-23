import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsStore } from '../../state/films.store';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})

export class TabsComponent implements OnInit {

  @Output() notify: EventEmitter<string> = new EventEmitter();

  tabs = signal([
    { id: 1, name: 'movies' },
    { id: 2, name: 'series' }
  ]);

  store = inject(FilmsStore);

  selectedTab = signal(1);

  ngOnInit(): void {
    this.selectedTab.set(this.store.selectedType() === 'movies' ? 1 : 2);
  }

  selectTab(tab: { id: number, name: string }) {
    this.selectedTab.set(tab.id);
    this.store.setSelectedType(tab.name);
    this.notify.emit(tab.name);
  }
}
