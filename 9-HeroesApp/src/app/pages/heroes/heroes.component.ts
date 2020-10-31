import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes : HeroeModel[] = [];
  cargando = false;
  registros = true;
  constructor(private heroesService : HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe(
      (resp) => {
        (this.heroes = resp), (this.cargando = false);
        if (!resp) {
          this.registros = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  borrarHerore(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que quiere borrar el heroe`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHerroe(heroe.id).subscribe();
      } else {
        Swal.fire({
          title: '',
          text: 'El heroe no será borrado de la base de datos',
          icon: 'info',
        });
      }
    });
  }
}
