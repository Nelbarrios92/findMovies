import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailComponent } from './film-detail.component';

describe('FilmDetailComponent', () => {
    let component: FilmDetailComponent;
    let fixture: ComponentFixture<FilmDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilmDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FilmDetailComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
