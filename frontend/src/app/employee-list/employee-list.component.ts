import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employeeList$;
  createEmployee: FormGroup;
  updateEmployee: FormGroup;
  addFeedback: FormGroup;
  submitNewEmployee = false;
  updateEmployeeDetails = false;
  submitNewFeedback = false;
  successAddMessage = '';
  successUpdateMessage = '';
  successFeedbackMessage = '';
  selectedEmployeeDetails;
  private _observables: any[] = [];
  constructor(private modalService: NgbModal,
              private apiService: ApiService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployeeList();
    this.createEmployee = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      department: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
    this.updateEmployee = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      department: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
    this.addFeedback = this.fb.group({
      employeeId: ['', [Validators.required]],
      feedback: ['', [Validators.required]]
    });
  }
  getEmployeeList() {
   this.employeeList$ = this.apiService.get('','employee');
  }
  open(content) {
    this.successAddMessage = '';
    this.successFeedbackMessage = '';
    this.modalService.open(content, {size: 'lg'});
  }
  deleteEmployee(employeeId) {
    this._observables.push(this.apiService.delete(employeeId,'employee').subscribe(() => {
      this.getEmployeeList();
    }));
  }
  addNewEmployee() {
    this.submitNewEmployee = true;
    if (this.createEmployee.invalid) {
      return;
    }
    const payload = {
      name: this.createEmployee.value.name,
      department: this.createEmployee.value.department,
      email: this.createEmployee.value.email,
      phone: this.createEmployee.value.phone
    };
    this._observables.push(this.apiService.post(payload,'employee').subscribe(data => {
      this.successAddMessage = data.message;
      this.createEmployee.reset();
      this.submitNewEmployee = false;
      this.getEmployeeList();
    }));
  }

  selectedEmployee(details) {
    this.updateEmployee.setValue(details);
    this.successUpdateMessage = '';
    this.successAddMessage = '';
    this.selectedEmployeeDetails = details;
  }

  updateNewEmployee() {
    this.updateEmployeeDetails = true;
    if (this.updateEmployee.invalid) {
      return;
    }
    const payload = {
      name: this.updateEmployee.value.name,
      department: this.updateEmployee.value.department,
      email: this.updateEmployee.value.email,
      phone: this.updateEmployee.value.phone
    };
    this._observables.push(this.apiService.put(payload, `employee/${this.updateEmployee.value.id}`).subscribe(data => {
      this.getEmployeeList();
      this.updateEmployee.reset();
      this.updateEmployeeDetails = false;
      this.successUpdateMessage = data.message;
    }));
  }

  addNewFeedback() {
    this.submitNewFeedback = true;
    if (this.addFeedback.invalid) {
      return;
    }
    const payload = {
      employeeId: this.addFeedback.value.employeeId,
      review: this.addFeedback.value.feedback
    };
    this._observables.push(this.apiService.post(payload,'employee/performance').subscribe(data => {
      this.successFeedbackMessage = data.message;
      this.addFeedback.reset();
      this.submitNewFeedback = false;
    }));
  }

  ngOnDestroy() {
    this._observables.forEach(sub => sub.unsubscribe());
  }
}
