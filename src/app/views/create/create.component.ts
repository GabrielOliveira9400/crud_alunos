import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StudentsService } from '../../services/students.service';
import {MatButtonModule} from "@angular/material/button";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  studentId!: string;
  formulario!: FormGroup;
  modoEdicao: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];

    if (this.studentId) {
      this.modoEdicao = true;
      this.carregarDadosParaEdicao();
    }
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      matricula: ['', [Validators.required]]
    });
  }

  voltarPagina() {
    this.location.back();
  }

  carregarDadosParaEdicao(){
    this.studentsService.getStudent(this.studentId).subscribe({
      next: (estudante) => {
        this.formulario.patchValue(estudante);
      },
      error: (error) => {
        console.error(error);
        alert('Erro ao carregar dados do estudante');
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      return alert('Preencha todos os campos');
    }
    const dados = this.formulario.value;
    if (this.modoEdicao) {
      this.studentsService.editStudent(this.studentId, dados).subscribe({
        next: (estudante) => {
          alert('Estudante atualizado com sucesso');
          this.router.navigate(['/']).then(r => r);
        },
        error: (error) => {
          console.error(error);
          if(error.status === 400) {
            alert('Matrícula ou email já cadastrados');
            return;
          }
          alert('Erro ao atualizar estudante');
        }
      });
    }
    else {
      this.studentsService.createStudent(dados).subscribe({
        next: () => {
          alert('Estudante cadastrado com sucesso');
          this.router.navigate(['/']).then(r => r);
        },
        error: (error) => {
          console.error(error);
          if(error.status === 400) {
            alert('Matrícula ou email já cadastrados');
            return;
          }
          alert('Erro ao cadastrar estudante');
        }
      });
    }
    }
}
