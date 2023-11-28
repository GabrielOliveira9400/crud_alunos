import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Students } from '../../interface/students';
import { StudentsService } from '../../services/students.service';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['numeroMatricula', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<Students>([]);
  constructor(
    private studentsService: StudentsService,
    private router: Router
    ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      this.studentsService.list().subscribe(students => {
        this.dataSource.data = students;
      });
  }

  deleteStudent(_id: string) {
    this.studentsService.deleteStudent(_id).subscribe({
      next: (students: Students[]) => {
        console.log(`Estudante excluído com sucesso.`);
        this.dataSource.data = students;
        this.studentsService.list().subscribe(students => {
          this.dataSource.data = students;
        });
      },
      error: (error) => {
        console.error(`Erro ao excluir estudante: ${error}`);
      }
    });
  }

  editStudent(_id: string) {
    this.router.navigate([`/editar/${_id}`]);
  }
  adicionarEstudante() {
    this.router.navigate(['/criar']);
  }
}
