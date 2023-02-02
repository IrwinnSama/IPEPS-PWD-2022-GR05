import {Component, Inject, OnInit} from '@angular/core';
import {Timesheet} from "@shared/model/dto/timesheet.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TimesheetService} from "@shared/service/crud/timesheet.service";
import {TimesheetCreatePayload} from "@shared/model/payload/create/TimesheetCreatePayload.interface";
import {Contract} from "@shared/model/dto/contract.interface";
import {Employee} from "@shared/model/dto/employee.interface";
import {FormControl} from "@angular/forms";
import {EmployeeService} from "@shared/service/crud/employee.service";
import {ContractService} from "@shared/service/crud/contract.service";

@Component({
  selector: 'app-insert-timesheet-dialog',
  templateUrl: './insert-timesheet-dialog.component.html',
  styleUrls: ['./insert-timesheet-dialog.component.scss']
})
export class InsertTimesheetDialogComponent implements OnInit{


  startDate: Date = new Date();
  startHoursString: string = "08:00";
  endHoursString: string = "16:00";
  comment: string = "";
  timesheetType: string = "Billable";
  selectedEmployee: Employee = {} as Employee ;
  selectedContract: Contract = {} as Contract;
  allEmployeeList: Employee[] = [];
  allContractList: Contract[] = [];
  //The form control for the employee list
  toppings = new FormControl();
  toppings2 = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {timesheet: Timesheet},
              private timesheetService: TimesheetService,
              public dialogRef: MatDialogRef<InsertTimesheetDialogComponent>,
              private employeeService: EmployeeService,
              private contractService: ContractService) {}

  ngOnInit(): void {
    this.contractService.list().subscribe(data => {
      this.allContractList = data
    })
    this.employeeService.list().subscribe(data => {
      this.allEmployeeList = data
      this.initializeData()
    })
  }

  insert(startDate: Date, startHoursString: string, endHoursString: string, comment: string, timesheetType: string, contractId: string, employeeId: string){
    console.log("Inserting timesheet")
    const contract = {contractId: contractId} as Contract
    const employee = {employeeId: employeeId} as Employee
    const startHours: Date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), parseInt(startHoursString.substring(0, 2)), parseInt(startHoursString.substring(3, 5)))
    const endHours: Date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), parseInt(endHoursString.substring(0, 2)), parseInt(endHoursString.substring(3, 5)))
    let timesheet: TimesheetCreatePayload = {startDate, startHours, endHours, comment, timesheetType, contract, employee}
    let result = this.timesheetService.create(timesheet);
    result.subscribe(r => {
      console.log(r)
    })
    this.dialogRef.close()
  }

  initializeData() {
    this.startDate = new Date()
    this.startHoursString = "09:00"
    this.endHoursString = "18:00"
    this.comment = ""
    this.timesheetType = "Billable"
    this.selectedEmployee = this.allEmployeeList[0]
    this.selectedContract = this.allContractList[0]
  }

  //Solve the problem of comparing the objects, because failed with the default compare function
  compareToppings(topping1: Employee, topping2: Employee) {
    return topping1 && topping2 ? topping1.employeeId === topping2.employeeId : topping1 === topping2;
  }

  compareToppings2(topping1: Contract, topping2: Contract) {
    return topping1 && topping2 ? topping1.contractId === topping2.contractId : topping1 === topping2;
  }

  handleEmployeeChange(employeeId: string){
    console.log(employeeId)
  }

  changeTime(time: any)
  {
    console.log(time)
  }
}